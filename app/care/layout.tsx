import type { Metadata } from "next";

import CareShell from "@/components/care/CareShell";
import { careBrand } from "@/lib/care";
import { jsonLdScript } from "@/lib/schema";
import { siteUrl } from "@/lib/seo";

import "./care.css";

export const metadata: Metadata = {
  title: {
    absolute: "Care Connect | Trusted Healthcare Staffing Solutions",
  },
  description:
    "Care Connect provides reliable healthcare staffing solutions for care homes and healthcare providers across the UK.",
  keywords: [
    "healthcare staffing UK",
    "care home staffing",
    "nursing agency",
    "healthcare assistants",
    "Care Connect",
  ],
  alternates: { canonical: `${siteUrl}/care` },
  openGraph: {
    title: "Care Connect | Trusted Healthcare Staffing Solutions",
    description:
      "Care Connect provides reliable healthcare staffing solutions for care homes and healthcare providers across the UK.",
    url: `${siteUrl}/care`,
    locale: "en_GB",
    type: "website",
  },
};

const careSchema = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: careBrand.name,
  description: careBrand.description,
  url: `${siteUrl}/care`,
  email: careBrand.email,
  telephone: careBrand.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Malin Hill",
    addressLocality: "Nottingham",
    postalCode: "NG1 1JQ",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
};

export default function CareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="care-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(careSchema)}
      />
      <CareShell>{children}</CareShell>
    </div>
  );
}
