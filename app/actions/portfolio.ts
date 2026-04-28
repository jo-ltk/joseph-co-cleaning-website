"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth";

import {
  approveReviewRecord,
  deletePortfolioRecord,
  deleteReviewRecord,
  savePortfolio,
  submitReviewRecord,
} from "@/lib/portfolio-service";
import type {
  ActionResult,
  PortfolioMutationInput,
  PortfolioRecord,
  ReviewRecord,
  ReviewSubmissionInput,
} from "@/types/portfolio";

function messageFromError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong while updating portfolio content.";
}

function revalidatePortfolioSurfaces(slug?: string) {
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");

  if (slug) {
    revalidatePath(`/portfolio/${slug}`);
  }
}

export async function savePortfolioAction(
  input: PortfolioMutationInput,
): Promise<ActionResult<PortfolioRecord>> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    const portfolio = await savePortfolio(input);
    revalidatePortfolioSurfaces(portfolio.slug);

    return {
      success: true,
      message: input.id ? "Portfolio case study updated." : "Portfolio case study published.",
      data: portfolio,
    };
  } catch (error) {
    return {
      success: false,
      message: messageFromError(error),
    };
  }
}

export async function deletePortfolioAction(
  portfolioId: string,
): Promise<ActionResult<PortfolioRecord>> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    const deletedPortfolio = await deletePortfolioRecord(portfolioId);
    revalidatePortfolioSurfaces(deletedPortfolio.slug);

    return {
      success: true,
      message: "Portfolio case study deleted.",
      data: deletedPortfolio,
    };
  } catch (error) {
    return {
      success: false,
      message: messageFromError(error),
    };
  }
}

export async function submitLandlordReviewAction(
  input: ReviewSubmissionInput,
): Promise<ActionResult<ReviewRecord>> {
  try {
    const review = await submitReviewRecord(input);
    revalidatePath("/admin/portfolio");

    return {
      success: true,
      message: "Review submitted for approval.",
      data: review,
    };
  } catch (error) {
    return {
      success: false,
      message: messageFromError(error),
    };
  }
}

export async function approveLandlordReviewAction(
  reviewId: string,
): Promise<ActionResult<ReviewRecord>> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    const review = await approveReviewRecord(reviewId);
    revalidatePortfolioSurfaces(review.portfolioSlug);

    return {
      success: true,
      message: "Review approved and published.",
      data: review,
    };
  } catch (error) {
    return {
      success: false,
      message: messageFromError(error),
    };
  }
}

export async function deleteLandlordReviewAction(
  reviewId: string,
): Promise<ActionResult<ReviewRecord | null>> {
  const session = await getSession();
  if (!session) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    const review = await deleteReviewRecord(reviewId);
    revalidatePortfolioSurfaces(review?.portfolioSlug);

    return {
      success: true,
      message: "Review deleted.",
      data: review,
    };
  } catch (error) {
    return {
      success: false,
      message: messageFromError(error),
    };
  }
}
