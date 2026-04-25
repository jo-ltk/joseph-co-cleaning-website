"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CalendarPlus, Tag, UserCheck } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

const trustPoints = [
  { label: "Fully Insured Team", icon: <ShieldCheck size={32} weight="light" /> },
  { label: "Flexible Scheduling", icon: <CalendarPlus size={32} weight="light" /> },
  { label: "Transparent Pricing", icon: <Tag size={32} weight="light" /> },
  { label: "Reliable Professionals", icon: <UserCheck size={32} weight="light" /> },
];

export default function ServicesIntro() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
            >
              Excellence Across the Region
            </motion.span>
            <ScrollReveal
              as="h2"
              containerClassName="text-3xl md:text-5xl leading-[1.1] text-[#1a1a1a] font-medium tracking-tight mb-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Premium Cleaning Standards for the South West
            </ScrollReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xanadu text-lg md:text-xl max-w-lg leading-relaxed"
          >
            Joseph & Co delivers unrivaled service quality across Somerset, Devon, Gloucestershire, and Bristol. We bring meticulous attention to detail to every property we touch.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#f5f5f3] flex items-center justify-center text-pine-green">
                {point.icon}
              </div>
              <span 
                className="text-sm md:text-base font-semibold uppercase tracking-widest text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {point.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
