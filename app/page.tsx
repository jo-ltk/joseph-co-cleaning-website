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


export default function HomePage() {
  return (
    <main className="relative bg-[#120f0c]">
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
