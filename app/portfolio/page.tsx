import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioPageView from "@/components/portfolio/PortfolioPageView";
import { getPortfolioIndex } from "@/lib/portfolio-queries";
import { buildMetadata, serviceKeywords } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Case Studies And Portfolio",
  description:
    "Explore Joseph & Co cleaning case studies for landlord handovers, end of tenancy cleaning, commercial cleaning, after builders cleaning and premium property resets.",
  path: "/portfolio",
  keywords: serviceKeywords.portfolio,
  image: "/images/gallery-hero.png",
});

export default async function PortfolioPage() {
  const { items, source } = await getPortfolioIndex();

  return (
    <main className="relative bg-[#120f0c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
        )}
      />
      <Navbar />
      <PortfolioPageView portfolios={items} source={source} />
      <Footer />
    </main>
  );
}
