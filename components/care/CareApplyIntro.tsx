"use client";

import { useRef } from "react";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

import { careImages } from "@/lib/care";
import { gsap, useGSAP } from "./care-gsap";

const points = [
  "Join a trusted network of healthcare professionals across the UK.",
  "Work with care homes, nursing homes and healthcare providers that value quality.",
  "A dedicated team is available to support you through onboarding and placement.",
] as const;

export default function CareApplyIntro() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const copy = gsap.utils.toArray<HTMLElement>(".care-apply-copy > *", root);
      const photo = root.querySelector<HTMLElement>(".care-apply-photo");
      const media = root.querySelector<HTMLElement>(".care-apply-photo-media");
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            if (copy.length) gsap.set(copy, { autoAlpha: 1, y: 0 });
            if (photo) gsap.set(photo, { autoAlpha: 1, y: 0 });
            return;
          }

          if (copy.length) {
            gsap.from(copy, {
              autoAlpha: 0,
              y: 22,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            });
          }

          if (photo) {
            gsap.from(photo, {
              autoAlpha: 0,
              duration: 1.05,
              ease: "power3.out",
            });
          }

          if (media) {
            gsap.fromTo(
              media,
              { yPercent: -6, scale: 1.08 },
              {
                yPercent: 6,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              },
            );
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <aside ref={rootRef} className="care-apply-intro">
      <div className="care-apply-deco" aria-hidden>
        <span className="care-apply-deco-line care-apply-deco-line--red" />
        <span className="care-apply-deco-line care-apply-deco-line--blue" />
      </div>

      <figure className="care-apply-photo">
        <div className="care-apply-photo-media">
          <Image
            src={careImages.apply.src}
            alt={careImages.apply.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </figure>

      <div className="care-apply-copy">
        <span className="care-audience-mark" aria-hidden>
          <span className="care-audience-mark-circle" />
          <span className="care-audience-mark-square" />
        </span>
        <p className="care-eyebrow">Join our team</p>
        <h1>Build Your Career With Care Connect</h1>
        <p>
          We&apos;re looking for skilled and compassionate healthcare professionals to join our growing network.
        </p>
        <ul className="care-apply-points">
          {points.map((point) => (
            <li key={point}>
              <CheckCircle size={20} weight="fill" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
