import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Industrial Cleaning Services UK",
  description:
    "Industrial cleaning for warehouses, operational spaces and demanding environments. Joseph & Co supports safer, cleaner sites with professional equipment and planned routines.",
  path: "/services/industrial-cleaning",
  keywords: ["industrial cleaning UK", "warehouse cleaning", "factory cleaning", "specialist commercial cleaning"],
});

export default function IndustrialCleaningPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Industrial Cleaning", path: "/services/industrial-cleaning" },
          ]),
          cleaningServiceSchema("/services/industrial-cleaning"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Warehouses and operational sites
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            Industrial cleaning for safer, better-managed working environments.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            Joseph & Co supports industrial and operational spaces with planned cleaning routines, heavy-duty equipment, debris removal, floor attention and communication that works around site access and safety needs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?service=Industrial%20Cleaning" className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec">
              Request Quote
            </Link>
            <Link href="/services" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
