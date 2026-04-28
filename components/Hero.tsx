"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Calculator } from "@phosphor-icons/react";
import Button, { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";

import ScrollReveal from "./ScrollReveal";

const heroImage = "/images/hero-bg-new.png";
const mobileGridLines = ["50%"];
const desktopGridLines = ["0%", "25%", "50%", "75%", "100%"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -88]);

  return (
    <section className="relative flex min-h-[100dvh] md:h-[100dvh] items-stretch overflow-hidden bg-yellow-green md:bg-xanadu text-aztec md:text-white">
      <motion.div className="absolute inset-0 hidden md:block" style={shouldReduceMotion ? undefined : { y: backgroundY, scale: backgroundScale }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${heroImage}")` }} />
      </motion.div>
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(180deg,rgba(112,117,110,0.64)_0%,rgba(107,110,105,0.48)_42%,rgba(32,36,27,0.2)_100%)]" />
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.24)_100%)]" />

      <div className="absolute inset-0 pointer-events-none md:hidden">
        {mobileGridLines.map((line) => (<div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-aztec/5" style={{ left: line }} />))}
      </div>
      <div className="absolute inset-0 hidden pointer-events-none md:block">
        {desktopGridLines.map((line) => (<div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18" style={{ left: line }} />))}
      </div>

      <motion.div className="relative z-10 mx-auto flex h-full w-full max-w-[1950px] flex-col items-center md:justify-center px-6 pb-10 pt-28 md:pt-40 md:px-10 lg:px-20 md:text-center text-left" style={shouldReduceMotion ? undefined : { y: contentY }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.14 }} className="mx-auto flex max-w-[1250px] flex-col items-start md:items-center gap-3 md:gap-4 w-full">
          <ScrollReveal
            as="h1"
            enableBlur={true}
            blurStrength={10}
            containerClassName="max-w-7xl text-balance text-5xl md:text-6xl lg:text-8xl leading-[1.05] tracking-tight font-bold md:font-medium text-aztec md:text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Impeccable Standards for Premium Spaces
          </ScrollReveal>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            className="max-w-[780px] text-balance text-lg md:text-xl font-medium leading-relaxed text-aztec/80 md:text-white/90" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Delivering outstanding cleaning services tailored for high-end residential and commercial environments.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.46 }} className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink href="/contact?source=Homepage Hero" variant="primary" className="shadow-[0_20px_40px_rgba(16,24,16,0.18)] px-10">Book Quote / Contact</ButtonLink>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-estimate"))}
                className="flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-aztec shadow-[0_20px_40_rgba(16,24,16,0.18)] transition-all hover:bg-gray-50 border border-white/10"
              >
                <Calculator size={18} weight="bold" />
                Instant Estimate
              </button>
            </motion.div>
          </motion.div>

          {/* Mobile Premium Image Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="md:hidden relative mt-6 -mx-6 w-[calc(100%+3rem)]"
          >
            <div className="relative overflow-hidden">
              <img 
                src={heroImage} 
                alt="Premium Interior" 
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-0 right-0 px-6 flex flex-col gap-3">
                <motion.div whileTap={{ scale: 0.96 }}>
                  <ButtonLink 
                    href="/contact?source=Homepage Hero Mobile" 
                    className="w-full bg-white text-aztec font-bold py-5 flex items-center justify-center gap-2 rounded-2xl shadow-lg"
                  >
                    Book Quote / Contact
                  </ButtonLink>
                </motion.div>
                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => window.dispatchEvent(new CustomEvent("open-estimate"))}
                  className="w-full bg-aztec/20 backdrop-blur-md border border-white/20 text-white font-bold py-5 flex items-center justify-center gap-2 rounded-2xl"
                >
                  <Calculator size={20} weight="bold" />
                  Instant Estimate
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
