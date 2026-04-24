"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const brandPool = [
  { name: "Apple", slug: "apple" },
  { name: "Stripe", slug: "stripe" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Uber", slug: "uber" },
 { name: "AT&T", slug: "atandt" },
  { name: "Google", slug: "google" },
{ name: "Meta", slug: "meta" },
  { name: "3M", slug: "3m" },
];

function LogoBox({ index }: { index: number }) {
  const [currentBrandIndex, setCurrentBrandIndex] = useState((index * 2) % brandPool.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBrandIndex((prev) => (prev + 1) % brandPool.length);
    }, 4000 + index * 800); // Staggered timing

    return () => clearInterval(timer);
  }, [index]);

  const brand = brandPool[currentBrandIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-[16px] h-[120px] md:h-[150px] flex items-center justify-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-black/[0.03] overflow-hidden relative"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={brand.slug}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          <img 
            src={`https://cdn.simpleicons.org/${brand.slug}/112025`} 
            alt={brand.name}
            className="w-8 h-8 md:w-9 md:h-9 object-contain"
          />
          <span className="text-[0.9rem] md:text-[1.1rem] font-bold tracking-tighter uppercase font-inter text-aztec text-center md:text-left">
            {brand.name}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function PartnershipsSection() {
  return (
    <section className="bg-[#F3F4F6] py-20 px-5 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1760px] flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-[35%] flex flex-col gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
           className="text-aztec"
          >
            Our Partnerships
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-inter text-[1.1rem] md:text-[1.25rem] text-xanadu max-w-[400px] leading-relaxed"
          >
            Dynamic Teams, Trusted Partnerships, Lasting Impact
          </motion.p>
        </div>

        {/* Right Side: Logo Grid */}
        <div className="w-full lg:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <LogoBox key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
