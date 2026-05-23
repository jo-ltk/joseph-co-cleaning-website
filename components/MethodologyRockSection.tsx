"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const smoothEase = [0.22, 1, 0.36, 1] as const;
const rockPivot = "50% 92%";

export default function MethodologyRockSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white px-6 py-16 md:px-12 lg:px-24">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="mx-auto flex max-w-6xl items-center justify-between gap-10"
      >
        {/* Rock */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, rotate: -10, y: 36 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: smoothEase }}
          className="relative flex justify-center"
        >
          <motion.div
            className="pointer-events-none absolute bottom-1 left-1/2 -z-10 h-3 w-[68%] -translate-x-1/2 rounded-[50%] bg-stone-900/10 blur-md"
            animate={
              shouldReduceMotion
                ? undefined
                : { scaleX: [1.08, 0.9, 1.08], opacity: [0.32, 0.2, 0.32] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 5.4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }
            }
            aria-hidden
          />

          <motion.div
            style={{ transformOrigin: rockPivot }}
            animate={
              shouldReduceMotion
                ? undefined
                : { rotate: [-7, 7, -7], y: [0, -5, 0] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 5.4,
                    repeat: Infinity,
                    ease: [0.45, 0.05, 0.55, 0.95],
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: [-10, 10, -6, 6, -3, 3, 0],
                    transition: { duration: 1.4, ease: "easeOut" },
                  }
            }
          >
            <Image
              src="/images/methodology-stone.png"
              alt="Stone cleaning art"
              width={340}
              height={260}
              className="h-auto w-full max-w-[340px] object-contain drop-shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.12, ease: smoothEase }}
          className="max-w-md"
        >
          
          <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              Even cavemen knew dirt is embarrassing.
            </ScrollReveal>

          
        </motion.div>
      </motion.div>
    </section>
  );
}
