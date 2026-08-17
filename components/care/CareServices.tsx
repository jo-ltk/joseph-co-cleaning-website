"use client";

import { useRef } from "react";
import { CookingPot, FirstAid, Handshake, HouseLine, User } from "@phosphor-icons/react/dist/ssr";

import { careServices } from "@/lib/care";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./care-gsap";

const icons = [FirstAid, User, Handshake, HouseLine, CookingPot];

export default function CareServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const pin = section.querySelector<HTMLElement>(".care-services-pin");
      const viewport = section.querySelector<HTMLElement>(".care-services-viewport");
      const track = section.querySelector<HTMLElement>(".care-services-track");
      const heading = section.querySelector<HTMLElement>(".care-services-title");
      const introBits = gsap.utils.toArray<HTMLElement>("[data-service-intro]", section);
      const cards = gsap.utils.toArray<HTMLElement>(".care-service-card", section);
      const progress = section.querySelector<HTMLElement>(".care-services-progress-bar");
      const indexEl = section.querySelector<HTMLElement>("[data-service-index]");
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { reduce, motion, desktop } = context.conditions ?? {};

          if (reduce || !heading || !track || !viewport || !pin) {
            gsap.set([introBits, cards, heading], { autoAlpha: 1, y: 0, x: 0, clearProps: "clipPath" });
            return;
          }

          const split = SplitText.create(heading, {
            type: "words,chars",
            mask: "words",
            charsClass: "care-services-char",
            wordsClass: "care-services-word",
          });

          gsap.set(split.chars, { yPercent: 118 });
          gsap.set(introBits, { autoAlpha: 0, y: 18 });

          const introTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });

          introTl
            .to(introBits, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            })
            .to(
              split.chars,
              {
                yPercent: 0,
                duration: 0.9,
                stagger: 0.018,
                ease: "power3.out",
              },
              0.12,
            );

          const setActive = (progressValue: number) => {
            const i = Math.round(progressValue * Math.max(cards.length - 1, 1));
            cards.forEach((card, idx) => card.classList.toggle("is-active", idx === i));
            if (indexEl) indexEl.textContent = String(i + 1).padStart(2, "0");
            if (progress) gsap.set(progress, { scaleX: progressValue });
          };

          setActive(0);

          if (desktop && motion) {
            cards.forEach((card, index) => {
              const bits = card.querySelectorAll("[data-service-bit]");
              if (index === 0) return;
              gsap.set(bits, { autoAlpha: 0, y: 28 });
            });

            const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

            const scrollTween = gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                pin,
                scrub: 0.75,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                end: () => `+=${Math.max(getDistance() * 1.2, window.innerHeight)}`,
                onUpdate: (self) => setActive(self.progress),
              },
            });

            cards.forEach((card, index) => {
              if (index === 0) return;
              const bits = card.querySelectorAll("[data-service-bit]");
              gsap.to(bits, {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 78%",
                  toggleActions: "play none none reverse",
                },
              });
            });
          } else if (motion) {
            ScrollTrigger.create({
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              onUpdate: (self) => setActive(self.progress),
            });

            cards.forEach((card) => {
              const bits = card.querySelectorAll("[data-service-bit]");
              gsap.set(card, { clipPath: "inset(12% 8% 12% 8% round 1.4rem)" });
              gsap.set(bits, { autoAlpha: 0, y: 24 });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              });

              tl.to(card, {
                clipPath: "inset(0% 0% 0% 0% round 1.4rem)",
                duration: 0.9,
                ease: "power3.inOut",
              }).to(
                bits,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.07,
                  ease: "power3.out",
                },
                0.18,
              );
            });
          }

          return () => split.revert();
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="services" className="care-services scroll-mt-24">
      <div className="care-services-pin">
        <div className="care-wrap care-services-head">
          <p className="care-eyebrow" data-service-intro>
            Services
          </p>
          <div className="care-services-head-row">
            <h2 className="care-services-title">Healthcare Professionals You Can Rely On</h2>
            <p className="care-services-lede" data-service-intro>
              Flexible staffing solutions for care homes and healthcare providers.
            </p>
          </div>
          <div className="care-services-meta" data-service-intro>
            <span className="care-services-count">
              <span data-service-index>01</span>
              <span aria-hidden> / {String(careServices.length + 1).padStart(2, "0")}</span>
            </span>
            <span className="care-services-progress" aria-hidden>
              <span className="care-services-progress-bar" />
            </span>
          </div>
        </div>

        <div className="care-services-viewport">
          <div className="care-services-track">
            {careServices.map((service, index) => {
              const Icon = icons[index];
              return (
                <article key={service.title} className="care-service-card">
                  <div className="care-service-top">
                    <span className="care-service-index" data-service-bit>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="care-service-icon" data-service-bit aria-hidden>
                      <Icon size={32} weight="duotone" />
                    </span>
                  </div>
                  <h3 data-service-bit>{service.title}</h3>
                  <p data-service-bit>{service.text}</p>
                </article>
              );
            })}
            <article className="care-service-card care-service-card--cta">
              <div className="care-service-top">
                <span className="care-service-index" data-service-bit>
                  {String(careServices.length + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 data-service-bit>Coverage that stays close to the floor.</h3>
              <p data-service-bit>
                Planned rotas, urgent cover and ongoing support — coordinated by a dedicated team.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
