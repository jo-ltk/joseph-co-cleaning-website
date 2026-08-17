"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { complianceItems } from "@/lib/care";
import { gsap, SplitText, useGSAP } from "./care-gsap";
import { useCareUi } from "./CareUi";

const COUNT = complianceItems.length;

export default function CareCompliance() {
  const { openRequest } = useCareUi();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!root || !track) return;

      const heading = root.querySelector<HTMLElement>(".care-compliance-title");
      const introBits = gsap.utils.toArray<HTMLElement>("[data-compliance-intro]", root);
      const liveCards = gsap.utils.toArray<HTMLElement>("[data-compliance-card]:not([aria-hidden])", root);
      const progress = root.querySelector<HTMLElement>(".care-compliance-progress-bar");
      const indexEl = root.querySelector<HTMLElement>("[data-compliance-index]");
      const prev = root.querySelector("[data-compliance-prev]");
      const next = root.querySelector("[data-compliance-next]");
      const mm = gsap.matchMedia();

      const resetTrack = () => {
        gsap.killTweensOf(track);
        tweenRef.current = null;
        gsap.set(track, { x: 0, xPercent: 0, clearProps: "transform" });
      };

      const setActive = (progressValue: number) => {
        const i = Math.min(COUNT - 1, Math.max(0, Math.floor(progressValue * COUNT)));
        liveCards.forEach((card, idx) => card.classList.toggle("is-active", idx === i));
        if (indexEl) indexEl.textContent = String(i + 1).padStart(2, "0");
        if (progress) gsap.set(progress, { scaleX: (i + 1) / COUNT });
      };

      setActive(0);

      mm.add("(max-width: 767px)", () => {
        resetTrack();
        gsap.set([introBits, liveCards, heading], { autoAlpha: 1, y: 0, clearProps: "clipPath" });
        return () => resetTrack();
      });

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          if (context.conditions?.reduce || !heading) {
            resetTrack();
            gsap.set([introBits, liveCards, heading], { autoAlpha: 1, y: 0, clearProps: "clipPath" });
            return;
          }

          const split = SplitText.create(heading, {
            type: "words,chars",
            mask: "words",
            charsClass: "care-compliance-char",
            wordsClass: "care-compliance-word",
          });

          const photos = liveCards
            .map((card) => card.querySelector<HTMLElement>(".care-compliance-photo img"))
            .filter((el): el is HTMLElement => Boolean(el));

          gsap.set(split.chars, { yPercent: 118 });
          gsap.set(introBits, { autoAlpha: 0, y: 18 });
          gsap.set(liveCards, { autoAlpha: 0, y: 36 });
          gsap.set(photos, { scale: 1.12 });

          const introTl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
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
            )
            .to(
              liveCards,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.07,
                ease: "power3.out",
              },
              0.28,
            )
            .to(
              photos,
              {
                scale: 1,
                duration: 1.15,
                stagger: 0.07,
                ease: "power3.out",
              },
              0.32,
            );

          const tween = gsap.to(track, {
            xPercent: -50,
            duration: 110,
            ease: "none",
            repeat: -1,
            onUpdate: () => setActive(tween.progress()),
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
            resetTrack();
            split.revert();
          };
        },
      );

      const nudge = contextSafe?.((direction: number) => {
        const tween = tweenRef.current;
        if (tween) {
          const step = 1 / COUNT;
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
          return;
        }

        if (!viewport || liveCards.length === 0) return;
        const card = liveCards[0];
        const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16");
        viewport.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
      });

      const onViewportScroll = () => {
        if (!viewport || liveCards.length === 0 || tweenRef.current) return;
        const focus = viewport.scrollLeft + viewport.clientWidth * 0.35;
        let active = 0;
        liveCards.forEach((card, index) => {
          const left = card.offsetLeft;
          const right = left + card.offsetWidth;
          if (focus >= left && focus < right) active = index;
        });
        setActive((active + 1) / COUNT);
      };

      viewport?.addEventListener("scroll", onViewportScroll, { passive: true });

      const onPrev = () => nudge?.(-1);
      const onNext = () => nudge?.(1);
      prev?.addEventListener("click", onPrev);
      next?.addEventListener("click", onNext);

      return () => {
        mm.revert();
        prev?.removeEventListener("click", onPrev);
        next?.removeEventListener("click", onNext);
        viewport?.removeEventListener("scroll", onViewportScroll);
        resetTrack();
      };
    },
    { scope: rootRef, dependencies: [isMobile] },
  );

  const renderCards = (clone: boolean) =>
    complianceItems.map((card, index) => (
      <article
        key={`${clone ? "clone" : "live"}-${card.title}`}
        data-compliance-card
        className="care-compliance-card"
        aria-hidden={clone || undefined}
      >
        <span className="care-compliance-index">
          {String(index + 1).padStart(2, "0")} · {card.category}
        </span>

        <div className="care-compliance-photo">
          <Image
            src={card.image.src}
            alt={clone ? "" : card.image.alt}
            fill
            sizes="(max-width: 768px) calc(100vw - 2.5rem), 540px"
            className="object-cover"
          />
        </div>

        <h3>{card.title}</h3>
        <p>{card.overview}</p>
        <button type="button" className="care-btn care-btn-primary" tabIndex={clone ? -1 : 0} onClick={openRequest}>
          Request staff
          <span className="care-btn-hero-icon" aria-hidden>
            <ArrowRight size={16} weight="bold" />
          </span>
        </button>
      </article>
    ));

  return (
    <section ref={rootRef} className="care-compliance">
      <div className="care-wrap care-compliance-head">
        <p className="care-eyebrow" data-compliance-intro>
          Compliance
        </p>
        <div className="care-compliance-head-row">
          <h2 className="care-compliance-title">Compliance Built Into Every Placement</h2>
          <p className="care-compliance-lede" data-compliance-intro>
            Our recruitment and quality processes are designed to support safe, reliable and compliant healthcare
            staffing.
          </p>
        </div>
        <div className="care-compliance-meta" data-compliance-intro>
          <span className="care-compliance-count">
            <span data-compliance-index>01</span>
            <span aria-hidden> / {String(COUNT).padStart(2, "0")}</span>
          </span>
          <span className="care-compliance-progress" aria-hidden>
            <span className="care-compliance-progress-bar" />
          </span>
        </div>
      </div>

      <div className="care-compliance-stage">
        <div ref={viewportRef} className="care-compliance-viewport" aria-label="Compliance checks carousel">
          <div ref={trackRef} className="care-compliance-track">
            {renderCards(false)}
            {!isMobile ? renderCards(true) : null}
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
