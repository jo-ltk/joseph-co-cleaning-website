"use client";

import { useRef } from "react";
import { ClockCountdown, Handshake, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import { gsap, SplitText, useGSAP } from "./care-gsap";
import CareSectionHeading from "./CareSectionHeading";

const commitments = [
  {
    title: "Reliability on the floor",
    text: "Care homes need people who arrive prepared, work with dignity, and keep continuity of care intact.",
    icon: Handshake,
  },
  {
    title: "Checks before placement",
    text: "Vetting, references and training are treated as part of the placement — not an afterthought.",
    icon: ShieldCheck,
  },
  {
    title: "A team that stays reachable",
    text: "24/7 support is there so urgent cover and ongoing needs can be discussed when they arise.",
    icon: ClockCountdown,
  },
];

export default function CareSocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>(".care-standard-heading");
      const quote = section.querySelector<HTMLElement>("[data-standard-quote]");
      const mark = section.querySelector<HTMLElement>(".care-standard-mark");
      const caption = section.querySelector<HTMLElement>(".care-standard-quote figcaption");
      const cards = gsap.utils.toArray<HTMLElement>("[data-standard-card]", section);
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            gsap.set([heading, quote, mark, caption, cards], { autoAlpha: 1, y: 0, scale: 1 });
            return;
          }

          if (heading) {
            gsap.from(heading.children, {
              autoAlpha: 0,
              y: 22,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 84%",
                once: true,
              },
            });
          }

          const quoteBits = [mark, caption].filter(Boolean);
          gsap.from(quoteBits, {
            autoAlpha: 0,
            y: 16,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.querySelector(".care-standard-quote"),
              start: "top 82%",
              once: true,
            },
          });

          if (quote) {
            const split = SplitText.create(quote, { type: "words" });
            gsap.from(split.words, {
              autoAlpha: 0,
              yPercent: 28,
              duration: 0.7,
              stagger: 0.018,
              ease: "power3.out",
              scrollTrigger: {
                trigger: quote,
                start: "top 84%",
                once: true,
              },
            });
          }

          gsap.from(cards, {
            autoAlpha: 0,
            y: 36,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.querySelector(".care-standard-grid"),
              start: "top 86%",
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="care-standard">
      <div className="care-wrap">
        <div className="care-standard-top">
          <CareSectionHeading
            className="care-standard-heading"
            eyebrow="The standard"
            lines={["Built around what", "care homes actually need."]}
          />
          <figure className="care-standard-quote">
            <span className="care-standard-mark" aria-hidden>
              “
            </span>
            <blockquote>
              <p data-standard-quote>
                Connecting care homes and healthcare providers with skilled, fully vetted healthcare
                professionals.
              </p>
            </blockquote>
            <figcaption>
              <span className="care-standard-brand">Care Connect</span>
            </figcaption>
          </figure>
        </div>

        <div className="care-standard-grid">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} data-standard-card className="care-standard-card">
                <div className="care-standard-card-top">
                  <span className="care-standard-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="care-standard-icon" aria-hidden>
                    <Icon size={18} weight="regular" />
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
