import BottomCta from "../components/BottomCta";
import CoachingPlans from "../components/CoachingPlans";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import IndustriesSection from "../components/IndustriesSection";
import IntroProcess from "../components/IntroProcess";
import LeadershipSpotlightSection from "../components/LeadershipSpotlightSection";
import Navbar from "../components/Navbar";
import RecentProjectsSection from "../components/RecentProjectsSection";
import ResultsSection from "../components/ResultsSection";
import TestimonialsMarqueeSection from "../components/TestimonialsMarqueeSection";

export default function HomePage() {
  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      <section className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </section>
      <IntroProcess />
      <IndustriesSection />
      <LeadershipSpotlightSection />
      <RecentProjectsSection />
      <TestimonialsMarqueeSection />
      <section className="relative">
        <div className="sticky top-0 z-20 h-screen overflow-hidden">
          <ResultsSection />
        </div>
        <CoachingPlans />
      </section>
      <FaqSection />
      <BottomCta />
      <Footer />
    </main>
  );
}
