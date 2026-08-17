"use client";

import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { careBrand, whatsappUrl } from "@/lib/care";
import CareButton from "./CareButton";

export default function CareMobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--cc-line)] bg-[var(--cc-paper)]/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <CareButton href={`tel:${careBrand.phoneTel}`} icon={<Phone size={14} weight="bold" />}>
          Call
        </CareButton>
        <CareButton
          href={whatsappUrl("Hello Care Connect, I would like to discuss healthcare staffing.")}
          variant="ghost"
          target="_blank"
          rel="noopener noreferrer"
          icon={<WhatsappLogo size={14} weight="bold" />}
        >
          WhatsApp
        </CareButton>
      </div>
    </div>
  );
}
