import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "After Builders Cleaning UK",
  description:
    "After builders cleaning for renovated homes, commercial spaces and property handovers. Joseph & Co removes dust, debris and residue for inspection-ready finishes.",
  path: "/services/after-builders-cleaning",
  keywords: ["after builders cleaning UK", "post construction cleaning", "builders clean", "renovation cleaning"],
});

export default function AfterBuildersCleaningPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "After Builders Cleaning", path: "/services/after-builders-cleaning" },
          ]),
          cleaningServiceSchema("/services/after-builders-cleaning"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Renovation and handover cleans
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            After builders cleaning for a clean final reveal.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            We remove fine construction dust, debris, residue, marks, glass film and touchpoint build-up so renovated spaces are ready for owners, tenants, photographs and snagging walkthroughs.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?service=After%20Builders%20Cleaning" className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec">
              Request Quote
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white">
              View Results
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
