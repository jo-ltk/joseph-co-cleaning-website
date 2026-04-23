"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function ImpactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#f4f1ec] text-[#0d120d]">
      <motion.div
        className="mx-auto max-w-[1920px] px-3 pb-16 pt-10 md:px-5 md:pb-20 md:pt-11 lg:pb-24"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1560px]">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.58, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex bg-[#e4ff9f] px-3 py-2 text-[0.9rem] font-medium uppercase leading-none tracking-[-0.04em] text-[#111713] md:text-[0.98rem]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Our Impact
          </motion.p>

          <div className="relative mt-10 md:mt-12">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[16ch] text-balance text-[2.45rem] font-medium leading-[1.08] tracking-[-0.08em] text-[#090d0a] sm:text-[3.2rem] md:max-w-[15ch] md:text-[4.55rem] lg:text-[4.95rem] xl:text-[5.15rem]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Hydra&apos;s clean energy solutions have made a lasting impact on
              communities and industries across the Americas, Asia, Europe, and
              beyond.
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
            className="mt-10 flex items-center gap-[2px] md:mt-12"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex h-[50px] items-center rounded-full bg-[#16231f] px-7 text-[1rem] font-medium tracking-[-0.05em] text-[#dff18e] transition duration-300 hover:bg-[#1c2d28]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/about"
                aria-label="Learn more"
                className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#16231f] text-[#dff18e] transition duration-300 hover:bg-[#1c2d28]"
              >
                <ArrowUpRight size={20} weight="bold" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
