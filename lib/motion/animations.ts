"use client";

import Lenis from "lenis";
import { MOTION } from "./config";
import { gsap, ScrollTrigger, SplitText } from "./gsap";
import type { MotionEnv } from "./useMotion";

/**
 * Small, composable animation helpers. Each one sets its hidden "from" state at runtime
 * only (so content stays visible if JS never runs), animates transform/opacity only,
 * and must be called inside a gsap context (useMotion) so it is reverted on cleanup.
 */

type Target = Element | Element[] | NodeListOf<Element>;

const once = (trigger: Element, start: string = MOTION.start.fade) => ({ trigger, start, once: true });

/** Masked text needs a little breathing room for ascenders/descenders. Net-zero layout. */
function padMasks(masks: Element[]) {
  gsap.set(masks, { paddingBlock: "0.1em 0.16em", marginBlock: "-0.1em -0.16em" });
}

// ── Smooth scroll ────────────────────────────────────────────────────────────

let activeLenis: Lenis | null = null;

/** Programmatic scroll that goes through Lenis when it's running. */
export function scrollToY(y: number) {
  if (activeLenis) activeLenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Lenis driven by the GSAP ticker so ScrollTrigger and smooth scroll share one clock. */
export function startSmoothScroll() {
  const lenis = new Lenis({
    ...MOTION.lenis,
    smoothWheel: true,
    anchors: true,
    autoRaf: false,
  });
  activeLenis = lenis;
  const onTick = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(onTick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    if (activeLenis === lenis) activeLenis = null;
  };
}

// ── Fades ────────────────────────────────────────────────────────────────────

/** Gentle once-only fade-up. Reduced motion → opacity only. */
export function fadeUp(
  targets: Target,
  env: MotionEnv,
  opts: { trigger: Element; y?: number; stagger?: number; delay?: number; start?: string },
) {
  return gsap.from(targets, {
    opacity: 0,
    ...(env.reduced ? {} : { y: opts.y ?? MOTION.distance.fade }),
    duration: env.reduced ? MOTION.duration.reduced : MOTION.duration.fade,
    ease: env.reduced ? MOTION.ease.reduced : MOTION.ease.out,
    stagger: opts.stagger,
    delay: opts.delay,
    clearProps: "opacity,transform",
    scrollTrigger: once(opts.trigger, opts.start),
  });
}

// ── Text ─────────────────────────────────────────────────────────────────────

/** Split into masked words (or lines) that rise into place. Reverts the split when done. */
export function revealText(
  el: HTMLElement,
  env: MotionEnv,
  opts: { by?: "words" | "lines"; trigger?: Element; scroller?: Element | Window } = {},
) {
  const trigger = opts.trigger ?? el;

  if (env.reduced) {
    return gsap.from(el, {
      opacity: 0,
      duration: MOTION.duration.reduced,
      ease: MOTION.ease.reduced,
      clearProps: "opacity",
      scrollTrigger: { ...once(trigger, MOTION.start.text), scroller: opts.scroller },
    });
  }

  const by = opts.by ?? "words";
  const split = SplitText.create(el, { type: by, mask: by });
  padMasks(split.masks);
  const parts = by === "lines" ? split.lines : split.words;

  return gsap.from(parts, {
    yPercent: 115,
    duration: MOTION.duration.text,
    ease: MOTION.ease.out,
    stagger: by === "lines" ? MOTION.stagger.lines : MOTION.stagger.words,
    scrollTrigger: { ...once(trigger, MOTION.start.text), scroller: opts.scroller },
    onComplete: () => split.revert(),
  });
}

// ── Images & depth ───────────────────────────────────────────────────────────

/** Scale needed so an element filling a clipped frame never shows its edges at ±amount. */
export const coverScale = (amount: number) => 1 + 2 * Math.abs(amount);

/**
 * Scrubbed vertical parallax: travels from -amount to +amount of its own height while its
 * container crosses the viewport. Positive = lags behind (background), negative = leads
 * (foreground). Skipped on touch devices and for reduced motion.
 */
export function parallax(el: Element, env: MotionEnv, amount: number = MOTION.parallax.amount) {
  if (!env.rich) return;
  const travel = amount * 100;
  return gsap.fromTo(
    el,
    { yPercent: -travel },
    {
      yPercent: travel,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: MOTION.parallax.scrub,
        invalidateOnRefresh: true,
      },
    },
  );
}

/** Scrubbed horizontal drift (xPercent 0 → amount) while the element crosses the viewport. */
export function drift(el: Element, env: MotionEnv, amount: number) {
  if (!env.rich) return;
  return gsap.fromTo(
    el,
    { xPercent: 0 },
    {
      xPercent: amount,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: MOTION.parallax.scrub },
    },
  );
}

/**
 * Infinite marquee. `track` must hold its content twice (two identical halves, no gap
 * between them). Loops continuously; scrolling briefly speeds it up (and reverses it when
 * scrolling up). Static for reduced motion.
 */
export function marquee(
  track: HTMLElement,
  env: MotionEnv,
  secondsPerLoop: number = MOTION.marquee.secondsPerLoop,
) {
  if (env.reduced) return;
  const loop = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: secondsPerLoop, ease: "none", repeat: -1 });

  let direction = 1;
  ScrollTrigger.create({
    trigger: track,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      direction = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / 250, MOTION.marquee.maxBoost);
      gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
    },
  });
  return loop;
}

/** Image settles from slightly zoomed-in to rest as it enters. Parent must clip overflow. */
export function imageReveal(el: Element, env: MotionEnv, restScale = 1) {
  const trigger = el.parentElement ?? el;
  if (env.reduced) {
    return gsap.from(el, {
      opacity: 0,
      duration: MOTION.duration.reduced,
      ease: MOTION.ease.reduced,
      scrollTrigger: once(trigger, MOTION.start.image),
    });
  }
  return gsap.fromTo(
    el,
    { scale: restScale + MOTION.imageReveal.scaleFrom },
    {
      scale: restScale,
      duration: MOTION.duration.image,
      ease: MOTION.ease.out,
      scrollTrigger: once(trigger, MOTION.start.image),
    },
  );
}

// ── Declarative scanning ─────────────────────────────────────────────────────

/**
 * Wires up data-attribute driven motion inside `root`:
 *  - [data-reveal] (+ data-reveal-delay)          → fade-up
 *  - [data-reveal-group] > [data-reveal-item]      → staggered fade-up
 *  - [data-parallax="0.1"] (+ data-parallax-cover) → scrubbed depth parallax
 *  - [data-img-reveal]                             → scale-down image reveal
 *  - [data-drift="-20"]                            → scrubbed horizontal drift (xPercent)
 *  - [data-marquee="40"]                           → infinite marquee (seconds per loop)
 */
export function scanDeclarative(root: ParentNode, env: MotionEnv) {
  const all = <T extends Element = HTMLElement>(sel: string) =>
    Array.from(root.querySelectorAll<T & HTMLElement>(sel)).filter(
      (el) => !el.closest(MOTION.excludeSelector),
    );

  all("[data-reveal]").forEach((el) =>
    fadeUp(el, env, { trigger: el, delay: parseFloat(el.dataset.revealDelay ?? "0") }),
  );

  all("[data-reveal-group]").forEach((group) => {
    const items = group.querySelectorAll("[data-reveal-item]");
    if (items.length)
      fadeUp(items, env, {
        trigger: group,
        y: MOTION.distance.item,
        stagger: MOTION.stagger.items,
      });
  });

  all("[data-parallax], [data-img-reveal]").forEach((el) => {
    const raw = el.dataset.parallax;
    const amount = raw === undefined ? null : parseFloat(raw) || MOTION.parallax.amount;
    const cover = env.rich && amount !== null && el.hasAttribute("data-parallax-cover");
    const rest = cover ? coverScale(amount) : 1;

    if (amount !== null) parallax(el, env, amount);
    if (el.hasAttribute("data-img-reveal")) imageReveal(el, env, rest);
    else if (cover) gsap.set(el, { scale: rest });
  });

  all("[data-drift]").forEach((el) => drift(el, env, parseFloat(el.dataset.drift ?? "") || -20));

  all("[data-marquee]").forEach((el) =>
    marquee(el, env, parseFloat(el.dataset.marquee ?? "") || undefined),
  );
}

// ── Page-level utilities ─────────────────────────────────────────────────────

/** Thin scroll progress bar (scaleX 0 → 1 across the document). */
export function scrollProgress(bar: Element) {
  return gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: "max",
        scrub: MOTION.progress.scrub,
      },
    },
  );
}

/** Re-measure ScrollTriggers once late images and web fonts have settled layout. */
export function refreshOnAssets(root: ParentNode = document) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let alive = true;
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(() => alive && ScrollTrigger.refresh(), MOTION.refreshDebounceMs);
  };

  const pending = Array.from(root.querySelectorAll("img")).filter((img) => !img.complete);
  pending.forEach((img) => img.addEventListener("load", refresh, { once: true }));
  document.fonts?.ready.then(refresh);
  if (document.readyState !== "complete") window.addEventListener("load", refresh, { once: true });

  return () => {
    alive = false;
    clearTimeout(timer);
    pending.forEach((img) => img.removeEventListener("load", refresh));
    window.removeEventListener("load", refresh);
  };
}

// ── Hero ─────────────────────────────────────────────────────────────────────

/**
 * Staggered intro: headline lines rise out of masks, then [data-hero-fade] items follow.
 * [data-hero-intro] is hidden by CSS until this runs (with a CSS failsafe if it never does).
 */
export function heroIntro(root: HTMLElement, env: MotionEnv) {
  const intro = root.querySelector<HTMLElement>("[data-hero-intro]");
  const title = root.querySelector<HTMLElement>("[data-hero-title]");
  const fades = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-fade]"));
  if (!intro || !title) return;

  gsap.set(intro, { opacity: 1 });
  const tl = gsap.timeline({ delay: MOTION.hero.introDelay });
  const rendered = root.offsetParent !== null;

  if (env.reduced || !rendered) {
    tl.from([title, ...fades], {
      opacity: 0,
      duration: MOTION.duration.reduced,
      ease: MOTION.ease.reduced,
      stagger: 0.1,
      clearProps: "opacity",
    });
    return tl;
  }

  const split = SplitText.create(title, { type: "lines", mask: "lines" });
  padMasks(split.masks);

  tl.from(split.lines, {
    yPercent: 115,
    duration: MOTION.hero.lineDuration,
    ease: MOTION.ease.out,
    stagger: MOTION.stagger.lines,
  })
    .from(
      fades,
      {
        opacity: 0,
        y: 24,
        duration: MOTION.duration.fade,
        ease: MOTION.ease.out,
        stagger: MOTION.stagger.lines,
        clearProps: "opacity,transform",
      },
      "-=0.95",
    )
    .add(() => split.revert());

  return tl;
}

/** Multi-layer hero parallax: [data-hero-layer="bg" | "grid" | "content"] at different speeds. */
export function heroParallax(root: HTMLElement, env: MotionEnv) {
  if (!env.rich) return;
  const { layers, contentFadeTo } = MOTION.hero;
  const scrollTrigger = () => ({ trigger: root, start: "top top", end: "bottom top", scrub: true });

  (Object.keys(layers) as (keyof typeof layers)[]).forEach((name) => {
    const el = root.querySelector(`[data-hero-layer="${name}"]`);
    if (!el) return;
    gsap.set(el, { willChange: "transform" });
    gsap.to(el, {
      yPercent: layers[name] * 100,
      ...(name === "content" ? { opacity: contentFadeTo } : {}),
      ease: "none",
      scrollTrigger: scrollTrigger(),
    });
  });
}

// ── Full-screen pinned showcase ──────────────────────────────────────────────

/**
 * `frame` zooms from a card to full screen as `stage` scrolls in; then the stage pins and
 * scrolling steps through `layers` (each fades in while zooming down to rest).
 * Calls `onIndex` when the active layer changes. Returns `goTo(index)` for click navigation.
 * Runs on desktop and touch alike; segments are shorter on small screens.
 */
export function pinnedShowcase(
  stage: HTMLElement,
  env: MotionEnv,
  { frame, layers, onIndex }: { frame: HTMLElement; layers: HTMLElement[]; onIndex: (i: number) => void },
) {
  if (!env.rich || layers.length < 2) return;
  const { frameFrom, hold, transition, zoomFrom, outgoingScale, scrub } = MOTION.showcase;
  const segmentVh = env.desktop ? MOTION.showcase.segmentVh : MOTION.showcase.segmentVhMobile;
  const n = layers.length;
  const seg = hold + transition;
  const total = (n - 1) * seg + hold;

  gsap.fromTo(
    frame,
    { scale: frameFrom },
    { scale: 1, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "top top", scrub: true } },
  );

  let current = 0;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: () => `+=${window.innerHeight * segmentVh * total}`,
      pin: true,
      scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const t = self.progress * total;
        const i = Math.min(n - 1, Math.max(0, Math.floor((t - hold - transition / 2) / seg) + 1));
        if (i !== current) onIndex((current = i));
      },
    },
  });

  for (let k = 1; k < n; k++) {
    const at = (k - 1) * seg + hold;
    tl.fromTo(
      layers[k],
      { opacity: 0, scale: zoomFrom },
      { opacity: 1, scale: 1, duration: transition, ease: "power2.out" },
      at,
    ).to(layers[k - 1], { scale: outgoingScale, duration: transition }, at);
  }
  tl.to({}, { duration: hold });

  const st = tl.scrollTrigger!;
  return (index: number) => {
    const t = index <= 0 ? 0 : (index - 1) * seg + hold + transition;
    scrollToY(st.start + (st.end - st.start) * (t / total));
  };
}

// ── Scrubbed step progression ────────────────────────────────────────────────

/**
 * Scrubs `steps` from dim to lit, one after another, revealing the `connectors` between
 * them, while `grid` scrolls up through the viewport (no pin, so the page keeps flowing).
 * Falls back to a staggered fade-up for reduced motion.
 */
export function scrubProgression(
  env: MotionEnv,
  { steps, connectors, grid }: { steps: HTMLElement[]; connectors: HTMLElement[]; grid: HTMLElement },
) {
  if (!env.rich) {
    fadeUp(steps, env, { trigger: grid, stagger: 0.15, start: MOTION.start.image });
    if (connectors.length)
      fadeUp(connectors, env, { trigger: grid, y: 0, stagger: 0.15, delay: 0.5, start: MOTION.start.image });
    return;
  }

  const { start, end, scrub, dimOpacity } = MOTION.signature;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: grid, start, end, scrub, invalidateOnRefresh: true },
  });

  steps.forEach((step, i) => {
    tl.fromTo(
      step,
      { opacity: dimOpacity, y: 36 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      i,
    );
    const connector = connectors[i];
    if (connector)
      tl.fromTo(connector, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6, ease: "power1.out" }, i + 0.55);
  });
  tl.to({}, { duration: 0.3 }); // all steps fully lit slightly before the range ends

  return tl;
}
