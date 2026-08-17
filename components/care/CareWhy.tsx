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
const TRAVEL = (COUNT - 1) * STEP;

export default function CareWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const orbit = orbitRef.current;
      const halo = haloRef.current;
      if (!section || !orbit) return;

      const heading = section.querySelector<HTMLElement>(".care-why-heading");
      const copies = gsap.utils.toArray<HTMLElement>("[data-why-copy]", section);
      const indexes = gsap.utils.toArray<HTMLElement>("[data-why-index]", section);
      const satellites = gsap.utils.toArray<HTMLElement>("[data-why-satellite]", section);
      const dot = section.querySelector<HTMLElement>(".care-why-dot");
      const stem = section.querySelector<HTMLElement>(".care-why-stem");
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const showActive = (index: number, direction = 1) => {
            const enterY = direction > 0 ? 28 : -28;
            const leaveY = direction > 0 ? -18 : 18;

            copies.forEach((el, i) => {
              const bits = el.querySelectorAll("h3, p");
              if (i === index) {
                gsap.set(el, { autoAlpha: 1, overwrite: "auto" });
                gsap.fromTo(
                  bits,
                  { autoAlpha: 0, y: enterY },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.72,
                    stagger: 0.07,
                    ease: "power3.out",
                    overwrite: "auto",
                  },
                );
                return;
              }

              gsap.to(bits, {
                autoAlpha: 0,
                y: leaveY,
                duration: 0.28,
                ease: "power2.in",
                overwrite: "auto",
              });
              gsap.to(el, { autoAlpha: 0, duration: 0.28, ease: "power2.in", overwrite: "auto" });
            });

            indexes.forEach((el, i) => {
              if (i === index) {
                gsap.fromTo(
                  el,
                  { autoAlpha: 0, scale: 0.72, y: direction * 10 },
                  {
                    autoAlpha: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power3.out",
                    overwrite: "auto",
                  },
                );
                return;
              }
              gsap.to(el, {
                autoAlpha: 0,
                scale: 0.86,
                duration: 0.22,
                ease: "power2.in",
                overwrite: "auto",
              });
            });

            if (dot) {
              gsap.fromTo(
                dot,
                { scale: 1 },
                {
                  scale: 1.28,
                  duration: 0.22,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.out",
                  overwrite: "auto",
                },
              );
            }
          };

          const paintOrbit = (rotation: number) => {
            satellites.forEach((el, index) => {
              const world = ((rotation - index * STEP) % 360 + 360) % 360;
              const dist = Math.min(world, 360 - world);
              const near = gsap.utils.clamp(0, 1, 1 - dist / 72);
              const visible = gsap.utils.clamp(0, 1, dist / 14);

              gsap.set(el, {
                scale: 1 + near * 2.4,
                opacity: visible * (0.2 + near * 0.8),
                backgroundColor: gsap.utils.interpolate("#ffffff", "#3164B7", near),
              });
            });

            if (halo) gsap.set(halo, { rotation: -rotation * 0.42, transformOrigin: "50% 50%" });
            if (stem) {
              const stepped = rotation / STEP;
              const settled = 1 - Math.abs(stepped - Math.round(stepped));
              gsap.set(stem, { scaleY: 0.94 + settled * 0.06, transformOrigin: "50% 0%" });
            }
          };

          gsap.set(orbit, { rotation: 0, transformOrigin: "50% 50%" });
          gsap.set(halo, { rotation: 0, transformOrigin: "50% 50%" });
          gsap.set(copies, { autoAlpha: 0 });
          gsap.set(copies[0], { autoAlpha: 1 });
          gsap.set(indexes, { autoAlpha: 0, scale: 0.86 });
          gsap.set(indexes[0], { autoAlpha: 1, scale: 1 });
          paintOrbit(0);

          if (context.conditions?.reduce) return;

          if (heading) {
            gsap.from(heading.children, {
              autoAlpha: 0,
              y: 18,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                once: true,
              },
            });
          }

          let activeIndex = 0;

          gsap.to(orbit, {
            rotation: TRAVEL,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${(COUNT - 1) * window.innerHeight * 0.92}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              scrub: 1.15,
              snap: {
                snapTo: 1 / (COUNT - 1),
                duration: { min: 0.28, max: 0.55 },
                delay: 0,
                directional: true,
                ease: "power3.inOut",
              },
              onUpdate: (self) => {
                const rotation = self.progress * TRAVEL;
                paintOrbit(rotation);

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
            <div ref={haloRef} className="care-why-halo" aria-hidden>
              <span className="care-why-halo-ring" />
              <span className="care-why-halo-ring care-why-halo-ring--inner" />
            </div>
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
