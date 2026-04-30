"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X } from "@phosphor-icons/react";

/**
 * MobileExperienceNotice Component
 * 
 * Redesigned to align with Joseph.co Design System (DESIGN_PATTERNS.md)
 * 
 * - Background: bg-[#120f0c]
 * - Primary Accent: text-yellow-green / text-pine-green
 * - Typography: Inter (var(--font-inter))
 * - Animation patterns: ScrollReveal style (y: 10/22)
 */
export default function MobileExperienceNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("mobile-experience-notice-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const checkScreenSize = () => {
      // Screen below 1024px (LG breakpoint in Tailwind)
      if (typeof window !== "undefined") {
        if (window.innerWidth < 1024) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Delay for premium feel
    const timer = setTimeout(checkScreenSize, 1200);

    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem("mobile-experience-notice-dismissed", "true");
    }, 800);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 lg:hidden"
        >
          {/* Backdrop Blur Layer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#120f0c]/60 backdrop-blur-md cursor-pointer" 
            onClick={handleDismiss}
          />

          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 22 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative w-full max-w-[360px] overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#120f0c]/95 p-8 md:p-10 shadow-2xl backdrop-blur-xl"
          >
            {/* Close Icon */}
            <button
              onClick={handleDismiss}
              className="absolute right-6 top-6 text-xanadu hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="flex flex-col">
              {/* Animated Eyebrow Label */}
              <motion.span 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="text-[#017775] font-semibold uppercase tracking-widest text-xs mb-6 block"
              >
                Experience Notice
              </motion.span>

              {/* Title / Heading */}
              <h3 className="mb-4 text-xl md:text-2xl font-medium tracking-tight text-white leading-[1.1]">
                Crafted for Larger Screens
              </h3>
              
              {/* Message Body */}
              <p className="mb-10 text-base leading-relaxed text-xanadu">
                This experience is crafted for larger screens. 
                <br />
                For the full immersive journey, please visit on a desktop or laptop.
              </p>

              {/* Continue Anyway Button - Styled as a premium secondary action */}
              <button
                onClick={handleDismiss}
                className="group flex items-center gap-3 w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-yellow-green transition-transform duration-500 group-hover:scale-110">
                  <Monitor size={20} weight="thin" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-green transition-colors">
                    Continue on Mobile
                  </span>
                  <div className="h-[1px] w-4 bg-yellow-green/40 group-hover:w-full transition-all duration-500" />
                </div>
              </button>
            </div>
            
            {/* Subtle Design Element: Gradient Corner */}
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-yellow-green/5 blur-[80px] pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
