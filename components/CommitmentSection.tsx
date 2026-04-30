"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const pillars = [
  {
    title: "Uncompromising Detail",
    description: "Every corner, every surface, and every delicate finish is handled with surgical precision. We don't just clean; we restore the original luster of your space.",
    image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Vetted Excellence",
    description: "Our specialists undergo rigorous vetting and background checks. Trust is the foundation of our service, ensuring your peace of mind at all times.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Bespoke Management",
    description: "We understand that every property has unique requirements. Our management team tailors a specific protocol for your environment, ensuring consistent perfection.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function CommitmentSection() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-t border-[#e5e5e1]">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20">
        <div className="mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
          >
            The Joseph.co Standard
          </motion.span>

          <ScrollReveal
            as="h2"
            containerClassName="text-2xl md:text-4xl leading-[1.1] text-[#1a1a1a] font-medium tracking-tight max-w-[1200px]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            A commitment to excellence that goes beyond the surface. We provide a sanctuary of cleanliness through meticulous care and professional integrity.
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 md:mb-8 bg-gray-100">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3 md:gap-4 flex-grow">
                <h3 
                  className="text-xl md:text-2xl leading-[1.1] font-medium tracking-tight text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p 
                  className="text-sm md:text-base leading-relaxed text-[#666] max-w-[340px]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
