"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button, { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";

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
    <section className="relative flex h-[100dvh] min-h-[600px] items-stretch overflow-hidden bg-[#7b8078] text-white md:min-h-[780px]">
      <motion.div className="absolute inset-0" style={shouldReduceMotion ? undefined : { y: backgroundY, scale: backgroundScale }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${heroImage}")` }} />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(112,117,110,0.64)_0%,rgba(107,110,105,0.48)_42%,rgba(32,36,27,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.24)_100%)]" />

      <div className="absolute inset-0 pointer-events-none md:hidden">
        {mobileGridLines.map((line) => (<div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/20" style={{ left: line }} />))}
      </div>
      <div className="absolute inset-0 hidden pointer-events-none md:block">
        {desktopGridLines.map((line) => (<div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18" style={{ left: line }} />))}
      </div>

      <motion.div className="relative z-10 mx-auto flex h-full w-full max-w-[1950px] flex-col items-center justify-center px-5 pb-12 pt-32 text-center md:px-10 md:pb-24 md:pt-40 lg:px-20" style={shouldReduceMotion ? undefined : { y: contentY }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.14 }} className="mx-auto flex max-w-[1250px] flex-col items-center gap-3 md:gap-4">
          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mx-auto max-w-7xl text-balance text-5xl md:text-6xl lg:text-8xl leading-[1.05] tracking-tight font-medium text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Impeccable Standards for Premium Spaces
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            className="mx-auto max-w-[780px] text-balance text-lg md:text-xl font-medium leading-relaxed text-white/90" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Delivering outstanding cleaning services tailored for high-end residential and commercial environments.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.46 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink href="/contact" variant="primary" className="shadow-[0_20px_40px_rgba(16,24,16,0.18)] px-10">Get Quote / Book Now</ButtonLink>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink href="tel:+1234567890" variant="secondary" className="shadow-[0_20px_40px_rgba(16,24,16,0.18)] px-10 bg-white !text-aztec hover:bg-gray-100 border border-white/10">Call / WhatsApp</ButtonLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
