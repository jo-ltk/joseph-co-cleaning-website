"use client";

import { motion, useReducedMotion } from "framer-motion";

import ScrollReveal from "@/components/ScrollReveal";

export default function LatestUpdatesIntro() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="max-w-2xl">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 block text-sm font-semibold uppercase tracking-widest text-yellow-green"
        >
          Behind The Build
        </motion.span>

        <ScrollReveal
          as="h2"
          enableBlur={!shouldReduceMotion}
          blurStrength={8}
          containerClassName="text-2xl leading-[1.1] text-white md:text-4xl"
        >
          Recent Highlights from the Field
        </ScrollReveal>
      </div>

      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="max-w-md text-base leading-relaxed text-white/70 md:text-lg"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        Video moments and on-site project captures from active cleans — presented as a
        curated studio showcase.
      </motion.p>
    </div>
  );
}
