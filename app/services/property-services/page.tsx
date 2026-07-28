import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Property Services UK",
  description:
    "Property services for landlords, agents and property owners. Joseph & Co provides property management support, letting services, move-in and move-out assistance, and ongoing property care solutions.",
  path: "/services/property-services",
  keywords: [
    "property services UK",
    "property management support",
    "letting services",
    "move in move out assistance",
    "landlord property care",
  ],
});

export default function PropertyServicesPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Property Services", path: "/services/property-services" },
          ]),
          cleaningServiceSchema("/services/property-services"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Landlords, agents and property owners
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            Property services for well-managed homes and tenancies.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            Joseph & Co supports landlords, letting agents and property owners with practical property care — from ongoing management assistance and professional letting support to coordinated move-in and move-out handovers, inspections, and the day-to-day solutions that keep your properties presentation-ready.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact?service=Property%20Services"
              className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec"
            >
              Request Quote
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
