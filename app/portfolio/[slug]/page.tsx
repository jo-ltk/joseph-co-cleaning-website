import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioDetailView from "@/components/portfolio/PortfolioDetailView";
import {
  getApprovedReviewsByPortfolio,
  getPortfolioBySlug,
} from "@/lib/portfolio-queries";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return {
      title: "Portfolio | Joseph.co",
    };
  }

  return {
    title: `${portfolio.title} | Joseph.co`,
    description: portfolio.resultSummary,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  const reviews = await getApprovedReviewsByPortfolio(portfolio.id);

  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      <PortfolioDetailView portfolio={portfolio} reviews={reviews} />
      <Footer />
    </main>
  );
}
