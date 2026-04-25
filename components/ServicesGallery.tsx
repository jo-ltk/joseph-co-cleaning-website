"use client";

import { motion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ScrollReveal from "./ScrollReveal";

export default function ServicesGallery() {
  return (
    <section className="bg-white py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
          >
            The Difference
          </motion.span>
          <ScrollReveal
            as="h2"
            enableBlur={true}
            blurStrength={8}
            containerClassName="text-3xl md:text-5xl leading-[1.1] text-aztec font-medium tracking-tight mb-6"
          >
            See The Difference We Make
          </ScrollReveal>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xanadu text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A visual testament to our commitment to excellence. Our specialized techniques restore surfaces to their original brilliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="shadow-2xl rounded-[32px] overflow-hidden"
          >
            <BeforeAfterSlider 
              beforeImage="/images/before.png" 
              afterImage="/images/after.png" 
              beforeLabel="Before" 
              afterLabel="After" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="shadow-2xl rounded-[32px] overflow-hidden"
          >
            <BeforeAfterSlider 
              beforeImage="/images/before2.png" 
              afterImage="/images/after2.png" 
              beforeLabel="Before" 
              afterLabel="After" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
