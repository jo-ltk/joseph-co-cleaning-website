"use client";

import type { RefObject } from "react";
import { MOTION } from "./config";
import { gsap, useGSAP } from "./gsap";

export type MotionEnv = {
  /** prefers-reduced-motion: opacity fades only. */
  reduced: boolean;
  /** Motion allowed (any device, touch included): parallax, pinning, scrubbed reveals. */
  rich: boolean;
  /** Motion allowed + fine pointer: Lenis smooth scroll (touch keeps native momentum scroll). */
  smooth: boolean;
  /** ≥1024px viewport. */
  desktop: boolean;
};

type ContextSafe = <T extends (...args: never[]) => unknown>(fn: T) => T;
type Setup = (env: MotionEnv, contextSafe: ContextSafe) => void | (() => void);

function toEnv(c: gsap.Conditions): MotionEnv {
  return { reduced: c.reduced, rich: !c.reduced, smooth: !c.reduced && c.fine, desktop: c.desktop };
}

/**
 * useGSAP + gsap.matchMedia: `setup` runs with the current motion environment and is
 * fully reverted (tweens, ScrollTriggers, SplitText) on unmount, dependency change, or
 * when reduced-motion / pointer / viewport conditions change.
 */
export function useMotion(
  setup: Setup,
  { scope, dependencies = [] }: { scope?: RefObject<Element | null>; dependencies?: unknown[] } = {},
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope?.current ?? undefined);
      mm.add(MOTION.conditions, (ctx, contextSafe) =>
        setup(toEnv(ctx.conditions ?? {}), contextSafe as unknown as ContextSafe),
      );
      return () => mm.revert();
    },
    { scope, dependencies, revertOnUpdate: true },
  );
}
