import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Domestic And Residential Cleaning UK",
  description:
    "Domestic and residential cleaning for homeowners, tenants and premium private spaces. Joseph & Co offers trusted, vetted cleaners for regular and one-off home cleaning.",
  path: "/services/domestic-cleaning",
  keywords: ["domestic cleaning UK", "residential cleaning services", "home cleaners", "trusted house cleaning"],
});

export default function DomesticCleaningPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Domestic Cleaning", path: "/services/domestic-cleaning" },
          ]),
          cleaningServiceSchema("/services/domestic-cleaning"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Homes and private residences
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            Domestic cleaning for homes that deserve consistent care.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            Joseph & Co provides residential cleaning for homeowners and tenants who want a reliable, respectful team, clear checklists, eco-conscious product choices and a polished finish around real household routines.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?service=Domestic%20Cleaning" className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec">
              Request Quote
            </Link>
            <Link href="/about" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white">
              Why Joseph & Co
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
