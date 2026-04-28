"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
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
        alt={portfolio.coverImage.alt}
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

export default function PortfolioPageView({
  portfolios,
  source,
}: {
  portfolios: PortfolioCollectionResult["items"];
  source: PortfolioCollectionResult["source"];
}) {
  const shouldReduceMotion = useReducedMotion();
  const heroPortfolio = portfolios[0];
  const projectCount = portfolios.length;
  const locationCount = new Set(portfolios.map((portfolio) => portfolio.location)).size;
  const featuredCount = portfolios.filter((portfolio) => portfolio.featured).length;

  return (
    <>
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-[#5f655f] text-white md:min-h-[680px]">
        {heroPortfolio ? (
          <>
            <Image
              src={heroPortfolio.coverImage.url}
              alt={heroPortfolio.coverImage.alt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/88 via-[#120f0c]/36 to-[#120f0c]/18" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,233,147,0.18),_transparent_42%),linear-gradient(135deg,#1b1815_0%,#0f1619_100%)]" />
        )}

        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {["0%", "25%", "50%", "75%", "100%"].map((line) => (
            <div
              key={line}
              className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/10"
              style={{ left: line }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 pb-10 pt-24 md:px-10 md:pb-12 md:pt-32 lg:px-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-[900px]">
              <MotionEyebrow light>
                {source === "sample" ? "Portfolio Preview" : "Portfolio Archive"}
              </MotionEyebrow>
              <ScrollReveal
                as="h1"
                enableBlur
                blurStrength={10}
                containerClassName="max-w-[860px] text-balance text-3xl leading-[1.0] text-white md:text-6xl lg:text-[78px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Case studies shaped around trust, finish, and handover confidence.
              </ScrollReveal>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/72 md:text-xl"
              >
                Explore proof-of-work stories across landlord handovers, communal management, builders cleans, and premium resets delivered to the Joseph & Co standard.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.3 }}
                className="mt-10 btn-pair"
              >
                <ButtonLink href="/contact?source=Portfolio Hero" variant="primary" className="px-8">
                  Discuss Your Property
                </ButtonLink>
                <IconButton
                  href="/contact?source=Portfolio Hero"
                  aria-label="Discuss your property"
                  size="md"
                />
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3"
            >
              {[
                { label: "Projects", value: String(projectCount).padStart(2, "0"), icon: Buildings },
                { label: "Locations", value: String(locationCount).padStart(2, "0"), icon: MapPin },
                { label: "Featured", value: String(featuredCount).padStart(2, "0"), icon: SealCheck },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="border border-white/10 bg-black/15 p-5 backdrop-blur-sm md:p-6">
                    <Icon size={20} className="mb-6 text-yellow-green" weight="duotone" />
                    <p className="mb-2 text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-4xl">
                      {item.value}
                    </p>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                      {item.label}
                    </p>
                  </div>
                );
              })}
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
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-xanadu md:text-lg"
            >
              Handover timing, service type, finish quality, and landlord confidence are all carried through each case study so the work reads like evidence.
            </motion.p>
          </div>

          {portfolios.length ? (
            <div className="grid gap-4 lg:grid-cols-12">
              {portfolios.map((portfolio, index) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} index={index} />
              ))}
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
