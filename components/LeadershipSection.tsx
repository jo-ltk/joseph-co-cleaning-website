"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const leaders = [
  {
    name: "David Beres",
    role: "CHIEF OPERATING OFFICER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Alex Chen",
    role: "CHIEF FINANCIAL OFFICER",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Ryan Jones",
    role: "HEAD OF OPERATIONS",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function LeadershipSection() {
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
            Leadership
          </motion.span>

          <ScrollReveal
            as="h2"
            containerClassName="text-2xl md:text-4xl leading-[1.1] text-[#1a1a1a] font-medium tracking-tight max-w-[1200px]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Meet the visionary leaders who are shaping Joseph.co's future and driving our mission to deliver innovative cleaning solutions.
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 md:mb-8 bg-gray-100">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <h3 
                  className="text-xl md:text-2xl leading-[1.1] font-medium tracking-tight text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {leader.name}
                </h3>
                <p 
                  className="text-sm font-semibold uppercase tracking-widest text-[#666]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {leader.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
