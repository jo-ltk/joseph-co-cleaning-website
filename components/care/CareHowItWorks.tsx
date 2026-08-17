"use client";

import CareReveal, { CareStagger } from "./CareReveal";
import CareSectionHeading from "./CareSectionHeading";

const steps = [
  {
    title: "Tell Us What You Need",
    text: "Share your staffing requirements with our team.",
  },
  {
    title: "We Find the Right Professionals",
    text: "We identify suitable healthcare professionals based on your requirements.",
  },
  {
    title: "We Support the Placement",
    text: "Our team coordinates the staffing process and remains available to support you.",
  },
];

export default function CareHowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="care-wrap">
        <CareReveal className="mb-2 md:mb-3">
          <CareSectionHeading
            eyebrow="How it works"
            lines={["A clear path from", "request to placement."]}
          />
        </CareReveal>
        <CareStagger className="grid gap-6 md:grid-cols-3 md:gap-8" stagger={0.12}>
          {steps.map((step, index) => (
            <article key={step.title} data-care-item className="relative border-t border-[var(--cc-red)] pt-8">
              <p className="care-serif text-2xl font-medium leading-[1.1] tracking-tight text-[var(--cc-red)]/30 md:text-4xl">
                0{index + 1}
              </p>
              <h3 className="mt-6 text-xl font-medium leading-[1.1] tracking-tight md:text-2xl">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed">{step.text}</p>
            </article>
          ))}
        </CareStagger>
      </div>
    </section>
  );
}
