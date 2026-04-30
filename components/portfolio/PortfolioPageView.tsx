"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Buildings,
  MapPin,
  SealCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import ScrollReveal from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import type { PortfolioCollectionResult, PortfolioRecord } from "@/types/portfolio";

const cardSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
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

function PortfolioCard({
  portfolio,
  index,
}: {
  portfolio: PortfolioRecord;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-h-[400px] overflow-hidden bg-[#d9d9d2] ${cardSpans[index % cardSpans.length]}`}
    >
      <Image
        src={portfolio.coverImage.url}
        alt={`${portfolio.coverImage.alt} - ${portfolio.serviceType} case study in ${portfolio.location}`}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/88 via-[#120f0c]/18 to-transparent" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 md:p-8">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-black/15 px-3 py-2 backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-green md:text-xs">
            {portfolio.serviceType}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 border border-white/10 bg-black/15 px-3 py-2 backdrop-blur-sm">
          <MapPin size={15} className="text-yellow-green" weight="fill" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72 md:text-xs">
            {portfolio.location}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-4 md:mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/56 md:text-sm">
            {format(new Date(portfolio.completionDate), "MMM yyyy")}
          </span>
          {portfolio.featured ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-yellow-green md:text-sm">
              <Sparkle size={14} weight="fill" />
              Featured
            </span>
          ) : null}
        </div>

        <h3 className="mb-4 max-w-xl text-lg font-medium leading-[1.1] tracking-tight text-white md:text-3xl">
          {portfolio.title}
        </h3>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/70 md:mb-8 md:text-lg">
          {portfolio.resultSummary}
        </p>

        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          className="inline-flex"
        >
          <Link
            href={`/portfolio/${portfolio.slug}`}
            className="inline-flex items-center gap-4 rounded-full bg-yellow-green px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-aztec transition duration-300 hover:bg-[#b9f53a]"
          >
            <span>View Case Study</span>
            <ArrowUpRight size={18} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

interface PortfolioIndexProps {
  portfolios: PortfolioRecord[];
  source: string;
}

export default function PortfolioPageView({ portfolios, source }: PortfolioIndexProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const heroPortfolio = portfolios[0];
  const projectCount = portfolios.length;
  const locationCount = new Set(portfolios.map((portfolio) => portfolio.location)).size;
  const featuredCount = portfolios.filter((portfolio) => portfolio.featured).length;

  const categories = ["All", ...Array.from(new Set(portfolios.map((p) => p.serviceType)))];

  const filteredPortfolios = activeCategory === "All"
    ? portfolios
    : portfolios.filter((p) => p.serviceType === activeCategory);

  return (
    <>
      <section className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden bg-[#5f655f] text-white md:min-h-[600px]">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { scale: heroImageScale, y: heroImageY }}
        >
          <Image
            src={heroPortfolio?.coverImage?.url || "/images/gallery-hero.png"}
            alt={heroPortfolio?.coverImage?.alt || "Joseph and Co portfolio of cleaning projects"}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25 md:bg-transparent md:bg-gradient-to-t md:from-black/50 md:via-transparent md:to-black/20" />
        </motion.div>

        {/* Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 md:hidden">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {["0%", "25%", "50%", "75%", "100%"].map((line) => (
            <div
              key={line}
              className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18"
              style={{ left: line }}
            />
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
                enableBlur
                blurStrength={10}
                containerClassName="text-balance text-4xl leading-[1.0] font-medium tracking-tight text-white md:text-6xl lg:text-[80px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Portfolio of Works
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
                {source === "sample" ? "Preview Mode" : "Official Archive"}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Archive Overview Section - Moved from Hero */}
      <section className="bg-wild-sand px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
            <div className="max-w-3xl">
              <MotionEyebrow>Archive Overview</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="mb-8 text-2xl font-medium leading-[1.15] tracking-tight text-aztec md:text-4xl"
              >
                Explore proof-of-work stories across landlord handovers, communal management, builders cleans, and premium resets.
              </ScrollReveal>
              
              <div className="btn-pair">
                <ButtonLink href="/contact?source=Portfolio Index" variant="primary" className="px-8">
                  Discuss Your Project
                </ButtonLink>
                <IconButton href="/contact?source=Portfolio Index" aria-label="Discuss your project" size="md" />
              </div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="border border-aztec/10 bg-white p-5 md:p-8 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pine-green/60">
                  Projects
                </p>
                <p className="text-2xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                  {projectCount}
                </p>
              </div>
              <div className="border border-aztec/10 bg-white p-5 md:p-8 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pine-green/60">
                  Locations
                </p>
                <p className="text-2xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                  {locationCount}
                </p>
              </div>
              <div className="border border-aztec/10 bg-white p-5 md:p-8 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pine-green/60">
                  Featured
                </p>
                <p className="text-2xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                  {featuredCount}
                </p>
              </div>
              <div className="border border-aztec/10 bg-white p-5 md:p-8 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-pine-green/60">
                  Satisfaction
                </p>
                <p className="text-2xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                  100%
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-white px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow>Case Study Grid</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-xl leading-[1.1] text-aztec md:text-4xl"
              >
                Each project is presented as a result, not just a photo set.
              </ScrollReveal>
            </div>
            <div className="flex flex-col gap-8 lg:items-end">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-md text-base leading-relaxed text-xanadu md:text-lg lg:text-right"
              >
                Handover timing, service type, finish quality, and landlord confidence are all carried through each case study so the work reads like evidence.
              </motion.p>
              <div className="btn-pair">
                <ButtonLink
                  href="/contact?source=Portfolio Grid"
                  variant="primary"
                  className="px-8"
                >
                  Book a Site Audit
                </ButtonLink>
                <IconButton
                  href="/contact?source=Portfolio Grid"
                  aria-label="Book a site audit"
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-aztec text-white"
                    : "bg-[#f5f5f3] text-aztec hover:bg-aztec/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredPortfolios.length ? (
            <div className="grid gap-4 lg:grid-cols-12">
              {filteredPortfolios.map((portfolio, index) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} index={index} />
              ))}

              {/* Inquiry Card to fill empty space */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: filteredPortfolios.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col justify-between overflow-hidden border border-aztec/10 bg-[#f5f5f3] p-8 md:p-12 ${
                  cardSpans[filteredPortfolios.length % cardSpans.length]
                }`}
              >
                <div>
                  <MotionEyebrow>Next Steps</MotionEyebrow>
                  <h3 className="mb-6 max-w-md text-2xl font-medium leading-[1.1] tracking-tight text-aztec md:text-4xl">
                    Don't see your specific project type?
                  </h3>
                  <p className="max-w-sm text-base leading-relaxed text-xanadu md:text-lg">
                    We specialize in tailored resets for complex environments, from clinical spaces to heritage properties.
                  </p>
                </div>

                <div className="mt-12 flex flex-col gap-6">
                  <div className="flex flex-wrap gap-2">
                    {["Post-Tenancy", "Commercial Resets", "Builders Cleans", "Deep Resets"].map((tag) => (
                      <span key={tag} className="border border-aztec/10 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-aztec/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="btn-pair">
                    <ButtonLink
                      href="/contact?source=Portfolio Fallback"
                      variant="primary"
                      className="px-8"
                    >
                      Request a Custom Quote
                    </ButtonLink>
                    <IconButton
                      href="/contact?source=Portfolio Fallback"
                      aria-label="Request custom quote"
                      size="md"
                    />
                  </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute -bottom-12 -right-12 h-64 w-64 opacity-[0.03] pointer-events-none">
                  <Buildings size={256} weight="duotone" />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="border border-aztec/10 bg-[#f5f5f3] p-8 md:p-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-pine-green">
                Portfolio Empty
              </p>
              <h3 className="mb-4 text-xl font-medium leading-[1.1] tracking-tight text-aztec md:text-2xl">
                Case studies will appear here as soon as projects are published.
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-xanadu md:text-lg">
                Use the hidden admin route to upload a cover image, before-and-after story images, and the result summary for each completed job.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-4 lg:grid-cols-3">
          {[
            {
              title: "Landlord-led proof",
              body: "Every case study is written to answer the questions a landlord, letting manager, or handover coordinator actually cares about.",
            },
            {
              title: "Story-driven imagery",
              body: "Cover images, comparison frames, and detail shots are arranged to show the work sequence rather than function as a simple gallery.",
            },
            {
              title: "Moderated trust signals",
              body: "Review submissions are captured privately first, then published only after approval inside the admin workflow.",
            },
          ].map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="border border-white/10 p-6 md:p-8"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-green">
                0{index + 1}
              </p>
              <h3 className="mb-4 text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-white/65">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
