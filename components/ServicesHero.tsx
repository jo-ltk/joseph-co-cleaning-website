"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const heroImage = "/images/services-hero.png";

export default function ServicesHero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden bg-[#7b8078] text-white md:min-h-[600px]">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0" 
        style={shouldReduceMotion ? undefined : { y: backgroundY, scale: backgroundScale }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url("${heroImage}")` }} 
        />
        <div className="absolute inset-0 bg-black/25 md:bg-transparent md:bg-gradient-to-t md:from-black/50 md:via-transparent md:to-black/20" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none md:hidden">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
      </div>
      <div className="absolute inset-0 hidden pointer-events-none md:block">
        {["0%", "25%", "50%", "75%", "100%"].map((line) => (
          <div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18" style={{ left: line }} />
        ))}
      </div>

      <motion.div 
        className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pb-4 md:px-10 md:pb-5 lg:px-20" 
        style={shouldReduceMotion ? undefined : { y: contentY }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-[850px]"
          >
            <ScrollReveal
              as="h1"
              enableBlur={true}
              blurStrength={10}
              containerClassName="text-balance text-4xl md:text-6xl lg:text-[80px] leading-[1.0] tracking-tight font-medium text-white max-w-[800px]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Our Professional Cleaning Services
            </ScrollReveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="hidden md:block pb-2"
          >
            <div 
              className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white cursor-default"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Explore Services
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
