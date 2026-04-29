import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServicesHero from "../../components/ServicesHero";
import ServicesIntro from "../../components/ServicesIntro";
import DetailedServices from "../../components/DetailedServices";
import WhyChooseServices from "../../components/WhyChooseServices";
import WorkProcess from "../../components/WorkProcess";
import ServicesCta from "../../components/ServicesCta";
import { buildMetadata, serviceKeywords } from "@/lib/seo";
import { cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Cleaning Services UK",
  description:
    "Explore Joseph & Co cleaning services for end of tenancy, deep cleaning, domestic cleaning, office cleaning, commercial cleaning, carpet cleaning, appliance cleaning and after builders work.",
  path: "/services",
  keywords: serviceKeywords.services,
  image: "/images/services-hero.png",
});

export default function ServicesPage() {
  return (
    <main className="relative bg-[#120f0c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(cleaningServiceSchema("/services"))}
      />
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
