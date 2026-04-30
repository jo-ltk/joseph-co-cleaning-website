"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll
 *
 * Architecture:
 * - Lenis drives the scroll position (lerp-smoothed)
 * - GSAP ticker owns the single RAF loop (autoRaf: false)
 * - ScrollTrigger.update() is called directly from Lenis's scroll event
 *   (no debounce, no double-RAF — just one clean pipeline)
 *
 * GPU promotion strategy:
 * - Every parallax element gets will-change + translateZ(0) at init
 * - scale is set once at mount, never re-triggered during scroll
 * - scrub: true with ease:"none" means zero JS easing overhead per frame
 *
 * Cleanup:
 * - All ScrollTrigger instances are killed on unmount (critical for Next.js HMR)
 * - Lenis destroyed, GSAP context reverted, ticker callback removed
 *
 * CSS requirement (add to globals.css):
 *   html { overscroll-behavior: none; }
 *   body { overscroll-behavior: none; }
 */

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Lenis instance ───────────────────────────────────────────────────────
    const lenis = new Lenis({
      lerp: 0.1,           // 0.1 = snappy but smooth; 0.045 was too floaty/slow
      smoothWheel: true,
      syncTouch: true,     // enable smooth on mobile (false = native, which fights Lenis)
      wheelMultiplier: 1,  // 1 = 1:1 with OS scroll speed; don't fight the user
      touchMultiplier: 1,
      anchors: true,
      autoRaf: false,      // GSAP owns the RAF loop — never let two loops compete
    });

    // ── Single RAF pipeline ──────────────────────────────────────────────────
    // GSAP ticker → lenis.raf → Lenis emits scroll → ScrollTrigger.update
    // This is the cleanest possible chain with zero redundant frames.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick, false, false); // useRAF=false: GSAP manages timing
    gsap.ticker.lagSmoothing(0);           // disable lag compensation (prevents jumps)

    // Direct wiring — no debounce, no ticking guard needed because
    // this fires exactly once per Lenis scroll event (which fires per RAF)
    lenis.on("scroll", ScrollTrigger.update);

    // ── ScrollTrigger global config ──────────────────────────────────────────
    ScrollTrigger.config({
      ignoreMobileResize: true, // prevents iOS address-bar resize from killing animations
    });

    // ── GSAP context (scoped, safely reverted on unmount) ────────────────────
    const ctx = gsap.context(() => {

      // ── Parallax ────────────────────────────────────────────────────────────
      // GPU-promote first (batch, before any scroll math runs)
      const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-parallax]");

      // Set scale + GPU hints in one batch — avoids per-element reflows
      gsap.set(parallaxEls, {
        scale: 1.12,
        willChange: "transform",   // tells the browser to create a compositor layer
        force3D: true,             // forces translateZ(0) matrix, keeps on GPU
      });

      parallaxEls.forEach((el) => {
        // data-parallax="0.15" → 15% of viewport travel. Simple, predictable API.
        const speed = parseFloat(el.dataset.parallax ?? "0.15");

        gsap.to(el, {
          // yPercent is transform-only (no layout reflow, fully GPU)
          yPercent: speed * -100,
          ease: "none",            // scrub handles easing — adding ease here doubles work
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,           // scrub:true ties directly to scroll position (no JS spring)
            invalidateOnRefresh: true, // recalculates on window resize (prevents drift)
          },
        });
      });

      // ── Reveal ──────────────────────────────────────────────────────────────
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      // Batch GPU-promote reveal elements too
      gsap.set(revealEls, { willChange: "opacity, transform" });

      revealEls.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? "0");

        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 93%",
              once: true,          // fires once, then ScrollTrigger self-destructs (saves memory)
              onEnter: () => {
                // Remove will-change after animation completes — GPU layers are expensive to hold
                gsap.delayedCall(0.7 + delay, () => {
                  el.style.willChange = "auto";
                });
              },
            },
          }
        );
      });

      // ── Staggered reveal groups ──────────────────────────────────────────────
      // Usage: <ul data-reveal-group> <li data-reveal-item> ... </ul>
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;

        gsap.set(items, { willChange: "opacity, transform" });

        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.08,         // 80ms between each child
            scrollTrigger: {
              trigger: group,
              start: "top 90%",
              once: true,
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

    // ── Cleanup ──────────────────────────────────────────────────────────────
    // Critical for Next.js — HMR will re-run this effect, so we must
    // fully destroy everything or ScrollTriggers stack up and murder performance.
    return () => {
      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      ctx.revert();                          // kills all GSAP animations in this context
      ScrollTrigger.getAll().forEach((t) => t.kill()); // belt-and-suspenders cleanup
    };
  }, []);

  return <>{children}</>;
}