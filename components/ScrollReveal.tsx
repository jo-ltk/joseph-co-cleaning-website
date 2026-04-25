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

    const scroller = scrollContainerRef?.current || window;
    const trigger = triggerRef?.current || el;

    const isMobile = window.innerWidth < 768;
    const words = el.querySelectorAll(".word");

    // Initial state
    gsap.set(el, { rotate: 0 });
    gsap.set(words, {
      opacity: 0,
      y: isMobile ? 20 : 30,
      scale: 0.98,
      filter: isMobile ? "none" : (enableBlur ? `blur(${blurStrength}px)` : "none"),
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        scroller,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    // Luxury fade-in for the container
    tl.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      },
      0
    );

    tl.to(words, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      stagger: {
        each: 0.04,
        from: "start",
      },
      duration: 0.8,
      ease: "expo.out",
    }, 0.1);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === trigger) t.kill();
      });
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
