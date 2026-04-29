import type { Metadata } from "next";

import { buildMetadata, serviceKeywords } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request A Cleaning Quote",
  description:
    "Request a fast quote from Joseph & Co Cleaning Services Ltd for end of tenancy, deep, office, commercial, residential, carpet, appliance or garden cleaning across the UK.",
  path: "/contact",
  keywords: serviceKeywords.contact,
  image: "/images/contact-hero.png",
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
