import type { Metadata } from "next";
import Link from "next/link";

import { careBrand } from "@/lib/care";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Care Connect" },
  description: "Privacy information for Care Connect healthcare staffing enquiries and applications.",
  alternates: { canonical: `${siteUrl}/care/privacy` },
};

export default function CarePrivacyPage() {
  return (
    <article className="care-wrap max-w-3xl py-16 pb-28">
      <p className="care-eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl">Privacy Policy</h1>
      <p className="mt-6">
        Care Connect collects personal information that you submit through this website so we can respond to staffing
        enquiries and recruitment applications.
      </p>
      <h2 className="mt-10 text-2xl">What we collect</h2>
      <p className="mt-3">
        Facility request forms may include your name, organisation, email, phone number and staffing details. Candidate
        applications may include professional details and a CV file.
      </p>
      <h2 className="mt-10 text-2xl">How we use it</h2>
      <p className="mt-3">
        We use this information to contact you about the enquiry or opportunity you submitted. We do not sell your
        information.
      </p>
      <h2 className="mt-10 text-2xl">Contact</h2>
      <p className="mt-3">
        Questions about this policy can be sent to{" "}
        <a className="underline" href={`mailto:${careBrand.email}`}>
          {careBrand.email}
        </a>
        .
      </p>
      <p className="mt-10">
        <Link href="/care" className="text-[var(--cc-blue)]">
          Back to Care Connect
        </Link>
      </p>
    </article>
  );
}
