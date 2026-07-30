"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "power2.out";
const DURATION = { short: 0.65, base: 0.85, long: 1.1 } as const;

export function usePresentationAnimations(reduceMotion: boolean | null) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || reduceMotion) return;

      const mm = gsap.matchMedia();
      const cleanups: Array<() => void> = [];

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotionQuery: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotionQuery } = context.conditions ?? {};
          if (reduceMotionQuery) return;

          const hoverLift = isDesktop ? -6 : 0;

          /* ── Hero entrance ─────────────────────────────────────────────── */
          const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
          if (heroItems.length) {
            gsap.fromTo(
              heroItems,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: DURATION.long,
                stagger: 0.12,
                ease: EASE,
                delay: 0.1,
              },
            );
          }

          const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
          if (heroImage) {
            // Keep slight overscale so scrubbed parallax never shows edges
            const restScale = isDesktop ? 1.1 : 1;
            gsap.set(heroImage, { scale: restScale, transformOrigin: "50% 50%" });
            gsap.fromTo(
              heroImage,
              { scale: isDesktop ? 1.18 : 1.04, autoAlpha: 0.85 },
              {
                scale: restScale,
                autoAlpha: 1,
                duration: DURATION.long,
                ease: EASE,
                delay: 0.05,
              },
            );
            if (isDesktop) {
              gsap.to(heroImage, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: heroImage.closest("section") || heroImage,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.6,
                },
              });
            }
          }

          /* ── Section labels — soft fade-up ─────────────────────────────── */
          gsap.utils.toArray<HTMLElement>("[data-section-label]").forEach((label) => {
            gsap.fromTo(
              label,
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: DURATION.short,
                ease: EASE,
                scrollTrigger: {
                  trigger: label,
                  start: "top 92%",
                  once: true,
                },
              },
            );
          });

          /* ── Body copy / leads — gentle opacity + fade-up ──────────────── */
          gsap.utils.toArray<HTMLElement>("[data-body-reveal]").forEach((el) => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: DURATION.base,
                ease: EASE,
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          });

          /* ── Heading blocks without ScrollReveal ───────────────────────── */
          gsap.utils
            .toArray<HTMLElement>("[data-heading-reveal]")
            .forEach((el) => {
              gsap.fromTo(
                el,
                { autoAlpha: 0, y: 22 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: DURATION.base,
                  ease: EASE,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    once: true,
                  },
                },
              );
            });

          /* ── Staggered reveal groups (galleries, grids, CTA) ───────────── */
          gsap.utils
            .toArray<HTMLElement>("[data-reveal-group]")
            .forEach((group) => {
              const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
              if (!items.length) return;

              gsap.fromTo(
                items,
                { autoAlpha: 0, y: 26, scale: 0.97 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: DURATION.base,
                  stagger: 0.1,
                  ease: EASE,
                  scrollTrigger: {
                    trigger: group,
                    start: "top 82%",
                    once: true,
                  },
                },
              );
            });

          /* ── Large image scale-in ──────────────────────────────────────── */
          gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
            gsap.fromTo(
              el,
              { scale: 1.06, autoAlpha: 0.72 },
              {
                scale: 1,
                autoAlpha: 1,
                duration: DURATION.long,
                ease: EASE,
                scrollTrigger: {
                  trigger: el.parentElement || el,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });

          /* ── Lifestyle / gallery image parallax (subtle, desktop) ──────── */
          if (isDesktop) {
            gsap.utils
              .toArray<HTMLElement>("[data-image-parallax]")
              .forEach((el) => {
                const amount = Number(el.dataset.imageParallax || "8");
                gsap.fromTo(
                  el,
                  { yPercent: -amount * 0.35 },
                  {
                    yPercent: amount * 0.65,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el.parentElement || el,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                    },
                  },
                );
              });
          }

          /* ── Split / large media: scale-in + subtle parallax ───────────── */
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            // Hero handles its own parallax
            if (el.hasAttribute("data-hero-image")) return;

            const amount = Number(el.dataset.parallax || "0.1");
            const trigger = el.parentElement || el;
            const restScale = isDesktop ? 1.08 : 1;

            gsap.set(el, { transformOrigin: "50% 50%" });
            gsap.fromTo(
              el,
              { scale: isDesktop ? 1.14 : 1.03, autoAlpha: 0.7 },
              {
                scale: restScale,
                autoAlpha: 1,
                duration: DURATION.long,
                ease: EASE,
                scrollTrigger: {
                  trigger,
                  start: "top 88%",
                  once: true,
                },
              },
            );

            if (isDesktop) {
              gsap.to(el, {
                yPercent: amount * 100,
                ease: "none",
                scrollTrigger: {
                  trigger,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.65,
                },
              });
            }
          });

          /* ── Room tour panels — once-per-enter fade + scale ────────────── */
          const roomPanels = gsap.utils.toArray<HTMLElement>("[data-room-panel]");
          if (roomPanels.length) {
            ScrollTrigger.batch(roomPanels, {
              start: "top 78%",
              once: true,
              interval: 0.12,
              batchMax: 2,
              onEnter: (batch) => {
                batch.forEach((panel) => {
                  const image = panel.querySelector<HTMLElement>("[data-room-image]");
                  const meta = panel.querySelector<HTMLElement>("[data-room-meta]");

                  if (image) {
                    const fromScale = isDesktop ? 1.1 : 1.02;
                    const toScale = isDesktop ? 1.04 : 1;
                    gsap.fromTo(
                      image,
                      { scale: fromScale, autoAlpha: 0.75 },
                      {
                        scale: toScale,
                        autoAlpha: 1,
                        duration: DURATION.long,
                        ease: EASE,
                        overwrite: "auto",
                      },
                    );
                  }

                  if (meta) {
                    gsap.fromTo(
                      meta.children,
                      { autoAlpha: 0, y: 20 },
                      {
                        autoAlpha: 1,
                        y: 0,
                        duration: DURATION.base,
                        stagger: 0.08,
                        ease: EASE,
                        delay: 0.12,
                        overwrite: "auto",
                      },
                    );
                  }
                });
              },
            });
          }

          /* ── Floor plan scale-in ───────────────────────────────────────── */
          const floorPlan = root.querySelector<HTMLElement>("[data-floor-plan]");
          if (floorPlan) {
            gsap.fromTo(
              floorPlan,
              { autoAlpha: 0, y: 32, scale: 0.97 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: DURATION.long,
                ease: EASE,
                scrollTrigger: {
                  trigger: floorPlan,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          }

          /* ── Stats strip ───────────────────────────────────────────────── */
          const stats = gsap.utils.toArray<HTMLElement>("[data-stat]");
          if (stats.length) {
            gsap.fromTo(
              stats,
              { autoAlpha: 0, y: 18, scale: 0.96 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: DURATION.short,
                stagger: 0.08,
                ease: EASE,
                scrollTrigger: {
                  trigger: stats[0].parentElement,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          }

          /* ── Elegant hover lifts (desktop only) ────────────────────────── */
          if (hoverLift !== 0) {
            gsap.utils.toArray<HTMLElement>("[data-hover-card]").forEach((card) => {
              const onEnter = () => {
                gsap.to(card, {
                  y: hoverLift,
                  duration: 0.55,
                  ease: EASE,
                  overwrite: "auto",
                });
              };
              const onLeave = () => {
                gsap.to(card, {
                  y: 0,
                  duration: 0.7,
                  ease: EASE,
                  overwrite: "auto",
                });
              };
              card.addEventListener("mouseenter", onEnter);
              card.addEventListener("mouseleave", onLeave);
              cleanups.push(() => {
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mouseleave", onLeave);
              });
            });

            gsap.utils.toArray<HTMLElement>("[data-hover-cta]").forEach((cta) => {
              const onEnter = () => {
                gsap.to(cta, {
                  y: -2,
                  scale: 1.02,
                  duration: 0.5,
                  ease: EASE,
                  overwrite: "auto",
                });
              };
              const onLeave = () => {
                gsap.to(cta, {
                  y: 0,
                  scale: 1,
                  duration: 0.6,
                  ease: EASE,
                  overwrite: "auto",
                });
              };
              cta.addEventListener("mouseenter", onEnter);
              cta.addEventListener("mouseleave", onLeave);
              cleanups.push(() => {
                cta.removeEventListener("mouseenter", onEnter);
                cta.removeEventListener("mouseleave", onLeave);
              });
            });
          }

          return () => {
            cleanups.forEach((fn) => fn());
            cleanups.length = 0;
          };
        },
      );

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);
      const timer = window.setTimeout(refresh, 450);

      // Images loading can shift layout — refresh once more after settle
      const lateRefresh = window.setTimeout(refresh, 1200);

      return () => {
        window.removeEventListener("resize", refresh);
        window.clearTimeout(timer);
        window.clearTimeout(lateRefresh);
        cleanups.forEach((fn) => fn());
        mm.revert();
      };
    },
    { dependencies: [reduceMotion], scope: rootRef },
  );

  return rootRef;
}
