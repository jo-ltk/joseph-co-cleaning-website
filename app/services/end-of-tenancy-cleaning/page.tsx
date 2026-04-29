import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, cleaningServiceSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "End Of Tenancy Cleaning UK",
  description:
    "End of tenancy cleaning for landlords, estate agents and tenants. Joseph & Co prepares properties for inventory checks, deposit returns, photography and new tenant handovers.",
  path: "/services/end-of-tenancy-cleaning",
  keywords: ["end of tenancy cleaning UK", "move out cleaning", "landlord handover cleaning", "estate agent cleaning"],
});

export default function EndOfTenancyCleaningPage() {
  return (
    <main className="relative bg-[#120f0c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "End Of Tenancy Cleaning", path: "/services/end-of-tenancy-cleaning" },
          ]),
          cleaningServiceSchema("/services/end-of-tenancy-cleaning"),
        ])}
      />
      <Navbar />
      <section className="px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
            Landlords, tenants and estate agents
          </p>
          <h1 className="text-4xl font-medium leading-[1.05] md:text-6xl">
            End of tenancy cleaning for inspection-ready UK properties.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">
            Joseph & Co prepares rented homes, flats and managed properties for deposit checks, inventory sign-off, photography and same-week handovers. Our team focuses on kitchens, bathrooms, appliances, high-touch surfaces and the details agents notice first.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?service=End%20Of%20Tenancy%20Cleaning" className="rounded-full bg-yellow-green px-7 py-4 text-sm font-bold uppercase tracking-widest text-aztec">
              Request Quote
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white">
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
