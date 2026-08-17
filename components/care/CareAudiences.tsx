"use client";

import { useRef } from "react";
import Image from "next/image";

import { careImages } from "@/lib/care";
import CareButton from "./CareButton";
import { gsap, useGSAP } from "./care-gsap";
import CareSectionHeading from "./CareSectionHeading";
import { useCareUi } from "./CareUi";

const audiences = [
  {
    id: "homes",
    title: "Reliable staff, when you need them.",
    copy: "Qualified healthcare professionals for planned rotas, urgent cover and ongoing care.",
    image: careImages.facility,
    cta: "Find Staff",
    href: null,
  },
  {
    id: "professionals",
    title: "Your skills, the right opportunity.",
    copy: "Join our network of healthcare professionals and work with trusted providers.",
    image: careImages.nurse,
    cta: "Join Our Team",
    href: "/care/apply",
  },
] as const;

function AudienceMark() {
  return (
    <span className="care-audience-mark" aria-hidden>
      <span className="care-audience-mark-circle" />
      <span className="care-audience-mark-square" />
    </span>
  );
}

export default function CareAudiences() {
  const { openRequest } = useCareUi();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const frames = gsap.utils.toArray<HTMLElement>(".care-audience-frame", section);
      const intro = section.querySelector<HTMLElement>(".care-audiences-intro");
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            gsap.set([intro, frames], { autoAlpha: 1, y: 0, x: 0, clipPath: "none", scale: 1 });
            gsap.set(".care-audience-photo-media", { yPercent: 0, scale: 1 });
            gsap.set(".care-audience-copycard > *", { autoAlpha: 1, y: 0 });
            return;
          }

          if (intro) {
            gsap.from(intro, {
              autoAlpha: 0,
              y: 28,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: intro,
                start: "top 88%",
                once: true,
              },
            });
          }

          frames.forEach((frame, index) => {
            const photo = frame.querySelector<HTMLElement>(".care-audience-photo");
            const media = frame.querySelector<HTMLElement>(".care-audience-photo-media");
            const copy = frame.querySelector<HTMLElement>(".care-audience-copycard");
            const copyBits = copy?.children ?? [];
            const fromX = index === 0 ? -36 : 36;

            gsap.set(photo, { clipPath: "inset(14% 10% 14% 10% round 2rem)" });
            gsap.set(media, { scale: 1.12, transformOrigin: "center center" });
            gsap.set(copyBits, { autoAlpha: 0, y: 28 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: frame,
                start: "top 72%",
                end: "top 18%",
                toggleActions: "play none none reverse",
              },
            });

            tl.to(photo, {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              duration: 1.15,
              ease: "power3.inOut",
            }).to(
              media,
              {
                scale: 1,
                duration: 1.35,
                ease: "power2.out",
              },
              0,
            );

            if (copy) {
              tl.from(
                copy,
                {
                  autoAlpha: 0,
                  x: fromX,
                  duration: 0.85,
                  ease: "power3.out",
                },
                0.28,
              ).to(
                copyBits,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.65,
                  stagger: 0.09,
                  ease: "power3.out",
                },
                0.42,
              );
            }

            if (media) {
              gsap.fromTo(
                media,
                { yPercent: -7 },
                {
                  yPercent: 7,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.85,
                  },
                },
              );
            }
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="facilities" className="care-audiences scroll-mt-24">
      <div className="care-wrap">
        <div className="care-audiences-intro">
          <CareSectionHeading
            eyebrow="Two audiences. One standard."
            lines={["Staffing that serves", "both sides of care."]}
          />
        </div>
      </div>

      <div className="care-audiences-stack">
        {audiences.map((audience, index) => {
          const cta = audience.href ? (
            <CareButton href={audience.href} variant={index === 1 ? "ghost" : "solid"}>
              {audience.cta}
            </CareButton>
          ) : (
            <CareButton onClick={openRequest}>{audience.cta}</CareButton>
          );

          return (
            <article
              key={audience.id}
              className={`care-audience-frame${index === 1 ? " care-audience-frame--flip" : ""}`}
            >
              <div className="care-audience-photo">
                <div className="care-audience-photo-media">
                  <Image
                    src={audience.image.src}
                    alt={audience.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="care-audience-copycard">
                <AudienceMark />
                <div className="care-audience-copycard-main">
                  <h3>{audience.title}</h3>
                  <p>{audience.copy}</p>
                </div>
                {cta}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
