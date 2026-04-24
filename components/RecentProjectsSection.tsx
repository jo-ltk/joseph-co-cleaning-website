"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";

import ScrollReveal from "./ScrollReveal";

type ProjectCard = { title: string; image: string; alt: string; overlay: string; desktopClassName: string; backgroundPosition?: string; showViewProject?: boolean; showPlus?: boolean; };

const slides: ProjectCard[][] = [
  [
    { title: "The Heights Penthouse", image: "https://images.pexels.com/photos/15379018/pexels-photo-15379018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=2200", alt: "Luxury penthouse living room with skyline view", overlay: "linear-gradient(180deg, rgba(150, 155, 148, 0.18) 0%, rgba(18, 21, 16, 0.38) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center", showViewProject: true, showPlus: true },
    { title: "Regency Corporate Hub", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=80", alt: "Modern glass office building interior", overlay: "linear-gradient(180deg, rgba(3, 12, 13, 0.08) 0%, rgba(3, 9, 12, 0.54) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
    { title: "Luxe Retail Plaza", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", alt: "High-end shopping mall atrium", overlay: "linear-gradient(180deg, rgba(9, 22, 19, 0.12) 0%, rgba(8, 14, 13, 0.42) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
  ],
  [
    { title: "Azure Marina Villas", image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2200&q=80", alt: "Waterfront luxury villa exterior", overlay: "linear-gradient(180deg, rgba(152, 140, 118, 0.14) 0%, rgba(19, 18, 14, 0.42) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center", showViewProject: true, showPlus: true },
    { title: "Global Tech Campus", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80", alt: "Minimalist tech office lobby", overlay: "linear-gradient(180deg, rgba(2, 10, 13, 0.1) 0%, rgba(3, 10, 12, 0.55) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
    { title: "Skyview Residences", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", alt: "Modern apartment balcony view", overlay: "linear-gradient(180deg, rgba(8, 22, 20, 0.1) 0%, rgba(8, 16, 15, 0.4) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
  ],
  [
    { title: "Beacon Health Center", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=80", alt: "Sterile medical facility hallway", overlay: "linear-gradient(180deg, rgba(118, 139, 154, 0.12) 0%, rgba(12, 18, 17, 0.42) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center", showViewProject: true, showPlus: true },
    { title: "Grand Horizon Hotel", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=80", alt: "Luxury hotel lobby with marble floors", overlay: "linear-gradient(180deg, rgba(3, 9, 12, 0.08) 0%, rgba(2, 10, 12, 0.56) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
    { title: "Nature Retreat Spa", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", alt: "Serene spa interior", overlay: "linear-gradient(180deg, rgba(9, 18, 14, 0.08) 0%, rgba(8, 13, 11, 0.44) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
  ],
  [
    { title: "Summit Executive Suites", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2200&q=80", alt: "High-floor executive office", overlay: "linear-gradient(180deg, rgba(150, 149, 132, 0.14) 0%, rgba(15, 17, 13, 0.42) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center", showViewProject: true, showPlus: true },
    { title: "Elite Fitness Club", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2200&q=80", alt: "High-end gym interior", overlay: "linear-gradient(180deg, rgba(4, 10, 12, 0.08) 0%, rgba(4, 10, 12, 0.58) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
    { title: "Legacy Library Hall", image: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80", alt: "Polished historic library", overlay: "linear-gradient(180deg, rgba(8, 22, 20, 0.08) 0%, rgba(7, 13, 12, 0.44) 100%)", desktopClassName: "md:col-span-4", backgroundPosition: "center center" },
  ],
];

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 84 : -84 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -84 : 84 }),
};

export default function RecentProjectsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const navigateToSlide = (nextIndex: number) => { setDirection(nextIndex > activeSlide ? 1 : -1); setActiveSlide(nextIndex); };
  const previousSlide = () => { const n = activeSlide === 0 ? slides.length - 1 : activeSlide - 1; setDirection(-1); setActiveSlide(n); };
  const nextSlide = () => { const n = activeSlide === slides.length - 1 ? 0 : activeSlide + 1; setDirection(1); setActiveSlide(n); };

  return (
    <section className="bg-white py-16 md:py-24 px-5 md:px-10 lg:px-20 text-aztec">
      <motion.div className="mx-auto max-w-[1450px]" initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Portfolio Highlights
            </motion.span>
            <ScrollReveal
              as="h2"
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              Signature Results, Global Standards
            </ScrollReveal>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-6 lg:gap-8 w-full lg:w-auto">
           <motion.p
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
  className="text-xanadu text-base md:text-lg max-w-sm text-left lg:text-right leading-relaxed"
>
  Explore our portfolio of high-end penthouses, corporate headquarters, and luxury estates maintained to the Joseph.co standard.
</motion.p>
            <div className="flex items-center gap-4 self-start lg:self-end">
              <motion.button type="button" aria-label="Previous project" onClick={previousSlide} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-aztec shadow-sm transition-colors duration-300 hover:bg-aztec hover:text-white border border-aztec/5">
                <CaretLeft size={20} weight="bold" />
              </motion.button>
              <motion.button type="button" aria-label="Next project" onClick={nextSlide} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-aztec shadow-sm transition-colors duration-300 hover:bg-aztec hover:text-white border border-aztec/5">
                <CaretRight size={20} weight="bold" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="relative min-h-[420px] sm:min-h-[480px] md:min-h-[380px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div key={activeSlide} custom={direction} variants={shouldReduceMotion ? undefined : slideVariants} initial={shouldReduceMotion ? undefined : "enter"} animate={shouldReduceMotion ? undefined : "center"} exit={shouldReduceMotion ? undefined : "exit"} transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-12">
                {slides[activeSlide].map((project, index) => (
                  <motion.article key={project.title} whileHover={shouldReduceMotion ? undefined : "hover"} initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative overflow-hidden bg-[#d9d9d2] ${project.desktopClassName} ${index === 2 ? "min-h-[200px] md:min-h-[380px]" : "min-h-[200px] sm:min-h-[240px] md:min-h-[380px]"}`}>
                    <motion.div variants={shouldReduceMotion ? undefined : { hover: { scale: 1.045 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0"
                      style={{ backgroundImage: `${project.overlay}, url("${project.image}")`, backgroundPosition: project.backgroundPosition ?? "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} aria-label={project.alt} role="img" />
                    {project.showPlus && (
                      <motion.div variants={shouldReduceMotion ? undefined : { hover: { scale: 1.08, opacity: 0.94 } }} className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-2xl font-extralight leading-none text-white/70 md:h-16 md:w-16">+</motion.div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-4 md:p-8">
                      <motion.p variants={shouldReduceMotion ? undefined : { hover: { y: -2 } }} className="text-sm md:text-base font-medium tracking-tight text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{project.title}</motion.p>
                      {project.showViewProject && (
                        <motion.div variants={shouldReduceMotion ? undefined : { hover: { y: -3, opacity: 1 } }} className="hidden opacity-90 md:block">
                          <Link href="/gallery" className="inline-flex items-center gap-4 rounded-full bg-[#dbe783]/10 px-4 py-2 text-sm font-medium tracking-tight text-[#d5d18d] backdrop-blur-md transition duration-300 hover:bg-[#dbe783]/18 hover:text-[#eff7ae]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                            <span>View Project</span>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d5d18d]/25 bg-black/10"><span aria-hidden="true">↗</span></span>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="btn-pair">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}><ButtonLink href="/gallery" variant="primary">View All</ButtonLink></motion.div>
            <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}><IconButton href="/gallery" aria-label="View all projects" size="md" /></motion.div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <motion.button key={index} type="button" aria-label={`Go to project slide ${index + 1}`} onClick={() => navigateToSlide(index)} whileTap={{ scale: 0.92 }}
                className={`rounded-full transition-all duration-300 ${index === activeSlide ? "h-[10px] w-[10px] bg-aztec" : "h-[10px] w-[10px] bg-aztec/20 hover:bg-aztec/40"}`} />
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}