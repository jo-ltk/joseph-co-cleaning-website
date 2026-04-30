import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import AboutHero from "../../components/AboutHero";
import OurStorySection from "../../components/OurStorySection";
import StatsSection from "../../components/StatsSection";
import CommitmentSection from "../../components/CommitmentSection";
// import LeadershipSection from "../../components/LeadershipSection";
import JoinOurTeamSection from "../../components/JoinOurTeamSection";
import Footer from "../../components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Joseph & Co Cleaning Services Ltd",
  description:
    "Learn about Joseph & Co Cleaning Services Ltd, a trusted UK cleaning company serving residential, commercial, landlord, estate agent and office clients with insured teams and careful standards.",
  path: "/about",
  keywords: ["trusted cleaning company UK", "insured cleaners", "vetted cleaning team"],
});

export default function AboutPage() {
  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      <section className="relative">
        <div className="h-[70vh] min-h-[500px] overflow-hidden md:min-h-[600px]">
          <AboutHero />
        </div>
      </section>
      
      <OurStorySection />
      <StatsSection />
      <CommitmentSection />
      {/* <LeadershipSection /> */}
      <JoinOurTeamSection />

      <Footer />
    </main>
  );
}
