/**
 * Single source of truth for site-wide scroll motion.
 * Tune speed / intensity here — every helper reads from this object.
 */
export const MOTION = {
  /** Media conditions fed to gsap.matchMedia — animations rebuild when any of these flip. */
  conditions: {
    reduced: "(prefers-reduced-motion: reduce)",
    fine: "(hover: hover) and (pointer: fine)",
    desktop: "(min-width: 1024px)",
    /** Always true. gsap.matchMedia only runs a setup when at least one condition matches;
     *  a touch phone matches none of the others, so without this nothing would animate there. */
    always: "(min-width: 0px)",
  },

  /** Lenis smooth scroll (fine pointer only; touch keeps native scrolling). Lower lerp = silkier, slower catch-up. */
  lenis: {
    lerp: 0.085,
    wheelMultiplier: 1,
  },

  ease: {
    out: "expo.out",
    reduced: "power1.out",
  },

  duration: {
    text: 1.2, // heading word rise
    image: 1.6, // image scale-down reveal
    fade: 1.1, // section fade-up
    reduced: 0.6, // opacity-only fades when prefers-reduced-motion
  },

  stagger: {
    words: 0.045,
    lines: 0.12,
    items: 0.08,
  },

  /** Vertical travel (px) for fade-ups. */
  distance: {
    fade: 28,
    item: 20,
  },

  /** ScrollTrigger start positions. */
  start: {
    text: "top 88%",
    image: "top 85%",
    fade: "top 92%",
  },

  parallax: {
    /** Default ± travel as a fraction of the element's height (0.1 = ±10%). */
    amount: 0.1,
    /** true = locked to scroll; a number (s) adds catch-up smoothing on top of Lenis. */
    scrub: true as boolean | number,
  },

  imageReveal: {
    /** Images start this much larger than rest scale (1.15 → 1). */
    scaleFrom: 0.15,
  },

  hero: {
    introDelay: 0.15,
    lineDuration: 1.3,
    /** Scrubbed layer travel (yPercent fractions) as the hero scrolls out. */
    layers: {
      bg: 0.14, // background drifts down → reads as far away
      grid: 0.06, // grid lines sit between background and copy
      content: -0.1, // copy lifts slightly faster → foreground
    },
    /** Copy opacity at the moment the hero has fully scrolled out. */
    contentFadeTo: 0.35,
  },

  /** Scrubbed step progression (Process section) — steps light up as the row scrolls up. */
  signature: {
    /** First step starts lighting when the steps row's top hits 85% of the viewport… */
    start: "top 85%",
    /** …and the last is fully lit by the time its bottom reaches 55%. Wider gap = slower. */
    end: "bottom 55%",
    scrub: 0.6 as boolean | number,
    /** Opacity of steps not yet reached. */
    dimOpacity: 0.15,
  },

  /** Full-screen pinned Industries showcase. */
  showcase: {
    /** Card scale as the stage scrolls in, zooming to full screen at the top. */
    frameFrom: 0.86,
    /** Scroll distance per industry, in viewport heights. */
    segmentVh: 0.9,
    /** Shorter scroll per industry on touch / small screens (thumb scrolling covers more ground). */
    segmentVhMobile: 0.6,
    /** Within each segment: time the image rests, then time spent changing (sum = 1). */
    hold: 0.4,
    transition: 0.6,
    /** Incoming image zooms from this scale down to 1; outgoing pushes to `outgoingScale`. */
    zoomFrom: 1.18,
    outgoingScale: 1.06,
    scrub: 0.8 as boolean | number,
  },

  marquee: {
    /** Seconds for one full loop at rest. Lower = faster. */
    secondsPerLoop: 40,
    /** Extra speed multiplier added while scrolling fast. */
    maxBoost: 4,
  },

  progress: {
    scrub: 0.3 as boolean | number,
    /** Routes that keep their own branding / chrome. */
    hiddenOn: ["/admin", "/care", "/vine-cottage"],
  },

  /** Areas that run their own animation systems and must be skipped by global scanning. */
  excludeSelector: "[data-vine-cottage]",

  refreshDebounceMs: 150,
} as const;
