"use client";

import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { careBrand, whatsappUrl } from "@/lib/care";

export default function CareMobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--cc-line)] bg-[var(--cc-paper)]/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a className="care-btn care-btn-primary" href={`tel:${careBrand.phoneTel}`}>
          <Phone size={16} weight="bold" />
          Call
        </a>
        <a
          className="care-btn care-btn-secondary"
          href={whatsappUrl("Hello Care Connect, I would like to discuss healthcare staffing.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo size={16} weight="bold" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
