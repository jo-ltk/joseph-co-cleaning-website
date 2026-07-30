"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

import ScrollReveal from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/vine-cottage/PresentationComponents";

import footerStyles from "./partnership-footer.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PartnershipFooter() {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion) return;

      const footer = footerRef.current;
      const content = footer?.querySelector<HTMLElement>("[data-footer-content]");
      if (!footer || !content) return;

      gsap.fromTo(
        content,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: footerRef, dependencies: [reduceMotion] },
  );

  return (
    <footer ref={footerRef} className={footerStyles.footer}>
      <div className={footerStyles.inner}>
        <div data-footer-content className={footerStyles.content}>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div>
              <SectionLabel variant="dark">Presented by</SectionLabel>
              <ScrollReveal
                as="h2"
                containerClassName="mt-3 text-3xl leading-[1.02] font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
              >
                Joseph &amp; Co
              </ScrollReveal>
              <p className="mt-3 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
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
