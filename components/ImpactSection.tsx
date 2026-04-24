"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import Button, { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";
import SectionTag from "./ui/SectionTag";

export default function ImpactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="landing-section bg-[#f4f1ec] text-[#0d120d]">
      <motion.div
        className="mx-auto max-w-[1920px] px-3 md:px-5"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1560px]">
          <div className="flex flex-col gap-[var(--content-gap)]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.58, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="self-start"
          >
            <SectionTag>Our Impact</SectionTag>
          </motion.div>

          <div className="relative">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[16ch] text-balance font-medium leading-[1.08] tracking-[-0.08em] text-[#090d0a] md:max-w-[15ch]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Joseph.co has redefined the cleaning experience for premium 
              residences and commercial spaces, delivering excellence across 
              every square foot.
            </motion.h2>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-[60%] top-[54%] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[2.9rem] font-extralight leading-none text-[#cfd0cc] md:flex"
            >
              +
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="btn-pair"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink href="/about" variant="primary">
                Learn More
              </ButtonLink>
            </motion.div>

            <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
              <IconButton
                href="/about"
                aria-label="Learn more"
                size="md"
              />
            </motion.div>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
