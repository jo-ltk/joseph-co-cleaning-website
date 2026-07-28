"use client";

import { usePathname } from "next/navigation";

import MobileExperienceNotice from "@/components/MobileExperienceNotice";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PresentationRouteExtras() {
  const pathname = usePathname();

  if (pathname === "/vine-cottage") return null;

  return (
    <>
      <WhatsAppFloat />
      <MobileExperienceNotice />
    </>
  );
}
