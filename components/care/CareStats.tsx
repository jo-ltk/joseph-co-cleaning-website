"use client";

import { useRef } from "react";

import { careStats } from "@/lib/care";
import { gsap, useGSAP } from "./care-gsap";

export default function CareStats() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-care-item]");
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          items.forEach((item) => {
            const valueEl = item.querySelector<HTMLElement>("[data-stat-value]");
            const value = Number(item.dataset.value ?? 0);
            const suffix = item.dataset.suffix ?? "";
            if (!valueEl) return;

            const render = (n: number) => {
              valueEl.textContent = `${Math.round(n).toLocaleString("en-GB")}${suffix}`;
            };

            if (context.conditions?.reduce) {
              gsap.set(item, { autoAlpha: 1, y: 0 });
              render(value);
              return;
            }

            const counter = { val: 0 };
            render(0);

            gsap.from(item, {
              autoAlpha: 0,
              y: 18,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            });

            gsap.to(counter, {
              val: value,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
              onUpdate: () => render(counter.val),
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="care-stats border-y border-[var(--cc-line)] bg-[var(--cc-navy)] text-[var(--cc-white)]">
      <div className="care-wrap grid grid-cols-2 gap-px md:grid-cols-4">
        {careStats.map((stat) => (
          <div
            key={stat.label}
            data-care-item
            data-value={stat.value}
            data-suffix={stat.suffix}
            className="px-2 py-10 md:px-6 md:py-14"
          >
            <p className="care-serif text-2xl font-medium leading-[1.1] tracking-tight text-white md:text-4xl">
              <span data-stat-value>
                0{stat.suffix}
              </span>
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed !text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
