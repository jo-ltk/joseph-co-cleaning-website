"use client";

import { usePathname } from "next/navigation";

import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function PresentationRouteExtras() {
  const pathname = usePathname();

  if (pathname === "/vine-cottage" || pathname.startsWith("/care")) return null;

  return (
    <>
      <WhatsAppFloat />
    </>
  );
}
