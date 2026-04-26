"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  SealCheck,
  Sparkle,
  Star,
} from "@phosphor-icons/react/dist/ssr";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ResultsComparison from "../../components/ResultsComparison";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink } from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

const featuredStories = [
  {
    label: "Domestic Reset",
    title: "A calm home returned to its best light.",
    image: "/clean-space-living-room.jpg",
    stat: "24hr",
    detail: "deep reset",
    className: "lg:col-span-7 lg:min-h-[620px]",
  },
  {
    label: "Commercial Standard",
    title: "Workspaces prepared for first impressions.",
    image: "/images/about-hero.png",
    stat: "100%",
    detail: "inspection led",
    className: "lg:col-span-5 lg:min-h-[360px]",
  },
  {
    label: "Specialist Detail",
    title: "Equipment, method, and finish working together.",
    image: "/equipment-vacuum-cleaning.jpg",
    stat: "6",
    detail: "service disciplines",
    className: "lg:col-span-5 lg:min-h-[360px]",
  },
  {
    label: "After Builders",
    title: "The final reveal after dust, debris, and detail work.",
    image: "/images/hero-bg-new.png",
    stat: "0",
    detail: "dust left behind",
    className: "lg:col-span-7 lg:min-h-[360px]",
  },
];

const detailHighlights = [
  {
    label: "Deep Cleaning",
    title: "Hidden areas brought back into focus.",
    image: "/images/about-story.png",
  },
  {
    label: "After Builders",
    title: "Construction dust cleared for the final reveal.",
    image: "/images/hero-bg-new.png",
  },
  {
    label: "Quality Assurance",
    title: "Every finish checked before we leave.",
    image: "/images/team-stats.png",
  },
];

const proofItems = [
  "Fully insured teams",
  "Consistent checklists",
  "Premium client care",
  "Satisfaction focused",
];

function MotionEyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${light ? "text-yellow-green" : "text-pine-green"} mb-4 block text-sm font-semibold uppercase tracking-widest`}
    >
      {children}
    </motion.span>
  );
}

function CtaPair({ label = "Request A Quote" }: { label?: string }) {
  return (
    <div className="btn-pair">
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <ButtonLink href="/contact" variant="primary" className="px-8">
          {label}
        </ButtonLink>
      </motion.div>
      <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
        <IconButton href="/contact" aria-label={label} size="md" />
      </motion.div>
    </div>
  );
}

export default function GalleryPage() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="relative bg-[#120f0c] text-aztec">
      <Navbar />

      <section className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden bg-[#7b8078] text-white md:min-h-[600px]">
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { y: heroY, scale: heroScale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/images/about-hero.png")' }}
          />
          <div className="absolute inset-0 bg-black/25 md:bg-transparent md:bg-gradient-to-t md:from-black/50 md:via-transparent md:to-black/20" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 md:hidden">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {["0%", "25%", "50%", "75%", "100%"].map((line) => (
            <div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18" style={{ left: line }} />
          ))}
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pb-4 md:px-10 md:pb-5 lg:px-20"
          style={shouldReduceMotion ? undefined : { y: contentY }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="max-w-[850px]"
            >
              <ScrollReveal
                as="h1"
                enableBlur={true}
                blurStrength={10}
                containerClassName="text-balance text-4xl md:text-6xl lg:text-[80px] leading-[1.0] tracking-tight font-medium text-white max-w-[800px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Cleaning transformations with a visible standard.
              </ScrollReveal>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="hidden pb-2 md:block"
            >
              <div
                className="cursor-default text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Gallery
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow>Featured Transformations</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-aztec"
              >
                Proof of care, craft, and spotless execution.
              </ScrollReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-sm text-base leading-relaxed text-xanadu md:text-lg"
            >
              Each image is composed around the result: cleaner surfaces, brighter rooms, sharper presentation, and a space ready to be trusted again.
            </motion.p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            {featuredStories.map((story, index) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative min-h-[390px] overflow-hidden bg-[#d9d9d2] ${story.className}`}
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/82 via-[#120f0c]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6 md:p-10">
                  <div className="max-w-md">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-green">{story.label}</p>
                    <h3 className="text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                      {story.title}
                    </h3>
                  </div>
                  <div className="hidden text-right text-white md:block">
                    <p className="text-4xl font-medium leading-[1.1] tracking-tight">{story.stat}</p>
                    <p className="text-sm font-semibold uppercase tracking-widest text-white/62">{story.detail}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ResultsComparison />

      <section className="overflow-hidden bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow light>Detail Work</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-white"
              >
                Deep cleans, builders cleans, and final checks.
              </ScrollReveal>
            </div>
            <CtaPair label="Get A Quote" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {detailHighlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden bg-white/5 ${index === 1 ? "min-h-[520px] md:mt-16" : "min-h-[440px]"}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-[0.86] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/86 via-[#120f0c]/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-green">{item.label}</p>
                  <h3 className="text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f3] px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[480px] overflow-hidden bg-[#d9d9d2] lg:col-span-6"
          >
            <Image
              src="/images/team-stats.png"
              alt="Joseph and Co quality assurance team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/58 via-transparent to-transparent" />
          </motion.div>

          <div className="lg:col-span-6">
            <MotionEyebrow>Trust In The Finish</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="mb-6 max-w-2xl text-2xl md:text-4xl leading-[1.1] font-medium tracking-tight text-aztec"
            >
              Quality assurance is built into the experience.
            </ScrollReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-xanadu md:text-xl"
            >
              We present clean spaces as evidence: checked surfaces, satisfied clients, dependable people, and the confidence that every detail has been handled properly.
            </motion.p>

            <div className="grid gap-3 sm:grid-cols-2">
              {proofItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex items-center gap-3 bg-white px-5 py-4 shadow-sm"
                >
                  {index === 0 ? (
                    <SealCheck size={20} className="text-pine-green" weight="fill" />
                  ) : index === 1 ? (
                    <Sparkle size={20} className="text-pine-green" weight="fill" />
                  ) : (
                    <Star size={20} className="text-pine-green" weight="fill" />
                  )}
                  <span className="text-base font-medium tracking-tight text-aztec">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lime-plus-pattern relative overflow-hidden px-5 py-20 text-aztec md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <MotionEyebrow>Start Your Transformation</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={10}
              containerClassName="max-w-[980px] text-balance text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-medium tracking-tight text-aztec"
            >
              Ready for a space that looks as professional as your standards?
            </ScrollReveal>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:pb-2"
          >
            <p className="mb-8 text-lg font-medium leading-relaxed text-aztec/75 md:text-xl">
              Tell us what needs to change. We will shape the clean around your property, schedule, and desired finish.
            </p>
            <CtaPair label="Request Quote" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
