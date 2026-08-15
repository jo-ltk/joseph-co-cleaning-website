import type { Metadata } from "next";
import Link from "next/link";

import { careBrand } from "@/lib/care";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Terms | Care Connect" },
  description: "Terms of use for the Care Connect website.",
  alternates: { canonical: `${siteUrl}/care/terms` },
};

export default function CareTermsPage() {
  return (
    <article className="care-wrap max-w-3xl py-16 pb-28">
      <p className="care-eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl">Terms</h1>
      <p className="mt-6">
        This website is a digital brochure and enquiry channel for Care Connect healthcare staffing. Submitting a form
        does not create a contract of employment or a guaranteed placement.
      </p>
      <h2 className="mt-10 text-2xl">Accuracy</h2>
      <p className="mt-3">
        Please ensure the information you provide is accurate. Applications and staffing requests are reviewed by our
        team.
      </p>
      <h2 className="mt-10 text-2xl">Contact</h2>
      <p className="mt-3">
        {careBrand.address}
        <br />
        <a className="underline" href={`tel:${careBrand.phoneTel}`}>
          {careBrand.phoneDisplay}
        </a>
      </p>
      <p className="mt-10">
        <Link href="/care" className="text-[var(--cc-blue)]">
          Back to Care Connect
        </Link>
      </p>
    </article>
  );
}
