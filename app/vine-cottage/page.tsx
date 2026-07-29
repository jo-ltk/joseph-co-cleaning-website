import type { Metadata } from "next";

import VineCottagePresentation from "@/components/vine-cottage/VineCottagePresentation";

export const metadata: Metadata = {
  title: "Vine Cottage | Queen Camel, Somerset",
  description:
    "A Grade II listed countryside retreat in Queen Camel, Somerset — heritage, gardens, and unhurried luxury stays.",
  robots: { index: false, follow: false },
};

export default function VineCottagePage() {
  return <VineCottagePresentation />;
}
