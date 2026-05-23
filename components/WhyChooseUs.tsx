"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Timer, Users, Leaf, Tag } from "@phosphor-icons/react/dist/ssr";

import ScrollReveal from "./ScrollReveal";

const points = [
  {
    title: "Fast Service",
    description:
      "Responsive scheduling and efficient cleaning protocols to respect your valuable time.",
    icon: <Timer size={48} weight="light" />,
  },
  {
    title: "Professional Team",
    description:
      "Extensively trained, background-checked specialists dedicated to immaculate standards.",
    icon: <Users size={48} weight="light" />,
  },
  {
    title: "Eco-Friendly",
    description:
      "Sustainable, non-toxic products that protect your environment and the planet.",
    icon: <Leaf size={48} weight="light" />,
  },
  {
    title: "Affordable Pricing",
    description:
      "Transparent, competitive rates for premium services without compromising on quality.",
    icon: <Tag size={48} weight="light" />,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04]);

  return (
    <section
      ref={sectionRef}
      className="bg-aztec py-16 md:py-24 px-5 md:px-10 lg:px-20 text-wild-sand overflow-hidden"
    >
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-yellow-green font-semibold uppercase tracking-widest text-sm mb-4 block"
            >
              The Joseph.co Advantage
            </motion.span>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-white"
            >
              Why Discerning Clients Choose Our Services
            </ScrollReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xanadu text-base md:text-lg max-w-sm leading-relaxed"
          >
            Setting the benchmark for excellence in professional cleaning through a
            relentless commitment to quality and integrity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Creative image panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="relative lg:col-span-5 min-h-[320px] sm:min-h-[380px] lg:min-h-[520px]"
          >
            {/* Offset accent frame */}
            <div
              className="absolute -left-3 top-3 bottom-8 right-6 border border-yellow-green/45 pointer-events-none z-0 hidden sm:block"
              aria-hidden
            />

            <div className="relative h-full min-h-[inherit] overflow-hidden border border-white/10 bg-aztec">
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : { y: imageY, scale: imageScale }
                }
                className="absolute inset-0 origin-center"
              >
                <Image
                  src="/images/why-choose-us.png"
                  alt="Joseph.co cleaning specialists delivering premium service"
                  fill
                  quality={95}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </motion.div>

              {/* Subtle edge vignette — keeps text readable without hiding the photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-aztec/80 via-transparent to-aztec/20 pointer-events-none" />

              {/* Floating badge */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: smoothEase }}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-yellow-green px-3 py-2"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[.2em] text-aztec">
                  Trusted Excellence
                </span>
              </motion.div>

              {/* Caption strip */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.35, ease: smoothEase }}
                className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-aztec/75 px-5 py-4 backdrop-blur-sm md:px-6 md:py-5"
              >
                <p className="font-sans text-[11px] font-bold uppercase tracking-[.18em] text-yellow-green mb-1">
                  The standard we uphold
                </p>
                <p className="text-sm leading-relaxed text-wild-sand/85 md:text-[15px]">
                  Real teams, real results — the same meticulous care on every visit.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Points grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                  ease: smoothEase,
                }}
                className="bg-aztec p-6 md:p-8 lg:p-9 flex flex-col gap-5 md:gap-6 group hover:bg-white/5 transition-colors duration-500"
              >
                <div className="text-yellow-green group-hover:scale-110 transition-transform duration-500 origin-left">
                  {point.icon}
                </div>
                <div className="flex flex-col gap-2.5 md:gap-3">
                  <h3 className="text-lg md:text-xl leading-[1.1] text-white font-medium tracking-tight">
                    {point.title}
                  </h3>
                  <p className="text-xanadu text-sm md:text-base leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
