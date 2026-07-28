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
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <SectionLabel variant="dark">Partnership</SectionLabel>
              <ScrollReveal
                as="h2"
                containerClassName="mt-4 text-4xl leading-[1.02] font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                A Long-Term Partnership Built on Trust
              </ScrollReveal>
            </div>

            <div className="flex flex-col justify-between gap-8 lg:gap-10">
              <p className="max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                Joseph &amp; Co is committed to treating Vine Cottage with the same care and
                respect as if it were our own—delivering exceptional guest experiences while
                protecting your investment and preserving the historic character of this
                remarkable property.
              </p>

              <div className={footerStyles.presentedBy}>
                <p className="text-sm font-semibold uppercase tracking-widest text-yellow-green">
                  Presented by
                </p>
                <p className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                  Joseph &amp; Co Property Ltd
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={footerStyles.meta}>
          <p>Vine Cottage &middot; Queen Camel, Somerset</p>
          <p className="tracking-wide">Confidential presentation</p>
        </div>
      </div>
    </footer>
  );
}
