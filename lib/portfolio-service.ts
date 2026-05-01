import { unstable_noStore as noStore } from "next/cache";
import { Types } from "mongoose";

import { deleteCloudinaryAssets, isCloudinaryConfigured } from "@/lib/cloudinary";
import {
  collectAssetPublicIds,
  createSlug,
} from "@/lib/portfolio-helpers";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { samplePortfolios, sampleReviews } from "@/lib/portfolio-fixtures";
import { serializePortfolio, serializeReview } from "@/lib/portfolio-serializers";
import Portfolio from "@/models/Portfolio";
import Review from "@/models/Review";
import type {
  AdminPortfolioSnapshot,
  PortfolioAsset,
  PortfolioCollectionResult,
  PortfolioMetric,
  PortfolioMutationInput,
  PortfolioRecord,
  ReviewRecord,
  ReviewSubmissionInput,
} from "@/types/portfolio";

function cleanText(value: any) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function normalizeMetric(metric: PortfolioMetric) {
  return {
    label: cleanText(metric.label),
    value: cleanText(metric.value),
  };
}

function normalizeMetrics(metrics: PortfolioMetric[]) {
  return metrics
    .map(normalizeMetric)
    .filter((metric) => metric.label.length > 0 && metric.value.length > 0);
}

function normalizeAsset(
  asset: PortfolioAsset | null | undefined,
  kind: PortfolioAsset["kind"],
  fallbackAlt: string,
): PortfolioAsset | null {
  const url = cleanText(asset?.url);
  if (!url) {
    return null;
  }

  return {
    url,
    alt: cleanText(asset?.alt || fallbackAlt),
    kind,
    publicId: cleanText(asset?.publicId),
    width: typeof asset?.width === "number" ? asset.width : undefined,
    height: typeof asset?.height === "number" ? asset.height : undefined,
  };
}

function buildGalleryImages(input: PortfolioMutationInput) {
  const title = cleanText(input.title);
  const galleryImages = [
    normalizeAsset(input.beforeImage, "before", `${title} before image`),
    normalizeAsset(input.afterImage, "after", `${title} after image`),
    ...input.detailGallery.map((asset, index) =>
      normalizeAsset(asset, "detail", `${title} detail image ${index + 1}`),
    ),
  ];

  return galleryImages.filter((asset): asset is PortfolioAsset => Boolean(asset));
}

function assertValidObjectId(id: string, label: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`${label} is invalid.`);
  }
}

async function ensureUniqueSlug(title: string, portfolioId?: string) {
  const baseSlug = createSlug(title);
  let candidate = baseSlug || "project";
  let index = 1;

  while (
    await Portfolio.exists({
      slug: candidate,
      ...(portfolioId ? { _id: { $ne: portfolioId } } : {}),
    })
  ) {
    candidate = `${baseSlug}-${index}`;
    index += 1;
  }

  return candidate;
}

function validatePortfolioInput(input: PortfolioMutationInput) {
  const title = cleanText(input.title);
  const description = cleanText(input.description);
  const serviceType = cleanText(input.serviceType);
  const location = cleanText(input.location);
  const turnaroundTime = cleanText(input.turnaroundTime);
  const resultSummary = cleanText(input.resultSummary);
  const metrics = normalizeMetrics(input.metrics);
  const coverImage = normalizeAsset(input.coverImage, "cover", `${title} cover image`);
  const completionDate = new Date(input.completionDate);

  if (title.length < 3) {
    throw new Error("Project title must be at least 3 characters long.");
  }

  if (!description) {
    throw new Error("Project description is required.");
  }

  if (!serviceType) {
    throw new Error("Service type is required.");
  }

  if (!location) {
    throw new Error("Location is required.");
  }

  if (Number.isNaN(completionDate.getTime())) {
    throw new Error("Completion date is required.");
  }

  if (!turnaroundTime) {
    throw new Error("Turnaround time is required.");
  }

  if (!resultSummary) {
    throw new Error("Result summary is required.");
  }

  if (!metrics.length) {
    throw new Error("Add at least one service metric.");
  }

  if (!coverImage) {
    throw new Error("A cover image is required.");
  }

  return {
    title,
    description,
    serviceType,
    location,
    turnaroundTime,
    resultSummary,
    completionDate,
    metrics,
    coverImage,
    galleryImages: buildGalleryImages(input),
    featured: Boolean(input.featured),
    // New fields
    propertyType: cleanText(input.propertyType),
    propertySize: cleanText(input.propertySize),
    clientIssue: cleanText(input.clientIssue),
    challenge: cleanText(input.challenge),
    teamSize: cleanText(input.teamSize),
    handoverNotes: cleanText(input.handoverNotes),
    resultBadge: cleanText(input.resultBadge),
  };
}





export async function getAdminPortfolioSnapshot(): Promise<AdminPortfolioSnapshot> {
  noStore();

  if (!isMongoConfigured()) {
    return {
      portfolios: samplePortfolios,
      reviews: sampleReviews,
      source: "sample",
      databaseReady: false,
      uploadReady: isCloudinaryConfigured(),
    };
  }

  try {
    await connectToDatabase();
    const [portfolios, reviews] = await Promise.all([
      Portfolio.find({}).sort({ createdAt: -1 }).lean(),
      Review.find({})
        .populate("portfolioId", "title slug")
        .sort({ approved: 1, createdAt: -1 })
        .lean(),
    ]);

    if (!portfolios.length) {
      return {
        portfolios: samplePortfolios,
        reviews: sampleReviews,
        source: "sample",
        databaseReady: true,
        uploadReady: isCloudinaryConfigured(),
      };
    }

    return {
      portfolios: portfolios.map(serializePortfolio),
      reviews: reviews.map(serializeReview),
      source: "database",
      databaseReady: true,
      uploadReady: isCloudinaryConfigured(),
    };
  } catch (error) {
    console.error("PORTFOLIO_ADMIN_SNAPSHOT_ERROR", error);
    return {
      portfolios: samplePortfolios,
      reviews: sampleReviews,
      source: "sample",
      databaseReady: false,
      uploadReady: isCloudinaryConfigured(),
    };
  }
}

export async function savePortfolio(input: PortfolioMutationInput) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured. Add MONGODB_URI to enable portfolio publishing.");
  }

  await connectToDatabase();

  const validated = validatePortfolioInput(input);

  const slug = await ensureUniqueSlug(validated.title, input.id);
  const payload = {
    ...validated,
    slug,
  };

  let existingPortfolio: any = null;

  if (input.id) {
    assertValidObjectId(input.id, "Portfolio id");
    existingPortfolio = await Portfolio.findById(input.id);

    if (!existingPortfolio) {
      throw new Error("Portfolio project could not be found.");
    }
  }

  const previousPublicIds = existingPortfolio
    ? collectAssetPublicIds([
        existingPortfolio.coverImage,
        ...(existingPortfolio.galleryImages ?? []),
      ])
    : [];

  const savedPortfolio = existingPortfolio
    ? await Portfolio.findByIdAndUpdate(
        input.id,
        { $set: payload },
        { new: true, runValidators: true },
      ).lean()
    : await Portfolio.create(payload);

  if (!savedPortfolio) {
    throw new Error("Failed to save portfolio project.");
  }

  const currentPublicIds = collectAssetPublicIds([
    payload.coverImage,
    ...payload.galleryImages,
  ]);

  const removedPublicIds = previousPublicIds.filter(
    (publicId) => !currentPublicIds.includes(publicId),
  );

  await deleteCloudinaryAssets(removedPublicIds);

  return serializePortfolio(savedPortfolio);
}

export async function deletePortfolioRecord(portfolioId: string) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured. Add MONGODB_URI to enable portfolio deletion.");
  }

  assertValidObjectId(portfolioId, "Portfolio id");
  await connectToDatabase();

  const portfolio = await Portfolio.findById(portfolioId);

  if (!portfolio) {
    throw new Error("Portfolio project could not be found.");
  }

  const deletedPortfolio = serializePortfolio(portfolio.toObject());
  const publicIds = collectAssetPublicIds([
    portfolio.coverImage,
    ...(portfolio.galleryImages ?? []),
  ]);

  await Promise.all([
    Review.deleteMany({ portfolioId }),
    portfolio.deleteOne(),
    deleteCloudinaryAssets(publicIds),
  ]);

  return deletedPortfolio;
}

export async function submitReviewRecord(input: ReviewSubmissionInput) {
  const landlordName = cleanText(input.landlordName);
  const company = cleanText(input.company);
  const comment = cleanText(input.comment);
  const rating = Number(input.rating);

  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured. Add MONGODB_URI to store landlord reviews.");
  }

  assertValidObjectId(input.portfolioId, "Portfolio id");

  if (landlordName.length < 2) {
    throw new Error("Landlord name must be at least 2 characters.");
  }

  if (!company) {
    throw new Error("Company name is required.");
  }

  if (comment.length < 20) {
    throw new Error("Review comment must be at least 20 characters.");
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  await connectToDatabase();

  const portfolioExists = await Portfolio.exists({ _id: input.portfolioId });

  if (!portfolioExists) {
    throw new Error("Portfolio project could not be found.");
  }

  const review = await Review.create({
    portfolioId: input.portfolioId,
    landlordName,
    company,
    rating,
    comment,
    approved: false,
  });

  return serializeReview(review.toObject());
}

export async function approveReviewRecord(reviewId: string) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured. Add MONGODB_URI to moderate reviews.");
  }

  assertValidObjectId(reviewId, "Review id");
  await connectToDatabase();

  const review = await Review.findByIdAndUpdate(
    reviewId,
    { approved: true },
    { new: true },
  )
    .populate("portfolioId", "title slug")
    .lean();

  if (!review) {
    throw new Error("Review could not be found.");
  }

  return serializeReview(review);
}

export async function deleteReviewRecord(reviewId: string) {
  if (!isMongoConfigured()) {
    throw new Error("MongoDB is not configured. Add MONGODB_URI to moderate reviews.");
  }

  assertValidObjectId(reviewId, "Review id");
  await connectToDatabase();

  const review = await Review.findById(reviewId).lean();

  if (!review) {
    throw new Error("Review could not be found.");
  }

  const populatedReview = await Review.findById(reviewId)
    .populate("portfolioId", "title slug")
    .lean();

  await Review.deleteOne({ _id: reviewId });

  return populatedReview ? serializeReview(populatedReview) : null;
}
