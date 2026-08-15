"use client";

import { FirstAid, Handshake, HouseLine, CookingPot, User } from "@phosphor-icons/react/dist/ssr";

import { careServices } from "@/lib/care";
import CareReveal, { CareStagger } from "./CareReveal";

const icons = [FirstAid, User, Handshake, HouseLine, CookingPot];

export default function CareServices() {
  return (
    <section id="services" className="scroll-mt-24 bg-[var(--cc-cream)] py-16 md:py-24">
      <div className="care-wrap">
        <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
          <CareReveal>
            <p className="care-eyebrow">Services</p>
            <h2 className="text-2xl font-medium leading-[1.1] tracking-tight md:text-4xl">
              Healthcare Professionals You Can Rely On
            </h2>
          </CareReveal>
          <CareReveal delay={0.08}>
            <p className="max-w-xl text-lg font-medium leading-relaxed md:text-xl">
              Flexible staffing solutions for care homes and healthcare providers.
            </p>
          </CareReveal>
        </div>

        <CareStagger className="grid gap-px bg-[var(--cc-line)] sm:grid-cols-2 lg:grid-cols-3">
          {careServices.map((service, index) => {
            const Icon = icons[index];
            return (
              <article
                key={service.title}
                data-care-item
                className="group bg-[var(--cc-paper)] p-6 transition-colors duration-300 hover:bg-[var(--cc-white)] md:p-10"
              >
                <Icon size={28} className="text-[var(--cc-blue)]" />
                <h3 className="mt-6 text-xl font-medium leading-[1.1] tracking-tight md:text-2xl">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed">{service.text}</p>
              </article>
            );
          })}
          <div data-care-item className="hidden bg-[var(--cc-navy)] p-6 text-white md:p-10 lg:flex lg:flex-col lg:justify-end">
            <p className="care-serif text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
              Coverage that stays close to the floor.
            </p>
            <p className="mt-3 text-base leading-relaxed !text-white/65">
              Planned rotas, urgent cover and ongoing support — coordinated by a dedicated team.
            </p>
          </div>
        </CareStagger>
      </div>
    </section>
  );
}
