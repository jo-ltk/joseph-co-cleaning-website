import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cleaning Gallery: Before And After Results",
  description:
    "Browse photos of Joseph & Co cleaning work, from homes and workspaces to after builders and end of tenancy cleans, and see the finish our teams deliver.",
  path: "/gallery",
  image: "/images/gallery-hero.png",
});

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
