"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function OurStorySection() {
  return (
    <section className="bg-[#f5f5f3] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-12">
          
          <div className="flex flex-col items-start gap-6 lg:gap-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
            >
              Our Story
            </motion.span>

            <ScrollReveal
              as="h2"
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-[#1a1a1a] font-medium tracking-tight"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Joseph.co was founded on a mission to redefine the standards of professional cleaning. We're a team of dedicated specialists working together to create immaculate environments for our discerning clients.
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full overflow-hidden rounded-sm shadow-2xl"
          >
            <Image
              src="/images/about-story.png"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
