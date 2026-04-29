import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Cleaning Services UK",
  description:
    "Commercial cleaning for offices, managed buildings, retail spaces and shared property areas. Joseph & Co delivers reliable cleaning for property managers and business teams.",
  path: "/services/commercial-cleaning",
  keywords: ["commercial cleaning services UK", "office cleaning company", "managed property cleaning", "business cleaning services"],
});

export default function CommercialCleaningPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Commercial Cleaning", path: "/services/commercial-cleaning" },
          ]),
          cleaningServiceSchema("/services/commercial-cleaning"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Offices and managed spaces
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            Commercial cleaning for workplaces that need to look managed.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            Joseph & Co supports offices, communal areas, retail settings and property-managed buildings with scheduled routines, out-of-hours options, vetted cleaners and professional-grade equipment for consistent presentation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?service=Commercial%20Cleaning" className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec">
              Request Quote
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white">
              See Commercial Proof
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
