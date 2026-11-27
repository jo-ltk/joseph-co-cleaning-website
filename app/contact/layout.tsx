import type { Metadata } from "next";

import { buildMetadata, serviceKeywords } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request A Cleaning Quote",
  description:
    "Request a quote from Joseph & Co for end of tenancy, deep, domestic or commercial cleaning in Somerset, Devon, Gloucestershire and Bristol.",
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
