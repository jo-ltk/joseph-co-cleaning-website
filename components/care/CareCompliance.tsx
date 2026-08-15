"use client";

import { useRef } from "react";
import {
  CaretLeft,
  CaretRight,
  ClipboardText,
  ClockCounterClockwise,
  FirstAid,
  GraduationCap,
  HandHeart,
  IdentificationCard,
  ShieldCheck,
  TrendUp,
  Umbrella,
  UserList,
} from "@phosphor-icons/react/dist/ssr";

import { complianceItems } from "@/lib/care";
import CareReveal from "./CareReveal";
import { gsap, useGSAP } from "./care-gsap";

const icons = [
  ShieldCheck,
  IdentificationCard,
  UserList,
  ClockCounterClockwise,
  GraduationCap,
  HandHeart,
  FirstAid,
  ClipboardText,
  TrendUp,
  Umbrella,
];

const cards = complianceItems.map((item, index) => ({
  item,
  icon: icons[index],
}));

export default function CareCompliance() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const prev = root.querySelector("[data-compliance-prev]");
      const next = root.querySelector("[data-compliance-next]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 36,
          ease: "none",
          repeat: -1,
        });
        tweenRef.current = tween;

        const pause = () => tween.pause();
        const play = () => {
          if (!root.matches(":hover") && !root.contains(document.activeElement)) {
            tween.play();
          }
        };

        root.addEventListener("mouseenter", pause);
        root.addEventListener("mouseleave", play);
        root.addEventListener("focusin", pause);
        root.addEventListener("focusout", play);

        return () => {
          root.removeEventListener("mouseenter", pause);
          root.removeEventListener("mouseleave", play);
          root.removeEventListener("focusin", pause);
          root.removeEventListener("focusout", play);
          tween.kill();
          tweenRef.current = null;
        };
      });

      const nudge = contextSafe?.((direction: number) => {
        const tween = tweenRef.current;
        if (!tween) return;

        const step = 1 / cards.length;
        const nextProgress = (tween.progress() + direction * step + 1) % 1;
        tween.pause();
        gsap.to(tween, {
          progress: nextProgress,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => {
            if (!root.matches(":hover") && !root.contains(document.activeElement)) {
              tween.play();
            }
          },
        });
      });

      const onPrev = () => nudge?.(-1);
      const onNext = () => nudge?.(1);
      prev?.addEventListener("click", onPrev);
      next?.addEventListener("click", onNext);

      return () => {
        mm.revert();
        prev?.removeEventListener("click", onPrev);
        next?.removeEventListener("click", onNext);
      };
    },
    { scope: rootRef },
  );

  const renderCards = (clone: boolean) =>
    cards.map((card) => {
      const Icon = card.icon;
      return (
        <article
          key={`${clone ? "clone" : "live"}-${card.item}`}
          data-compliance-card
          className="care-compliance-card"
          aria-hidden={clone || undefined}
        >
          <span className="care-compliance-icon" aria-hidden>
            <Icon size={22} weight="duotone" />
          </span>
          <p>{card.item}</p>
        </article>
      );
    });

  return (
    <section ref={rootRef} className="care-compliance">
      <div className="care-wrap">
        <CareReveal className="care-compliance-intro">
          <p className="care-eyebrow">Compliance</p>
          <h2>Compliance Built Into Every Placement</h2>
          <p>
            Our recruitment and quality processes are designed to support safe, reliable and compliant healthcare
            staffing.
          </p>
        </CareReveal>
      </div>

      <div className="care-compliance-stage">
        <div className="care-compliance-viewport" aria-label="Compliance checks carousel">
          <div ref={trackRef} className="care-compliance-track">
            {renderCards(false)}
            {renderCards(true)}
          </div>
        </div>

        <div className="care-compliance-nav">
          <button type="button" data-compliance-prev aria-label="Previous compliance cards">
            <CaretLeft size={16} weight="bold" />
          </button>
          <button type="button" data-compliance-next aria-label="Next compliance cards">
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
