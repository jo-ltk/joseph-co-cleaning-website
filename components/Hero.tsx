"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calculator } from "@phosphor-icons/react";
import Button, { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";
import ScrollReveal from "./ScrollReveal";

const heroImage = "/images/hero-wall.png";
const desktopGridLines = ["0%", "25%", "50%", "75%", "100%"];

export default function Hero() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          MOBILE HERO — Hydra-inspired split layout
          Top: image (~58vh) with heading bleeding over edge
          Bottom: white panel with description + CTAs
      ═══════════════════════════════════════════════ */}
      <section className="md:hidden flex flex-col min-h-[100dvh] bg-white overflow-hidden">

        {/* Image zone — tall enough to contain the full heading */}
        <div className="relative w-full shrink-0" style={{ height: "72dvh" }}>
          <motion.div
            className="absolute inset-0"
          >
            <img
              src={heroImage}
              alt="Premium Interior"
              className="w-full h-full object-cover object-[center_60%]"
            />
          </motion.div>
          {/* Top vignette for navbar */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.28)_0%,transparent_50%)]" />

          {/* Eyebrow tag — top left, anchors the empty sky */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="absolute top-6 left-5 z-10 flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-green inline-block" />
              Premium Cleaning
            </span>
          </motion.div>
          {/* Bottom vignette so heading pops */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.1)_55%,transparent_100%)]" />

          {/* Heading — fully inside the image zone */}
          <div className="absolute bottom-0 left-0 right-0 px-5 z-10 pb-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-[3rem] leading-[1.01] tracking-[-0.025em] font-bold text-white"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                textShadow: "0 2px 24px rgba(0,0,0,0.22)",
              }}
            >
              True Comfort<br />
              Always Begins<br />
              When We Clean
            </motion.h1>
          </div>
        </div>

        {/* White bottom panel */}
        <div className="flex flex-col flex-1 bg-white px-5 pt-5 pb-10">

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
            className="text-[0.93rem] leading-[1.65] font-normal max-w-[320px]"
            style={{ fontFamily: "var(--font-inter), sans-serif", color: "rgba(30,42,30,0.52)" }}
          >
            Outstanding cleaning services tailored for high-end residential and commercial environments.
          </motion.p>

          {/* Push CTAs to bottom */}
          <div className="flex-1 min-h-[1.5rem]" />

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
            className="flex flex-col gap-3"
          >
            <motion.div whileTap={{ scale: 0.975 }}>
              <ButtonLink
                href="/contact?source=Homepage Hero Mobile"
                variant="primary"
                className="w-full flex items-center justify-center rounded-full py-[1.05rem] font-bold text-[0.97rem] tracking-[-0.01em] shadow-[0_6px_28px_rgba(16,24,16,0.13)]"
              >
                Book Quote / Contact
              </ButtonLink>
            </motion.div>

            <motion.div whileTap={{ scale: 0.975 }}>
              <button
                type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-estimate"))}
                className="w-full flex items-center justify-center gap-[0.45rem] rounded-full border border-aztec/12 bg-aztec/[0.04] py-[1.05rem] text-[0.97rem] font-bold text-aztec tracking-[-0.01em] transition-colors active:bg-aztec/[0.09]"
              >
                <Calculator size={18} weight="bold" />
                Instant Estimate
              </button>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DESKTOP HERO — original design, untouched
      ═══════════════════════════════════════════════ */}
      <section 
        className="relative hidden md:flex h-[100dvh] items-stretch overflow-hidden bg-xanadu text-white"
      >
        <div
          data-parallax="0.15"
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[1.05] contrast-[1.02]"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.1)_30%,transparent_100%)]" />
        <div className="absolute inset-0 bg-black/5" />

        <div className="absolute inset-0 pointer-events-none">
          {desktopGridLines.map((line) => (
            <div
              key={line}
              className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18"
              style={{ left: line }}
            />
          ))}
        </div>

        <div
          data-parallax="-0.1"
          className="relative z-10 mx-auto flex h-full w-full max-w-[1950px] flex-col items-start justify-center px-6 pb-10 pt-40 md:pl-8 lg:pl-12 text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            className="flex max-w-[680px] flex-col items-start gap-4 w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              className="max-w-full text-[3.2rem] lg:text-[5rem] leading-[1.05] tracking-tight font-medium text-white drop-shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                textShadow: "0 10px 50px rgba(0,0,0,0.2), 0 20px 80px rgba(0,0,0,0.15)",
              }}
            >
              True Comfort <br />
              Always Begins <br />
              <span>When We Clean</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
              className="max-w-[480px] text-balance text-lg font-medium leading-relaxed text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Delivering outstanding cleaning services tailored for high-end residential and commercial environments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.46 }}
              className="flex flex-row items-center gap-4 mt-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            >
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <ButtonLink
                  href="/contact?source=Homepage Hero"
                  variant="primary"
                  className="shadow-[0_20px_40px_rgba(16,24,16,0.18)] px-10 py-4 flex items-center justify-center rounded-full font-bold text-sm"
                >
                  Book Quote / Contact
                </ButtonLink>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-estimate"))}
                  className="flex items-center justify-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-10 py-4 text-sm font-bold text-white transition-all hover:bg-white/25"
                >
                  <Calculator size={18} weight="bold" />
                  Instant Estimate
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}