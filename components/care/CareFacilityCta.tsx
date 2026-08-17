"use client";

import CareReveal from "./CareReveal";
import { useCareUi } from "./CareUi";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function CareFacilityCta() {
  const { openRequest } = useCareUi();

  return (
    <section id="request" className="scroll-mt-24 bg-[var(--cc-cream)] py-16 md:py-24">
      <div className="care-wrap grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <CareReveal>
          <p className="care-eyebrow">For facilities</p>
          <h2 className="text-2xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Need Reliable Healthcare Staff?
          </h2>
          <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed md:text-xl">
            Tell us what your facility needs and our team will help you find the right staffing solution.
          </p>
        </CareReveal>
        <CareReveal delay={0.1} className="border border-[var(--cc-line)] bg-[var(--cc-white)] p-6 md:p-10">
          <p className="care-serif text-xl font-medium leading-[1.1] tracking-tight text-[var(--cc-navy)] md:text-2xl">
            Share your requirement in a few details.
          </p>
          <p className="mt-3 text-base leading-relaxed">
            Name, organisation, facility type and the cover you need — we take it from there.
          </p>
          <button type="button" className="care-btn care-btn-primary mt-8" onClick={openRequest}>
            Request Staff
            <span className="care-btn-hero-icon" aria-hidden>
              <ArrowRight size={16} weight="bold" />
            </span>
          </button>
        </CareReveal>
      </div>
    </section>
  );
}
