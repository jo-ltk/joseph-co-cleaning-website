"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const heroImage =
  "https://images.pexels.com/photos/15379018/pexels-photo-15379018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=2800";

const mobileGridLines = ["50%"];
const desktopGridLines = ["0%", "25%", "50%", "75%", "100%"];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -88]);

  return (
    <section className="relative flex h-screen min-h-[780px] items-stretch overflow-hidden bg-[#7b8078] text-white">
      <motion.div
        className="absolute inset-0"
        style={
          shouldReduceMotion
            ? undefined
            : { y: backgroundY, scale: backgroundScale }
        }
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(112,117,110,0.64)_0%,rgba(107,110,105,0.48)_42%,rgba(32,36,27,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.24)_100%)]" />

      <div className="absolute inset-0 pointer-events-none md:hidden">
        {mobileGridLines.map((line) => (
          <div
            key={line}
            className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/20"
            style={{ left: line }}
          />
        ))}
      </div>

      <div className="absolute inset-0 hidden pointer-events-none md:block">
        {desktopGridLines.map((line) => (
          <div
            key={line}
            className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18"
            style={{ left: line }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 mx-auto flex h-full w-full max-w-[1760px] flex-col items-center justify-center px-5 pb-20 pt-[10.75rem] text-center sm:px-8 md:px-10 md:pb-28 md:pt-40"
        style={shouldReduceMotion ? undefined : { y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          className="mx-auto max-w-[1250px]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mx-auto max-w-[13ch] text-balance text-[clamp(3.6rem,8.2vw,8.45rem)] font-medium leading-[0.93] tracking-[-0.095em] text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Sustainable Solutions for a Better Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            className="mx-auto mt-7 max-w-[20ch] text-balance text-[1rem] font-medium leading-[1.26] tracking-[-0.05em] text-white/92 sm:max-w-[24ch] sm:text-[1.18rem] md:mt-8 md:max-w-[780px] md:text-[1rem] lg:text-[1.08rem]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Empowering businesses and communities to thrive in a low-carbon
            world through tailored clean energy solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
            className="mt-10 flex items-center justify-center gap-3 md:mt-8"
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex h-[3.35rem] items-center rounded-full bg-[#e7ff92] px-6 text-[1rem] font-medium tracking-[-0.055em] text-[#18221d] shadow-[0_20px_40px_rgba(16,24,16,0.18)] transition duration-300 hover:bg-[#f2ffbd] sm:h-[3.55rem] sm:px-8 sm:text-[1.08rem]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Start a Project
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -3, rotate: 4 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/contact"
                aria-label="Start a Project"
                className="flex h-[3.35rem] w-[3.35rem] items-center justify-center rounded-full bg-[#e7ff92] text-[#18221d] shadow-[0_20px_40px_rgba(16,24,16,0.18)] transition duration-300 hover:bg-[#f2ffbd] sm:h-[3.55rem] sm:w-[3.55rem]"
              >
                <ArrowUpRight size={18} weight="bold" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
