"use client";

import { useRef } from "react";
import { CookingPot, FirstAid, Handshake, HouseLine, User } from "@phosphor-icons/react/dist/ssr";

import { careServices } from "@/lib/care";
import CareButton from "./CareButton";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./care-gsap";
import CareSectionHeading from "./CareSectionHeading";
import { useCareUi } from "./CareUi";

const icons = [FirstAid, User, Handshake, HouseLine, CookingPot];

export default function CareServices() {
  const { openRequest } = useCareUi();
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

          gsap.set(cards, { autoAlpha: 0, y: 36 });

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
            )
            .to(
              cards,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.09,
                ease: "power3.out",
              },
              0.28,
            );

          const setActive = (progressValue: number) => {
            const i = Math.round(progressValue * Math.max(cards.length - 1, 1));
            cards.forEach((card, idx) => card.classList.toggle("is-active", idx === i));
            if (indexEl) indexEl.textContent = String(i + 1).padStart(2, "0");
            if (progress) gsap.set(progress, { scaleX: progressValue });
          };

          setActive(0);

          if (desktop && motion) {
            cards.forEach((card) => {
              gsap.set(card.querySelectorAll("[data-service-bit]"), { autoAlpha: 1, y: 0 });
            });

            const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

            gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                pin,
                scrub: 0.85,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                end: () => `+=${Math.max(getDistance() * 1.15, window.innerHeight * 0.7)}`,
                onUpdate: (self) => setActive(self.progress),
              },
            });

            let cancelled = false;
            const refreshTriggers = () => {
              if (!cancelled) ScrollTrigger.refresh();
            };
            let rafInner = 0;
            const raf = requestAnimationFrame(() => {
              rafInner = requestAnimationFrame(refreshTriggers);
            });
            document.fonts?.ready.then(refreshTriggers);

            return () => {
              cancelled = true;
              cancelAnimationFrame(raf);
              cancelAnimationFrame(rafInner);
              split.revert();
            };
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
          <CareSectionHeading
            eyebrow="Services"
            lines={["Healthcare Professionals", "You Can Rely On"]}
            titleClassName="care-services-title"
            eyebrowAttrs={{ "data-service-intro": true }}
          >
            <p className="care-services-lede" data-service-intro>
              Flexible staffing solutions for care homes and healthcare providers.
            </p>
            <div className="care-section-links" data-service-intro>
              <CareButton onClick={openRequest}>Find Staff</CareButton>
              <CareButton href="/care/apply" variant="ghost">
                Join Our Team
              </CareButton>
            </div>
          </CareSectionHeading>
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
                  <span className="care-service-index" data-service-bit>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="care-service-icon" data-service-bit aria-hidden>
                    <Icon size={28} weight="duotone" />
                  </span>
                  <h3 data-service-bit>{service.title}</h3>
                  <p data-service-bit>{service.text}</p>
                  <div className="care-card-actions" data-service-bit>
                    <CareButton onClick={openRequest}>Find Staff</CareButton>
                    <CareButton href={service.applyHref} variant="ghost">
                      Join Our Team
                    </CareButton>
                  </div>
                </article>
              );
            })}
            <article className="care-service-card care-service-card--cta">
              <span className="care-service-index" data-service-bit>
                {String(careServices.length + 1).padStart(2, "0")}
              </span>
              <h3 data-service-bit>Coverage that stays close to the floor.</h3>
              <p data-service-bit>
                Planned rotas, urgent cover and ongoing support — coordinated by a dedicated team.
              </p>
              <div className="care-card-actions" data-service-bit>
                <CareButton surface="dark" onClick={openRequest}>
                  Find Staff
                </CareButton>
                <CareButton href="/care/apply" variant="ghost" surface="dark">
                  Join Our Team
                </CareButton>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
