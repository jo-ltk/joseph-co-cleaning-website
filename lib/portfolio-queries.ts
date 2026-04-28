import { unstable_noStore as noStore } from "next/cache";
import { Types } from "mongoose";

import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { samplePortfolios, sampleReviews } from "@/lib/portfolio-fixtures";
import { serializePortfolio, serializeReview } from "@/lib/portfolio-serializers";
import Portfolio from "@/models/Portfolio";
import Review from "@/models/Review";
import type { PortfolioCollectionResult } from "@/types/portfolio";

export async function getPortfolioIndex(): Promise<PortfolioCollectionResult> {
  noStore();

  if (!isMongoConfigured()) {
    return {
      items: samplePortfolios,
      source: "sample",
    };
  }

  try {
    await connectToDatabase();
    const portfolios = await Portfolio.find({})
      .sort({ featured: -1, completionDate: -1, createdAt: -1 })
      .lean();

    if (!portfolios.length) {
      return {
        items: samplePortfolios,
        source: "sample",
      };
    }

    return {
      items: portfolios.map(serializePortfolio),
      source: "database",
    };
  } catch (error) {
    console.error("PORTFOLIO_INDEX_ERROR", error);
    return {
      items: samplePortfolios,
      source: "sample",
    };
  }
}

export async function getPortfolioBySlug(slug: string) {
  noStore();

  if (!isMongoConfigured()) {
    return samplePortfolios.find((portfolio) => portfolio.slug === slug) ?? null;
  }

  try {
    await connectToDatabase();
    const portfolio = await Portfolio.findOne({ slug }).lean();

    if (!portfolio) {
      return samplePortfolios.find((entry) => entry.slug === slug) ?? null;
    }

    return serializePortfolio(portfolio);
  } catch (error) {
    console.error("PORTFOLIO_DETAIL_ERROR", error);
    return samplePortfolios.find((portfolio) => portfolio.slug === slug) ?? null;
  }
}

export async function getApprovedReviewsByPortfolio(portfolioId: string) {
  noStore();

  if (!isMongoConfigured()) {
    return sampleReviews.filter(
      (review) => review.portfolioId === portfolioId && review.approved,
    );
  }

  try {
    if (!Types.ObjectId.isValid(portfolioId)) {
      return sampleReviews.filter(
        (review) => review.portfolioId === portfolioId && review.approved,
      );
    }

    await connectToDatabase();
    const reviews = await Review.find({
      portfolioId,
      approved: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return reviews.map(serializeReview);
  } catch (error) {
    console.error("PORTFOLIO_REVIEW_READ_ERROR", error);
    return sampleReviews.filter(
      (review) => review.portfolioId === portfolioId && review.approved,
    );
  }
}
