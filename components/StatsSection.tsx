"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "15+", label: "SERVICE SPECIALISTS" },
  { value: "450+", label: "ESTATES & HOMES MANAGED" },
  { value: "4", label: "COUNTIES COVERED" },
  { value: "100%", label: "DBS CLEARANCE" },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20 text-center mb-10 md:mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
        >
          Company Stats
        </motion.span>

        <ScrollReveal
          as="h2"
          containerClassName="text-2xl md:text-4xl leading-[1.1] text-[#1a1a1a] font-medium tracking-tight"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          The Foundation of Our Success
        </ScrollReveal>
      </div>

      <div className="border-y border-[#e5e5e1]">
        <div className="mx-auto max-w-[1920px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center justify-center p-6 md:p-10 text-center ${
                  index !== stats.length - 1 ? "border-b md:border-b-0 md:border-r border-[#e5e5e1]" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex flex-col gap-3 md:gap-4"
                >
                  <span 
                    className="block text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span 
                    className="block text-sm font-semibold uppercase tracking-widest text-[#666]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden mt-10 md:mt-16">
        <Image
          src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80"
          alt="Our Team"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </section>
  );
}
