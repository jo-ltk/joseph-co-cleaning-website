"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import ScrollReveal from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/vine-cottage/PresentationComponents";

import footerStyles from "./partnership-footer.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PartnershipFooter() {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-content]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, footer);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <footer ref={footerRef} className={footerStyles.footer}>
      <div className={footerStyles.inner}>
        <div data-footer-content className={footerStyles.content}>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <SectionLabel variant="dark">Presented by</SectionLabel>
              <ScrollReveal
                as="h2"
                containerClassName="mt-4 text-4xl leading-[1.02] font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
              >
                Joseph &amp; Co
              </ScrollReveal>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                Hotel-standard care for a historic Somerset cottage — heritage protected,
                guests welcomed.
              </p>
            </div>

            <div className="flex flex-col justify-end gap-3 lg:items-end lg:text-right">
              <p className="text-sm font-semibold uppercase tracking-widest text-yellow-green">
                Property Ltd
              </p>
              <a
                href="mailto:hello@josephco.uk?subject=Vine%20Cottage%20enquiry"
                className="text-lg font-medium text-white transition-colors hover:text-yellow-green md:text-xl"
              >
                hello@josephco.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
