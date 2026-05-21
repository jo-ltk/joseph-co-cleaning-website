import { unstable_cache } from "next/cache";
import { cache } from "react";
import { Types } from "mongoose";

import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { samplePortfolios, sampleReviews } from "@/lib/portfolio-fixtures";
import { serializePortfolio, serializeReview } from "@/lib/portfolio-serializers";
import Portfolio from "@/models/Portfolio";
import Review from "@/models/Review";
import type { PortfolioCollectionResult } from "@/types/portfolio";

const PORTFOLIO_REVALIDATE_SECONDS = 60;

const portfolioIndexProjection = {
  title: 1,
  slug: 1,
  description: 1,
  coverImage: 1,
  serviceType: 1,
  location: 1,
  completionDate: 1,
  turnaroundTime: 1,
  resultSummary: 1,
  featured: 1,
  propertySize: 1,
  clientIssue: 1,
  trustBadges: 1,
  resultBadge: 1,
  createdAt: 1,
  metrics: 1,
} as const;

async function fetchPortfolioIndexFromDatabase(): Promise<PortfolioCollectionResult> {
  await connectToDatabase();
  const portfolios = await Portfolio.find({})
    .select(portfolioIndexProjection)
    .sort({ featured: -1, completionDate: -1, createdAt: -1 })
    .lean();

  if (!portfolios.length) {
    return {
      items: samplePortfolios,
      source: "sample" as const,
    };
  }

  return {
    items: portfolios.map(serializePortfolio),
    source: "database" as const,
  };
}

const getCachedPortfolioIndex = unstable_cache(
  async () => {
    try {
      return await fetchPortfolioIndexFromDatabase();
    } catch (error) {
      console.error("PORTFOLIO_INDEX_ERROR", error);
      return {
        items: samplePortfolios,
        source: "sample" as const,
      };
    }
  },
  ["portfolio-index"],
  { revalidate: PORTFOLIO_REVALIDATE_SECONDS, tags: ["portfolio"] },
);

export async function getPortfolioIndex(): Promise<PortfolioCollectionResult> {
  if (!isMongoConfigured()) {
    return {
      items: samplePortfolios,
      source: "sample",
    };
  }

  return getCachedPortfolioIndex();
}

async function fetchPortfolioBySlug(slug: string) {
  await connectToDatabase();
  const portfolio = await Portfolio.findOne({ slug }).lean();

  if (!portfolio) {
    return samplePortfolios.find((entry) => entry.slug === slug) ?? null;
  }

  return serializePortfolio(portfolio);
}

function getCachedPortfolioBySlug(slug: string) {
  return unstable_cache(
    async () => {
      try {
        return await fetchPortfolioBySlug(slug);
      } catch (error) {
        console.error("PORTFOLIO_DETAIL_ERROR", error);
        return samplePortfolios.find((portfolio) => portfolio.slug === slug) ?? null;
      }
    },
    ["portfolio-slug", slug],
    {
      revalidate: PORTFOLIO_REVALIDATE_SECONDS,
      tags: ["portfolio", `portfolio-${slug}`],
    },
  )();
}

export const getPortfolioBySlug = cache(async (slug: string) => {
  if (!isMongoConfigured()) {
    return samplePortfolios.find((portfolio) => portfolio.slug === slug) ?? null;
  }

  return getCachedPortfolioBySlug(slug);
});

async function fetchApprovedReviewsByPortfolio(portfolioId: string) {
  await connectToDatabase();
  const reviews = await Review.find({
    portfolioId,
    approved: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  return reviews.map(serializeReview);
}

function getCachedApprovedReviews(portfolioId: string) {
  return unstable_cache(
    async () => {
      try {
        if (!Types.ObjectId.isValid(portfolioId)) {
          return sampleReviews.filter(
            (review) => review.portfolioId === portfolioId && review.approved,
          );
        }

        return await fetchApprovedReviewsByPortfolio(portfolioId);
      } catch (error) {
        console.error("PORTFOLIO_REVIEW_READ_ERROR", error);
        return sampleReviews.filter(
          (review) => review.portfolioId === portfolioId && review.approved,
        );
      }
    },
    ["portfolio-reviews", portfolioId],
    {
      revalidate: PORTFOLIO_REVALIDATE_SECONDS,
      tags: ["portfolio", `portfolio-reviews-${portfolioId}`],
    },
  )();
}

export const getApprovedReviewsByPortfolio = cache(async (portfolioId: string) => {
  if (!isMongoConfigured()) {
    return sampleReviews.filter(
      (review) => review.portfolioId === portfolioId && review.approved,
    );
  }

  return getCachedApprovedReviews(portfolioId);
});
