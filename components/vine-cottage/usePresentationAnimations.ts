"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function usePresentationAnimations(reduceMotion: boolean | null) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.12,
          },
        );
      }

      const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 1.12 },
          { scale: 1, duration: 2.4, ease: "power2.out" },
        );
      }

      const labels = gsap.utils.toArray<HTMLElement>("[data-section-label]");
      labels.forEach((label) => {
        gsap.fromTo(
          label,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: label,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      const bodyCopy = gsap.utils.toArray<HTMLElement>("[data-body-reveal]");
      bodyCopy.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      const revealGroups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
      revealGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 22, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      const hoverCards = gsap.utils.toArray<HTMLElement>("[data-hover-card]");
      hoverCards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, { y: -5, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.5, ease: "power2.out" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      const stats = gsap.utils.toArray<HTMLElement>("[data-stat]");
      if (stats.length) {
        gsap.fromTo(
          stats,
          { opacity: 0, y: 18, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stats[0].parentElement,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxEls.forEach((el) => {
        const amount = Number(el.dataset.parallax || "0.1");
        gsap.to(el, {
          yPercent: amount * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const timer = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("resize", refresh);
      window.clearTimeout(timer);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [reduceMotion]);

  return rootRef;
}
