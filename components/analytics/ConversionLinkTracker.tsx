"use client";

import { useEffect } from "react";

import { pushDataLayerEvent } from "@/lib/gtm";

/**
 * One delegated click listener (mounted once in the root layout) that reports
 * phone, WhatsApp and email link clicks. Delegation means no per-component
 * wiring and no duplicate events. Only the page path is sent: never the
 * phone number, email address or WhatsApp message text.
 */
export default function ConversionLinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = (link.getAttribute("href") || "").toLowerCase();

      let event: "phone_click" | "whatsapp_click" | "email_click" | null = null;
      if (href.startsWith("tel:")) event = "phone_click";
      else if (href.startsWith("mailto:")) event = "email_click";
      else if (
        href.startsWith("https://wa.me/") ||
        href.startsWith("https://api.whatsapp.com/")
      )
        event = "whatsapp_click";

      if (!event) return;
      pushDataLayerEvent(event, {
        link_location: window.location.pathname,
        site_section: window.location.pathname.startsWith("/care") ? "care" : "cleaning",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
