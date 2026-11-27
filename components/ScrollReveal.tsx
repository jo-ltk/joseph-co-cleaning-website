"use client";

import { useRef, ReactNode, RefObject, ElementType, CSSProperties } from "react";

import { useMotion } from "@/lib/motion/useMotion";
import { revealText } from "@/lib/motion/animations";
import "./ScrollReveal.css";

interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** @deprecated Reveals are now mask-based (transform only); kept for call-site compatibility. */
  enableBlur?: boolean;
  /** @deprecated See `enableBlur`. */
  blurStrength?: number;
  containerClassName?: string;
  triggerRef?: RefObject<HTMLElement | null>;
  style?: CSSProperties;
}

/**
 * Heading that reveals word-by-word from masks as it scrolls into view.
 * Renders plain text on the server, so it stays readable if JS never runs.
 */
const ScrollReveal = ({
  children,
  as: Component = "h2",
  scrollContainerRef,
  containerClassName = "",
  triggerRef,
  style,
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useMotion(
    (env) => {
      const el = containerRef.current;
      if (!el) return;
      revealText(el, env, {
        trigger: triggerRef?.current ?? el,
        scroller: scrollContainerRef?.current ?? undefined,
      });
    },
    { scope: containerRef },
  );

  return (
    <Component ref={containerRef} className={`scroll-reveal ${containerClassName}`} style={style}>
      {children}
    </Component>
  );
};

export default ScrollReveal;
