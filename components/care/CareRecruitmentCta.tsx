"use client";

import { useRef } from "react";
import Image from "next/image";

import { careImages } from "@/lib/care";
import CareButton from "./CareButton";
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
    <section ref={sectionRef} className="care-cinematic care-cinematic--recruitment">
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
            <CareButton href="/care/apply" surface="dark">
              Join Our Team
            </CareButton>
            <CareButton href="/care/apply#cv" variant="ghost" surface="dark">
              Upload Your CV
            </CareButton>
          </div>
        </div>
      </div>
    </section>
  );
}
