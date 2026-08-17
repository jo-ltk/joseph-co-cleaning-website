"use client";

import { useRef } from "react";
import { Buildings, ClockCountdown, FirstAid, SealCheck } from "@phosphor-icons/react/dist/ssr";

import { careStats } from "@/lib/care";
import { gsap, useGSAP } from "./care-gsap";

const icons = [FirstAid, Buildings, ClockCountdown, SealCheck];

export default function CareStats() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-care-item]");
      const panel = rootRef.current?.querySelector<HTMLElement>(".care-stats-panel");
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            gsap.set([panel, items], { autoAlpha: 1, y: 0 });
            items.forEach((item) => {
              const valueEl = item.querySelector<HTMLElement>("[data-stat-value]");
              const value = Number(item.dataset.value ?? 0);
              const suffix = item.dataset.suffix ?? "";
              if (valueEl) valueEl.textContent = `${value.toLocaleString("en-GB")}${suffix}`;
            });
            return;
          }

          if (panel) {
            gsap.from(panel, {
              autoAlpha: 0,
              y: 28,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 92%",
                once: true,
              },
            });
          }

          items.forEach((item) => {
            const valueEl = item.querySelector<HTMLElement>("[data-stat-value]");
            const value = Number(item.dataset.value ?? 0);
            const suffix = item.dataset.suffix ?? "";
            if (!valueEl) return;

            const render = (n: number) => {
              valueEl.textContent = `${Math.round(n).toLocaleString("en-GB")}${suffix}`;
            };

            const counter = { val: 0 };
            render(0);

            gsap.from(item, {
              autoAlpha: 0,
              y: 16,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            });

            gsap.to(counter, {
              val: value,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
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
    <section ref={rootRef} className="care-stats" aria-label="Care Connect at a glance">
      <div className="care-wrap">
        <div className="care-stats-panel">
          <p className="care-stats-eyebrow">Trusted coverage</p>
          <div className="care-stats-grid">
            {careStats.map((stat, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={stat.label}
                  data-care-item
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                  className="care-stat"
                >
                  <span className="care-stat-icon" aria-hidden>
                    <Icon size={20} weight="duotone" />
                  </span>
                  <div className="care-stat-copy">
                    <p className="care-stat-value">
                      <span data-stat-value>
                        0{stat.suffix}
                      </span>
                    </p>
                    <p className="care-stat-label">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
