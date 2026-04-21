import BottomCta from "../components/BottomCta";
import CoachingPlans from "../components/CoachingPlans";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ResultsSection from "../components/ResultsSection";

export default function HomePage() {
  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      <section className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </section>
      <section className="relative">
        <div className="sticky top-0 z-20 h-screen overflow-hidden">
          <ResultsSection />
        </div>
        <CoachingPlans />
      </section>
      <BottomCta />
      <Footer />
    </main>
  );
}
