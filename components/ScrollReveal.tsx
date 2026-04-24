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
  baseOpacity?: number;
  baseRotation?: number;
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
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  triggerRef,
  style
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
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

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const trigger = triggerRef && triggerRef.current ? triggerRef.current : el;

    // Set initial state
    gsap.set(el, { transformOrigin: '0% 50%', rotate: baseRotation });
    const wordElements = el.querySelectorAll('.word');
    gsap.set(wordElements, { 
      opacity: baseOpacity, 
      filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
    });

    // Reveal Animation - Triggers once when scrolled into view
    // Using toggleActions instead of scrub to prevent "un-revealing" when scrolling up
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        scroller,
        start: 'top 85%',
        toggleActions: 'play none none none', // Play once on enter, do nothing on other events
      }
    });

    tl.to(el, {
      rotate: 0,
      duration: 1,
      ease: 'power3.out'
    }, 0);

    tl.to(wordElements, {
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.05,
      duration: 1.2,
      ease: 'power3.out'
    }, 0.1);

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === trigger) t.kill();
      });
    };
  }, [scrollContainerRef, triggerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

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
