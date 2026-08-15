"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "./care-gsap";

const features = [
  {
    title: "Fast Response",
    text: "Rapid support for urgent staffing requirements.",
  },
  {
    title: "Fully Vetted",
    text: "Appropriate DBS, registration, references and employment checks.",
  },
  {
    title: "Skilled Professionals",
    text: "Experienced healthcare professionals across different care requirements.",
  },
  {
    title: "24/7 Support",
    text: "A dedicated team available around the clock.",
  },
];

const COUNT = features.length;
const STEP = 360 / COUNT;

export default function CareWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const orbit = orbitRef.current;
      if (!section || !orbit) return;

      const copies = gsap.utils.toArray<HTMLElement>("[data-why-copy]", section);
      const indexes = gsap.utils.toArray<HTMLElement>("[data-why-index]", section);
      const satellites = gsap.utils.toArray<HTMLElement>("[data-why-satellite]", section);
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const showActive = (index: number, direction = 1) => {
            const enterY = direction > 0 ? 14 : -14;
            const leaveY = direction > 0 ? -12 : 12;

            copies.forEach((el, i) => {
              if (i === index) {
                gsap.fromTo(
                  el,
                  { autoAlpha: 0, y: enterY },
                  { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out", overwrite: "auto" },
                );
                return;
              }
              gsap.to(el, { autoAlpha: 0, y: leaveY, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            });

            indexes.forEach((el, i) => {
              gsap.to(el, {
                autoAlpha: i === index ? 1 : 0,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          };

          const hideApexSatellite = (rotation: number) => {
            satellites.forEach((el, index) => {
              const world = ((rotation - index * STEP) % 360 + 360) % 360;
              el.classList.toggle("is-apex", world < 22 || world > 338);
            });
          };

          gsap.set(orbit, { rotation: 0, transformOrigin: "50% 50%" });
          gsap.set(copies, { autoAlpha: 0, y: 16 });
          gsap.set(copies[0], { autoAlpha: 1, y: 0 });
          gsap.set(indexes, { autoAlpha: 0 });
          gsap.set(indexes[0], { autoAlpha: 1 });
          hideApexSatellite(0);

          if (context.conditions?.reduce) return;

          let activeIndex = 0;

          gsap.to(orbit, {
            rotation: (COUNT - 1) * STEP,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${(COUNT - 1) * window.innerHeight}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: 0.85,
              snap: {
                snapTo: 1 / (COUNT - 1),
                duration: { min: 0.6, max: 1 },
                delay: 0.06,
                ease: "power2.inOut",
              },
              onUpdate: (self) => {
                const rotation = self.progress * (COUNT - 1) * STEP;
                hideApexSatellite(rotation);

                const next = Math.round(self.progress * (COUNT - 1));
                if (next !== activeIndex) {
                  const direction = next > activeIndex ? 1 : -1;
                  activeIndex = next;
                  showActive(next, direction);
                }
              },
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="why-us" className="care-why scroll-mt-24">
      <div className="care-why-pin">
        <div className="care-wrap care-why-heading">
          <p className="care-eyebrow">Why Care Connect</p>
          <h2>More Than Staffing. A Reliable Care Partner.</h2>
        </div>

        <div className="care-why-stage">
          <div className="care-why-orbit-wrap">
            <div ref={orbitRef} className="care-why-orbit">
              <div className="care-why-ring" />
              {features.map((feature, index) => (
                <span
                  key={feature.title}
                  className="care-why-arm"
                  style={{ transform: `rotate(${-index * STEP}deg)` }}
                  aria-hidden
                >
                  <span
                    data-why-satellite
                    className={`care-why-satellite${index === 0 ? " is-apex" : ""}`}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="care-why-axis">
            <div className="care-why-index-stack" aria-hidden>
              {features.map((feature, index) => (
                <span key={feature.title} data-why-index className="care-why-index">
                  {index + 1}
                </span>
              ))}
            </div>
            <span className="care-why-dot" aria-hidden />
            <span className="care-why-stem" aria-hidden />
            <div className="care-why-copy" aria-live="polite">
              {features.map((feature) => (
                <div key={feature.title} data-why-copy className="care-why-copy-item">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
