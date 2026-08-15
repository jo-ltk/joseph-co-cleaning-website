"use client";

import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { careBrand, mapsEmbedSrc, mapsLink, whatsappUrl } from "@/lib/care";
import CareReveal from "./CareReveal";

const actions = [
  {
    label: "Call",
    value: careBrand.phoneDisplay,
    href: `tel:${careBrand.phoneTel}`,
    icon: Phone,
  },
  {
    label: "Email",
    value: careBrand.email,
    href: `mailto:${careBrand.email}`,
    icon: EnvelopeSimple,
  },
  {
    label: "WhatsApp",
    value: "Message the team",
    href: whatsappUrl("Hello Care Connect, I would like to discuss healthcare staffing."),
    icon: WhatsappLogo,
  },
];

export default function CareContact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 md:pb-32 md:pt-24">
      <div className="care-wrap grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <CareReveal>
          <p className="care-eyebrow">Contact</p>
          <h2 className="text-2xl font-medium leading-[1.1] tracking-tight md:text-4xl">Speak with Care Connect</h2>
          <p className="mt-4 text-base leading-relaxed md:text-lg">{careBrand.address}</p>
          <ul className="mt-10 space-y-4">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <li key={action.label}>
                  <a
                    href={action.href}
                    target={action.label === "WhatsApp" ? "_blank" : undefined}
                    rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className="flex min-h-12 items-center gap-4 border-b border-[var(--cc-line)] pb-4"
                  >
                    <Icon size={20} className="text-[var(--cc-blue)]" />
                    <span>
                      <span className="mb-1 block text-sm font-semibold uppercase tracking-widest text-[var(--cc-muted)]">
                        {action.label}
                      </span>
                      <span className="text-base text-[var(--cc-navy)] md:text-lg">{action.value}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </CareReveal>
        <CareReveal delay={0.1}>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mb-3 inline-flex items-center gap-2 text-sm text-[var(--cc-blue)]">
            <MapPin size={16} />
            Open in Google Maps
          </a>
          <div className="overflow-hidden border border-[var(--cc-line)]">
            <iframe
              title="Map showing Care Connect at 1 Malin Hill, Nottingham"
              src={mapsEmbedSrc}
              className="h-[360px] w-full border-0 md:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </CareReveal>
      </div>
    </section>
  );
}
