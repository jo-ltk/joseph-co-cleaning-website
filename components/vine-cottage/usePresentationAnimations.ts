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
      // Hero entrance
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.15,
          },
        );
      }

      // Hero image Ken Burns
      const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 1.1 },
          { scale: 1, duration: 2.2, ease: "power2.out" },
        );
      }

      // Section labels fade-up
      const labels = gsap.utils.toArray<HTMLElement>("[data-section-label]");
      labels.forEach((label) => {
        gsap.fromTo(
          label,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: label,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      // Body copy reveals
      const bodyCopy = gsap.utils.toArray<HTMLElement>("[data-body-reveal]");
      bodyCopy.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: i * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      // Card hover micro-interactions
      const hoverCards = gsap.utils.toArray<HTMLElement>("[data-hover-card]");
      hoverCards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            duration: 0.45,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      // Milestone accent animation on scroll
      const milestones = gsap.utils.toArray<HTMLElement>("[data-milestone]");
      milestones.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Stats counter strip
      const stats = gsap.utils.toArray<HTMLElement>("[data-stat]");
      if (stats.length) {
        gsap.fromTo(
          stats,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: stats[0].parentElement,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
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
