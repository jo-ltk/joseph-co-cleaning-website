"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "./care-gsap";

type CareRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
};

export default function CareReveal({
  children,
  className,
  delay = 0,
  y = 22,
  x = 0,
}: CareRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            gsap.set(el, { autoAlpha: 1, x: 0, y: 0 });
            return;
          }

          gsap.from(el, {
            autoAlpha: 0,
            y,
            x,
            duration: 0.8,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay, x, y] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function CareStagger({
  children,
  className,
  y = 22,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>("[data-care-item]");
      if (!items.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(items, {
            autoAlpha: 0,
            y,
            duration: 0.7,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [stagger, y] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
