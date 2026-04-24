"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

export default function BottomCta() {
  return (
    <section className="lime-plus-pattern relative overflow-hidden py-24 !pb-0 text-aztec">
      <div className="relative mx-auto flex max-w-[1450px] flex-col items-center px-5 md:px-10 lg:px-20 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="z-30 mt-8">
          <ScrollReveal
            as="h2"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="mx-auto max-w-[1100px] text-balance text-5xl md:text-6xl lg:text-8xl leading-[1.05] font-bold tracking-tight text-aztec"
          >
            Ready For A Spotless Space?
          </ScrollReveal>
        </motion.div>
        <div className="relative z-10 mt-[-60px] sm:mt-[-160px] md:mt-[-260px] lg:mt-[-340px] w-full max-w-[1235px]">
          <motion.div initial={{ opacity: 0, y: 80, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <Image src="/images/cta-overlap.png" alt="Cleaning Supplies" width={1400} height={800} className="h-auto w-full object-contain" priority />
          </motion.div>
          <div className="absolute bottom-0 left-1/2 h-[30%] w-[80%] -translate-x-1/2 translate-y-1/2 rounded-full bg-aztec/10 blur-[120px] opacity-20" />
        </div>
      </div>
    </section>
  );
}
