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
  title: "About Us",
  description:
    "Joseph & Co Cleaning Services Ltd is a Bridgwater-based cleaning and property services company serving homeowners, landlords, agents and offices.",
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
