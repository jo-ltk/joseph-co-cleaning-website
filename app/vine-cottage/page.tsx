import type { Metadata } from "next";

import VineCottagePresentation from "@/components/vine-cottage/VineCottagePresentation";

export const metadata: Metadata = {
  title: "Vine Cottage | Vision Presentation",
  description:
    "A tasteful vision for Vine Cottage — a Grade II* listed historic cottage in Queen Camel, Somerset, imagined as a luxury countryside retreat.",
  robots: { index: false, follow: false },
};

export default function VineCottagePage() {
  return <VineCottagePresentation />;
}
