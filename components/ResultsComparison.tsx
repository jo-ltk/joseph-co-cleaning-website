"use client";

import { motion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

import ScrollReveal from "./ScrollReveal";

export default function ResultsComparison() {
  return (
    <section className="bg-white py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              The Transformation
            </motion.span>
            <ScrollReveal
              as="h2"
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              Immaculate Standards, Visible Results
            </ScrollReveal>
          </div>
          <motion.p
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
  className="text-xanadu text-base md:text-lg max-w-sm leading-relaxed"
>
  Experience the dramatic difference our specialized cleaning protocols make in restoring and maintaining premium environments.
</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="shadow-2xl rounded-2xl overflow-hidden"
          >
            <BeforeAfterSlider beforeImage="/images/before.png" afterImage="/images/after.png" beforeLabel="Prior to Treatment" afterLabel="The Joseph.co Standard" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="shadow-2xl rounded-2xl overflow-hidden"
          >
            <BeforeAfterSlider beforeImage="/images/before2.png" afterImage="/images/after2.png" beforeLabel="Prior to Treatment" afterLabel="The Joseph.co Standard" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}