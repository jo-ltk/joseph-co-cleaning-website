import Navbar from "../../components/Navbar";
import AboutHero from "../../components/AboutHero";
import OurStorySection from "../../components/OurStorySection";
import StatsSection from "../../components/StatsSection";
import LeadershipSection from "../../components/LeadershipSection";
import JoinOurTeamSection from "../../components/JoinOurTeamSection";
import Footer from "../../components/Footer";

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
      <LeadershipSection />
      <JoinOurTeamSection />

      <Footer />
    </main>
  );
}
