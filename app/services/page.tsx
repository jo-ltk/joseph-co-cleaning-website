import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServicesHero from "../../components/ServicesHero";
import ServicesIntro from "../../components/ServicesIntro";
import DetailedServices from "../../components/DetailedServices";
import WhyChooseServices from "../../components/WhyChooseServices";
import WorkProcess from "../../components/WorkProcess";
import ServicesCta from "../../components/ServicesCta";

export const metadata = {
  title: "Professional Cleaning Services | Joseph & Co Cleaning Services Ltd",
  description: "Bespoke cleaning solutions for domestic, commercial, and industrial properties across Somerset, Devon, Gloucestershire and Bristol. Experience the Joseph & Co difference.",
};

export default function ServicesPage() {
  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />
      
      {/* Hero Section */}
      <ServicesHero />
      
      {/* Intro Trust Section */}
      <ServicesIntro />
      
      {/* Main Detailed Services Section */}
      <DetailedServices />
      
      {/* Why Choose Our Services */}
      <WhyChooseServices />
      
      {/* Simple Work Process Section */}
      <WorkProcess />
      {/* Final CTA Banner */}
      <ServicesCta />

      <Footer />
    </main>
  );
}
