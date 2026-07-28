import type { Metadata } from "next";

import VineCottagePresentation from "@/components/vine-cottage/VineCottagePresentation";

export const metadata: Metadata = {
  title: "Vine Cottage | Presentation",
  description: "A luxury hospitality vision for Vine Cottage in Queen Camel, Somerset.",
  robots: { index: false, follow: false },
};

export default function VineCottagePage() {
  return <VineCottagePresentation />;
}
