import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Joseph & Co Cleaning Services Ltd collects, uses and protects your personal information when you request a quote, contact us or use our website.",
  path: "/privacy-policy",
});

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
