"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import {
  Buildings,
  HouseLine,
  Storefront,
  Hammer,
  Tree,
  Key,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import ScrollReveal from "./ScrollReveal";

type Industry = {
  title: string;
  summary: string;
  tag: string;
  image: string;
  imagePosition?: string;
  highlights: string[];
  Icon: Icon;
};

const industries: Industry[] = [
  {
    title: "Corporate Offices",
    summary:
      "Maintain a professional and healthy workspace with our comprehensive commercial cleaning solutions.",
    tag: "Commercial",
    image: "/images/trust-finish.png",
    imagePosition: "center center",
    highlights: ["After-hours schedules", "Desk & meeting rooms", "Reception-ready daily"],
    Icon: Buildings,
  },
  {
    title: "Luxury Residential",
    summary:
      "Detailed care for high-end homes, ensuring every corner reflects the elegance of your living space.",
    tag: "Residential",
    image: "/images/luxury-residential.png",
    imagePosition: "center center",
    highlights: ["Discreet, vetted teams", "Fine surfaces & fabrics", "Flexible visit cadence"],
    Icon: HouseLine,
  },
  {
    title: "Retail & Showrooms",
    summary:
      "Create an inviting atmosphere for your customers with pristine floors and spotless displays.",
    tag: "Retail",
    image: "/images/retail-showrooms.png",
    imagePosition: "center center",
    highlights: ["Opening-hour turnaround", "Glass & display care", "High-traffic floor plans"],
    Icon: Storefront,
  },
  {
    title: "Post-Construction",
    summary:
      "Final touch cleaning that transforms construction sites into move-in ready, immaculate properties.",
    tag: "Specialized",
    image: "/images/post-construction.png",
    imagePosition: "center center",
    highlights: ["Dust & debris removal", "Snag-list support", "Handover-ready finish"],
    Icon: Hammer,
  },
  {
    title: "Private Estates",
    summary:
      "Comprehensive exterior care for distinguished properties, from manicured gardens to pristine driveways.",
    tag: "Outdoor",
    image: "/images/about-hero.png",
    imagePosition: "center center",
    highlights: ["Grounds & pathways", "Pool & terrace areas", "Seasonal deep cleans"],
    Icon: Tree,
  },
  {
    title: "Property Services",
    summary:
      "Property management support, professional letting services, and coordinated move-in and move-out assistance for landlords, agents, and property owners.",
    tag: "Property",
    image: "/images/unsplash/photo-1600585154340-be6161a56a0c.jpg",
    imagePosition: "center center",
    highlights: ["Management support", "Letting services", "Move-in & move-out care"],
    Icon: Key,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;
const panelTransition = { duration: 0.85, ease: smoothEase };
const cardTransition = { duration: 0.65, ease: smoothEase };
const layoutTransition = { layout: { duration: 0.65, ease: smoothEase } };

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function FeaturedStack({
  activeIndex,
  shouldReduceMotion,
}: {
  activeIndex: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <>
      {industries.map((industry, index) => {
        const {
          title,
          tag,
          image,
          imagePosition,
          highlights,
          Icon,
        } = industry;
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={title}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.035,
            }}
            transition={
              shouldReduceMotion ? { duration: 0 } : panelTransition
            }
            style={{
              zIndex: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
            aria-hidden={!isActive}
          >
            <Image
              src={image}
              alt={title}
              fill
              priority={index === 0}
              quality={100}
              className="object-cover"
              style={{ objectPosition: imagePosition ?? "center" }}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Mobile only: light scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-aztec/90 via-aztec/40 to-transparent lg:hidden" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 lg:p-10 lg:max-w-[92%]">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center border border-yellow-green/50 bg-aztec/85 text-yellow-green lg:bg-aztec/90 lg:shadow-[0_4px_24px_rgba(17,32,37,0.35)]">
                <Icon size={32} weight="light" aria-hidden />
              </div>

              <span className="mb-3 inline-block w-fit bg-yellow-green px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[.18em] text-aztec shadow-sm">
                {tag}
              </span>

              <h3 className="mb-4 max-w-md text-2xl font-medium tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl lg:[text-shadow:0_1px_12px_rgba(17,32,37,0.55)]">
                {title}
              </h3>

              <ul className="flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="border border-aztec/10 bg-white/95 px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[.12em] text-aztec shadow-sm lg:bg-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

function IndustryListItem({
  industry,
  index,
  isActive,
  onSelect,
  shouldReduceMotion,
}: {
  industry: Industry;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  shouldReduceMotion: boolean | null;
}) {
  const { title, summary, tag, Icon } = industry;

  return (
    <motion.button
      type="button"
      layout
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        ...layoutTransition,
        opacity: { duration: 0.5, delay: index * 0.06, ease: smoothEase },
        x: { duration: 0.5, delay: index * 0.06, ease: smoothEase },
      }}
      animate={{
        borderColor: isActive ? "rgba(199, 233, 147, 0.5)" : "rgba(17, 32, 37, 0.1)",
        backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
        boxShadow: isActive
          ? "0 10px 40px -12px rgba(17, 32, 37, 0.18)"
          : "0 0 0 0 rgba(17, 32, 37, 0)",
      }}
      className="group relative w-full border text-left"
      aria-pressed={isActive}
      aria-label={`View ${title}`}
    >
      <div className="flex items-stretch gap-0">
        <motion.div
          layout
          transition={cardTransition}
          className="flex w-16 shrink-0 items-center justify-center border-r md:w-[72px]"
          animate={{
            backgroundColor: isActive ? "#112025" : "#f6f6f6",
            borderColor: isActive ? "rgba(199, 233, 147, 0.3)" : "rgba(17, 32, 37, 0.08)",
            color: isActive ? "#c7e993" : "rgba(17, 32, 37, 0.7)",
          }}
        >
          <Icon size={28} weight="light" aria-hidden />
        </motion.div>

        <div className="min-w-0 flex-1 px-4 py-4 md:px-5 md:py-5">
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[.2em] text-pine-green">
              {tag}
            </span>
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -4,
              }}
              transition={cardTransition}
              className="shrink-0 text-yellow-green"
              aria-hidden
            >
              <ArrowRight size={16} weight="bold" />
            </motion.span>
          </div>
          <h3 className="text-base font-medium tracking-tight text-aztec md:text-lg">
            {title}
          </h3>
          <motion.div
            initial={false}
            animate={{
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
              marginTop: isActive ? 10 : 0,
            }}
            transition={cardTransition}
            className="overflow-hidden"
          >
            <p className="font-sans text-[13px] leading-[1.65] text-aztec/65">
              {summary}
            </p>
          </motion.div>
          <motion.div
            className="mt-2.5 h-[1.5px] bg-yellow-green origin-left"
            animate={{ width: isActive ? "100%" : "1.75rem" }}
            transition={cardTransition}
          />
        </div>
      </div>
    </motion.button>
  );
}

function MobileIndustryCard({
  industry,
  index,
  shouldReduceMotion,
}: {
  industry: Industry;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const { title, summary, tag, image, imagePosition, Icon } = industry;
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden border border-aztec/8 bg-white"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="group block w-full text-left"
        aria-expanded={expanded}
      >
        <div className="relative h-44 overflow-hidden sm:h-48">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              expanded ? "scale-105 grayscale-0" : "scale-100 grayscale-[25%]"
            }`}
            style={{ objectPosition: imagePosition ?? "center" }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aztec/80 via-aztec/20 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center bg-yellow-green text-aztec">
              <Icon size={22} weight="light" aria-hidden />
            </span>
            <span className="bg-aztec px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[.18em] text-yellow-green">
              {tag}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-medium tracking-tight text-aztec">{title}</h3>
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mt-1 shrink-0 text-aztec/40"
            >
              <ArrowRight size={18} weight="bold" aria-hidden />
            </motion.span>
          </div>
          <motion.div
            className="mt-2 h-[1.5px] bg-yellow-green origin-left"
            animate={{ width: expanded ? "100%" : "1.75rem" }}
            transition={cardTransition}
          />
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                {...fade}
                transition={cardTransition}
                className="mt-3 font-sans text-[13px] leading-[1.7] text-aztec/65"
              >
                {summary}
              </motion.p>
            )}
          </AnimatePresence>
          {!expanded && (
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[.14em] text-xanadu">
              Tap to read more
            </p>
          )}
        </div>
      </button>
    </motion.article>
  );
}

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-wild-sand pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-10 lg:px-20 text-aztec">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
            >
              Expertise
            </motion.span>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              Industries We Serve
            </ScrollReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xanadu text-base md:text-lg max-w-sm leading-relaxed"
          >
            Hover or tap an industry to preview how we tailor our teams, schedules,
            and standards to each environment.
          </motion.p>
        </div>

        {/* Desktop: spotlight + interactive list */}
        <div className="hidden lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-5 xl:gap-6">
          <div className="relative min-h-[520px] overflow-hidden border border-aztec/10">
            <FeaturedStack
              activeIndex={activeIndex}
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="pointer-events-none absolute bottom-0 right-0 z-20 flex gap-1.5 p-5">
              {industries.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="pointer-events-auto h-1.5 rounded-full bg-white/35 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/60"
                  style={{
                    width: i === activeIndex ? "2rem" : "0.75rem",
                    backgroundColor:
                      i === activeIndex ? "#c7e993" : undefined,
                  }}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
          </div>

          <LayoutGroup>
            <motion.div layout className="flex flex-col gap-2.5">
              {industries.map((industry, index) => (
                <IndustryListItem
                  key={industry.title}
                  industry={industry}
                  index={index}
                  isActive={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          </LayoutGroup>
        </div>

        {/* Mobile / tablet: expandable cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {industries.map((industry, index) => (
            <MobileIndustryCard
              key={industry.title}
              industry={industry}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
