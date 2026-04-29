import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioDetailView from "@/components/portfolio/PortfolioDetailView";
import {
  getApprovedReviewsByPortfolio,
  getPortfolioBySlug,
} from "@/lib/portfolio-queries";
import { buildMetadata, portfolioMetaDescription } from "@/lib/seo";
import {
  breadcrumbSchema,
  cleaningServiceSchema,
  jsonLdScript,
  portfolioCaseStudySchema,
} from "@/lib/schema";

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
      title: "Cleaning Portfolio",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = portfolioMetaDescription(portfolio);

  return buildMetadata({
    title: `${portfolio.title} Cleaning Case Study`,
    description,
    path: `/portfolio/${portfolio.slug}`,
    keywords: [
      `${portfolio.serviceType} case study`,
      `${portfolio.serviceType} ${portfolio.location}`,
      `cleaning services ${portfolio.location}`,
      "landlord cleaning case study",
      "before and after cleaning",
    ],
    image: portfolio.coverImage.url,
  });
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  const reviews = await getApprovedReviewsByPortfolio(portfolio.id);
  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
      { name: portfolio.title, path: `/portfolio/${portfolio.slug}` },
    ]),
    cleaningServiceSchema(`/portfolio/${portfolio.slug}`),
    portfolioCaseStudySchema(portfolio, reviews),
  ];

  return (
    <main className="relative bg-[#120f0c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schemas)}
      />
      <Navbar />
      <PortfolioDetailView portfolio={portfolio} reviews={reviews} />
      <Footer />
    </main>
  );
}
