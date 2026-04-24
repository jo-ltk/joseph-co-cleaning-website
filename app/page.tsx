import BottomCta from "../components/BottomCta";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ImpactSection from "../components/ImpactSection";
import IndustriesSection from "../components/IndustriesSection";
import IntroProcess from "../components/IntroProcess";
import PartnershipsSection from "../components/PartnershipsSection";
import LeadershipSpotlightSection from "../components/LeadershipSpotlightSection";
import Navbar from "../components/Navbar";
import RecentProjectsSection from "../components/RecentProjectsSection";
import ResultsSection from "../components/ResultsSection";
import TestimonialsMarqueeSection from "../components/TestimonialsMarqueeSection";
import TrustStrip from "../components/TrustStrip";


export default function HomePage() {
  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      <section className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </section>
      <TrustStrip />
      <IntroProcess />
      <PartnershipsSection />
      <IndustriesSection />
      <LeadershipSpotlightSection />
      <RecentProjectsSection />
      <ImpactSection />
      <TestimonialsMarqueeSection />
      <ResultsSection />
      <FaqSection />
      <BottomCta />
      <Footer />
    </main>
  );
}
