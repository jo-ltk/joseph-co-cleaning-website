"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Detect mobile ────────────────────────────────────────────────────────
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      || window.matchMedia("(pointer: coarse)").matches;

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // ── Mobile: skip Lenis, use native scroll ────────────────────────────────
    if (isMobile) {
      ScrollTrigger.normalizeScroll(false); // never fight native touch

      const ctx = gsap.context(() => {
        // Parallax — disabled on mobile (too expensive, never feels right)
        // Reveal animations still work perfectly with native scroll
        const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        revealEls.forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay ?? "0");
          gsap.fromTo(
            el,
            { opacity: 0, y: 22 },
            {
              opacity: 1, y: 0, duration: 0.7, delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 93%",
                once: true,
              },
            }
          );
        });

        const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
        groups.forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { opacity: 0, y: 18 },
            {
              opacity: 1, y: 0, duration: 0.65,
              ease: "power2.out", stagger: 0.08,
              scrollTrigger: {
                trigger: group,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      });

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    // ── Desktop: full Lenis pipeline ─────────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,   // false on desktop path — this branch never runs on mobile
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: true,
      autoRaf: false,
    });

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick, false, false);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      gsap.set(parallaxEls, { scale: 1.12, willChange: "transform", force3D: true });

      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0.15");
        gsap.to(el, {
          yPercent: speed * -100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(revealEls, { willChange: "opacity, transform" });
      revealEls.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0, duration: 0.7, delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el, start: "top 93%", once: true,
              onEnter: () => {
                gsap.delayedCall(0.7 + delay, () => {
                  el.style.willChange = "auto";
                });
              },
            },
          }
        );
      });

      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;
        gsap.set(items, { willChange: "opacity, transform" });
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.65,
            ease: "power2.out", stagger: 0.08,
            scrollTrigger: {
              trigger: group, start: "top 90%", once: true,
              onEnter: () => {
                gsap.delayedCall(0.65 + items.length * 0.08, () => {
                  items.forEach((item) => (item.style.willChange = "auto"));
                });
              },
            },
          }
        );
      });
    });

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}