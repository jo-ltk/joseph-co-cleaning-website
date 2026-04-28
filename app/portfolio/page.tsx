import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioPageView from "@/components/portfolio/PortfolioPageView";
import { getPortfolioIndex } from "@/lib/portfolio-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | Joseph.co",
  description:
    "Explore Joseph & Co cleaning case studies, landlord-ready finishes, and premium proof-of-work stories.",
};

export default async function PortfolioPage() {
  const { items, source } = await getPortfolioIndex();

  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      <PortfolioPageView portfolios={items} source={source} />
      <Footer />
    </main>
  );
}
