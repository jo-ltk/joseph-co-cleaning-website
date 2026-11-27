import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Cover: Somerset, Devon, Gloucestershire And Bristol",
  description:
    "Joseph & Co provides residential, commercial and end of tenancy cleaning across Somerset, Devon, Gloucestershire and Bristol. See our coverage.",
  path: "/areas-we-cover",
  image: "/images/areas-hero.png",
});

export default function AreasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
