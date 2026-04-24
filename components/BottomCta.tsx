"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BottomCta() {
  return (
    <section className="landing-section lime-plus-pattern relative overflow-hidden !pb-0 pt-12 sm:!pt-0 text-[#101814]">
      <div className="relative mx-auto flex max-w-[1450px] flex-col items-center px-5 text-center">
        {/* Heading - Minimal Top Margin */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="z-30 mt-6 sm:mt-10"
        >
          <h2 className="mx-auto max-w-[1100px] text-[clamp(46px,9.7vw,116px)] font-bold leading-[0.8] tracking-[-0.07em] text-aztec">
            Ready For A <br /> Spotless Space?
          </h2>
        </motion.div>

        {/* Image - Tighter Overlap for Minimal Section Height */}
        <div className="relative z-10 mt-[-60px] sm:mt-[-160px] md:mt-[-260px] lg:mt-[-340px] w-full max-w-[1235px]">
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/cta-overlap.png"
              alt="Cleaning Supplies"
              width={1400}
              height={800}
              className="h-auto w-full object-contain"
              priority
            />
          </motion.div>
          
          <div className="absolute bottom-0 left-1/2 h-[30%] w-[80%] -translate-x-1/2 translate-y-1/2 rounded-full bg-aztec/10 blur-[120px] opacity-20" />
        </div>
      </div>
    </section>
  );
}
