"use client";

import { useEffect, useRef, useMemo, ReactNode, RefObject, ElementType, CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  as?: ElementType;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  blurStrength?: number;
  containerClassName?: string;
  triggerRef?: RefObject<HTMLElement | null>;
  style?: CSSProperties;
}

const ScrollReveal = ({
  children,
  as: Component = 'h2',
  scrollContainerRef,
  enableBlur = true,
  blurStrength = 4,
  containerClassName = '',
  triggerRef,
  style
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children.trim() : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, clearProps: 'filter' });
      gsap.set(el.querySelectorAll('.word'), {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'none',
      });
      return;
    }

    const scroller = scrollContainerRef?.current || window;
    const trigger = triggerRef?.current || el;

    const isMobile = window.innerWidth < 768;
    const words = el.querySelectorAll(".word");

    gsap.set(el, { rotate: 0 });
    gsap.set(words, {
      opacity: 0,
      y: isMobile ? 16 : 22,
      scale: 0.98,
      filter: isMobile ? "none" : (enableBlur ? `blur(${blurStrength}px)` : "none"),
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        scroller,
        start: "top 90%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.65,
        ease: "power2.out",
      },
      0
    );

    tl.to(words, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      stagger: {
        each: 0.035,
        from: "start",
      },
      duration: 0.85,
      ease: "power2.out",
    }, 0.08);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scrollContainerRef, triggerRef, enableBlur, blurStrength]);

  return (
    <Component 
      ref={containerRef} 
      className={`scroll-reveal ${containerClassName}`}
      style={style}
    >
      {splitText}
    </Component>
  );
};

export default ScrollReveal;
