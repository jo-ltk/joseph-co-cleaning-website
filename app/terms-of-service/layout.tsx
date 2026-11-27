import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms Of Service",
  description:
    "The terms that apply to quotations, bookings, payments, cancellations and re-cleans when you use Joseph & Co Cleaning Services Ltd.",
  path: "/terms-of-service",
});

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
