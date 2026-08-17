"use client";

import CareReveal from "./CareReveal";
import CareSectionHeading from "./CareSectionHeading";
import CareButton from "./CareButton";
import { useCareUi } from "./CareUi";

export default function CareFacilityCta() {
  const { openRequest } = useCareUi();

  return (
    <section id="request" className="scroll-mt-24 bg-[var(--cc-white)] py-16 md:py-24">
      <div className="care-wrap grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <CareReveal>
          <CareSectionHeading
            id="staff-request-title"
            eyebrow="For facilities"
            lines={["Need Reliable", "Healthcare Staff?"]}
          >
            <p>
              Tell us what your facility needs and our team will help you find the right staffing solution.
            </p>
          </CareSectionHeading>
        </CareReveal>
        <CareReveal delay={0.1} className="care-facility-card border border-[var(--cc-line)] bg-[var(--cc-white)] p-6 md:p-10">
          <p className="care-serif text-xl font-medium leading-[1.1] tracking-tight text-[var(--cc-navy)] md:text-2xl">
            Share your requirement in a few details.
          </p>
          <p className="mt-3 text-base leading-relaxed">
            Name, organisation, facility type and the cover you need — we take it from there.
          </p>
          <CareButton className="mt-8" onClick={openRequest}>
            Find Staff
          </CareButton>
        </CareReveal>
      </div>
    </section>
  );
}
