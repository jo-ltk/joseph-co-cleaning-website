import type { Metadata } from "next";

import BottomCta from "../components/BottomCta";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import IndustriesSection from "../components/IndustriesSection";
import ProcessSection from "../components/ProcessSection";
import PartnershipsSection from "../components/PartnershipsSection";
import Navbar from "../components/Navbar";
import RecentProjectsSection from "../components/RecentProjectsSection";
import ResultsSection from "../components/ResultsSection";
import ResultsComparison from "../components/ResultsComparison";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import TrustStrip from "../components/TrustStrip";
import WhyChooseUs from "../components/WhyChooseUs";
import CtaPodSection from "../components/CtaPodSection";
import { buildMetadata, serviceKeywords } from "@/lib/seo";
import { cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Professional Cleaning Services UK",
  description:
    "Book insured professional cleaners for end of tenancy, deep, residential, office, commercial, carpet, appliance and garden cleaning. Joseph & Co supports landlords, estate agents, tenants, offices and homeowners across the UK.",
  path: "/",
  keywords: serviceKeywords.home,
});

export default function HomePage() {
  return (
    <main className="relative bg-[#120f0c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(cleaningServiceSchema("/"))}
      />
      <Navbar />
      <div data-stack><Hero /></div>
      <div data-stack data-reveal><TrustStrip /></div>
      <div data-stack data-reveal><PartnershipsSection /></div>
      <div data-stack data-reveal><IndustriesSection /></div>
      <div data-stack data-reveal><WhyChooseUs /></div>
      <div data-stack data-reveal><ProcessSection /></div>
      <div data-stack data-reveal><ResultsComparison /></div>
      <div data-stack><TestimonialsSection /></div>
      <div data-stack><PricingSection /></div>
      <div data-stack><CtaPodSection /></div>
      <div data-stack><RecentProjectsSection /></div>
      <div data-stack><FaqSection /></div>
      <div data-stack><BottomCta /></div>
      <Footer />
    </main>
  );
}
