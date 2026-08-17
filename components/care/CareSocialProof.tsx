"use client";

import CareReveal, { CareStagger } from "./CareReveal";

const commitments = [
  {
    title: "Reliability on the floor",
    text: "Care homes need people who arrive prepared, work with dignity, and keep continuity of care intact.",
  },
  {
    title: "Checks before placement",
    text: "Vetting, references and training are treated as part of the placement — not an afterthought.",
  },
  {
    title: "A team that stays reachable",
    text: "24/7 support is there so urgent cover and ongoing needs can be discussed when they arise.",
  },
];

export default function CareSocialProof() {
  return (
    <section className="bg-[var(--cc-white)] py-16 md:py-24">
      <div className="care-wrap">
        <CareReveal className="mb-10 md:mb-16">
          <p className="care-eyebrow">The standard</p>
          <h2 className="max-w-3xl text-2xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Built around what care homes actually need from a staffing partner.
          </h2>
        </CareReveal>
        <CareReveal delay={0.08}>
          <blockquote className="max-w-4xl border-l-2 border-[var(--cc-red)] pl-6 md:pl-10">
            <p className="care-serif text-lg font-medium leading-relaxed text-[var(--cc-navy)] md:text-xl">
              “Connecting care homes and healthcare providers with skilled, fully vetted healthcare professionals.”
            </p>
            <footer className="mt-5 text-sm font-semibold uppercase tracking-widest text-[var(--cc-muted)]">
              Care Connect
            </footer>
          </blockquote>
        </CareReveal>
        <CareStagger className="mt-10 grid gap-6 md:mb-0 md:grid-cols-3 md:gap-8">
          {commitments.map((item) => (
            <article key={item.title} data-care-item className="care-proof-card border border-[var(--cc-line)] p-6 md:p-10">
              <h3 className="text-xl font-medium leading-[1.1] tracking-tight md:text-2xl">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed">{item.text}</p>
            </article>
          ))}
        </CareStagger>
      </div>
    </section>
  );
}
