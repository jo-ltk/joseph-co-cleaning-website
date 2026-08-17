"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { careImages } from "@/lib/care";
import { gsap, useGSAP } from "./care-gsap";

export default function CareRecruitmentCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            gsap.set(".care-cinematic-stack", { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            mediaRef.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );

          gsap.from(".care-cinematic-stack", {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
    <section ref={sectionRef} className="care-cinematic">
      <div className="care-cinematic-frame">
        <div ref={mediaRef} className="care-cinematic-media">
          <Image
            src={careImages.recruitment.src}
            alt={careImages.recruitment.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="care-cinematic-stack">
          <h2 className="care-cinematic-copy">
            Ready for Your
            <br />
            Next Opportunity?
          </h2>
          <p className="care-cinematic-lede">
            Join the Care Connect team and become part of a network of skilled healthcare professionals.
          </p>
          <div className="care-cinematic-actions">
            <Link href="/care/apply" className="care-btn care-btn-hero">
              Join Our Team
              <span className="care-btn-hero-icon" aria-hidden>
                <ArrowRight size={16} weight="bold" />
              </span>
            </Link>
            <Link href="/care/apply#cv" className="care-btn care-btn-hero-ghost">
              Upload Your CV
              <span className="care-btn-hero-icon" aria-hidden>
                <ArrowRight size={16} weight="bold" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
