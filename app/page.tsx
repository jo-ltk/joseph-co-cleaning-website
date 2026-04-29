import type { Metadata } from "next";

import BottomCta from "../components/BottomCta";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ImpactSection from "../components/ImpactSection";
import IndustriesSection from "../components/IndustriesSection";
import ProcessSection from "../components/ProcessSection";
import PartnershipsSection from "../components/PartnershipsSection";
import LeadershipSpotlightSection from "../components/LeadershipSpotlightSection";
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
      <Hero />
      <TrustStrip />
      <PartnershipsSection />
      <IndustriesSection />
      <WhyChooseUs />
      <ProcessSection />
      <ResultsComparison />
      <TestimonialsSection />
      <PricingSection />
      {/* <LeadershipSpotlightSection /> */}
      <CtaPodSection />
      <RecentProjectsSection />
      {/* <ImpactSection /> */}
      {/* <ResultsSection /> */}
      <FaqSection />
      <BottomCta />
      <Footer />
    </main>
  );
}
