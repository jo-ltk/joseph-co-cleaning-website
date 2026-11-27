"use client";

import { ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import { MOTION } from "@/lib/motion/config";
import { useMotion } from "@/lib/motion/useMotion";
import { ScrollTrigger } from "@/lib/motion/gsap";
import {
  refreshOnAssets,
  scanDeclarative,
  scrollProgress,
  startSmoothScroll,
} from "@/lib/motion/animations";

/**
 * Site-wide motion layer:
 *  - Lenis smooth scroll on fine-pointer devices with motion allowed (native scroll otherwise)
 *  - data-attribute reveals / parallax, re-scanned on every route change
 *  - thin scroll progress indicator
 *  - ScrollTrigger refresh once images and fonts settle
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const showProgress = !MOTION.progress.hiddenOn.some((route) => pathname?.startsWith(route));

  // Smooth scroll lives for the whole session; torn down only if conditions change.
  useMotion((env) => (env.smooth ? startSmoothScroll() : undefined));

  // Per-page motion. Child components have already created their own triggers by now.
  useMotion(
    (env) => {
      scanDeclarative(document, env);
      if (barRef.current) scrollProgress(barRef.current);
      const stopAssets = refreshOnAssets(document);
      ScrollTrigger.refresh();
      return stopAssets;
    },
    { dependencies: [pathname, showProgress] },
  );

  return (
    <>
      {children}
      {showProgress && (
        <div
          ref={barRef}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-yellow-green"
          style={{ transform: "scaleX(0)" }}
        />
      )}
    </>
  );
}
