import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Deep Cleaning Services UK",
  description:
    "Deep cleaning services for homes, rented properties, offices and commercial spaces needing a detailed reset, appliance attention, sanitising and high-touch surface care.",
  path: "/services/deep-cleaning",
  keywords: ["deep cleaning services UK", "one off deep clean", "professional deep cleaners", "home deep cleaning"],
});

export default function DeepCleaningPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Deep Cleaning", path: "/services/deep-cleaning" },
          ]),
          cleaningServiceSchema("/services/deep-cleaning"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            One-off reset cleans
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            Deep cleaning for homes and workspaces that need more than a surface pass.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            Our deep cleaning service targets built-up dust, grime, appliances, bathrooms, touchpoints, edges and overlooked areas, giving landlords, homeowners and office teams a healthier, better-presented space.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?service=Deep%20Cleaning" className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec">
              Request Quote
            </Link>
            <Link href="/services" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white">
              Compare Services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
