"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  Buildings,
  CheckCircle,
  Clock,
  Flag,
  MapPin,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Star,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ScrollReveal from "@/components/ScrollReveal";
import { ButtonLink } from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import {
  getPortfolioAfterImage,
  getPortfolioBeforeImage,
  getPortfolioDetailImages,
} from "@/lib/portfolio-helpers";
import type { PortfolioRecord, ReviewRecord } from "@/types/portfolio";
import LandlordReviewForm from "./LandlordReviewForm";
import TrustLabel from "./TrustLabel";

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

function OutcomeItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border border-yellow-green/20 bg-yellow-green/5 px-3 py-1.5 backdrop-blur-sm">
      <CheckCircle size={14} className="text-yellow-green" weight="fill" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
        {label}
      </span>
    </div>
  );
}

export default function PortfolioDetailView({
  portfolio,
  reviews,
}: {
  portfolio: PortfolioRecord;
  reviews: ReviewRecord[];
}) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const beforeImage = getPortfolioBeforeImage(portfolio);
  const afterImage = getPortfolioAfterImage(portfolio);
  const detailImages = getPortfolioDetailImages(portfolio);

  return (
    <>
      {/* Back Navigation */}
      <div className="absolute left-6 top-24 z-50 md:left-10 md:top-32 lg:left-20">
        <Link 
          href="/portfolio" 
          className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-yellow-green"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all group-hover:border-yellow-green/30 group-hover:bg-yellow-green/10">
            <ArrowLeft size={16} />
          </div>
          <span className="hidden md:inline">Back to Archive</span>
        </Link>
      </div>

      <section className="relative flex h-[70vh] min-h-[550px] items-end overflow-hidden bg-[#5f655f] text-white md:min-h-[650px]">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { scale: heroImageScale, y: heroImageY }}
        >
          <Image
            src={portfolio.coverImage.url}
            alt={portfolio.coverImage.alt}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-transparent md:bg-gradient-to-t md:from-[#120f0c] md:via-[#120f0c]/20 md:to-black/20" />
        </motion.div>

        {/* Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {["0%", "25%", "50%", "75%", "100%"].map((line) => (
            <div
              key={line}
              className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/10"
              style={{ left: line }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pb-8 md:px-10 md:pb-12 lg:px-20"
          style={shouldReduceMotion ? undefined : { y: contentY }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="max-w-[950px]"
            >
              <div className="mb-6 flex flex-wrap gap-2">
                <TrustLabel label={portfolio.serviceType} variant="accent" />
                <TrustLabel label={portfolio.resultBadge} variant="accent" />
              </div>
              
              <ScrollReveal
                as="h1"
                enableBlur
                blurStrength={10}
                containerClassName="text-balance text-4xl leading-[1.0] font-medium tracking-tight text-white md:text-6xl lg:text-[80px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {portfolio.title}
              </ScrollReveal>

              {/* Service Outcome Snapshot */}
              <div className="mt-8 flex flex-wrap gap-3">
                <OutcomeItem label="Deposit Secured" />
                <OutcomeItem label="Handover Passed" />
                <OutcomeItem label="Same-Day Ready" />
                <OutcomeItem label="Verified Finish" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="hidden flex-col items-end gap-2 pb-2 md:flex"
            >
              <div className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/50">
                Official Case Study
              </div>
              <div className="text-xl font-medium text-yellow-green">
                Report No. {portfolio.id.slice(-4).toUpperCase()}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Official Report Overview */}
      <section className="bg-wild-sand px-5 py-16 md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-16">
            <MotionEyebrow>Completion Report</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="mb-8 text-2xl font-medium leading-[1.15] tracking-tight text-aztec md:text-5xl"
            >
              {portfolio.resultSummary}
            </ScrollReveal>
            
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-pine-green">The Client Issue</h4>
                <p className="text-lg leading-relaxed text-xanadu">{portfolio.clientIssue}</p>
              </div>
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-pine-green">The Operational Challenge</h4>
                <p className="text-lg leading-relaxed text-xanadu">{portfolio.challenge}</p>
              </div>
            </div>

            <div className="btn-pair">
              <ButtonLink
                href={`/contact?source=Portfolio Report&service=${encodeURIComponent(portfolio.serviceType)}`}
                variant="primary"
                className="px-10"
              >
                Request Similar Result
              </ButtonLink>
              <IconButton
                href={`/contact?source=Portfolio Report&service=${encodeURIComponent(portfolio.serviceType)}`}
                aria-label="Request similar work"
                size="md"
              />
            </div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-16 grid gap-px bg-aztec/10 border border-aztec/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {[
              { icon: MapPin, label: "Property Location", value: portfolio.location },
              { icon: Buildings, label: "Property Type", value: portfolio.propertyType },
              { icon: Flag, label: "Property Size", value: portfolio.propertySize },
              { icon: Clock, label: "Total Duration", value: portfolio.turnaroundTime },
              { icon: Users, label: "Team Deployment", value: portfolio.teamSize },
              { icon: ShieldCheck, label: "Status", value: "Verified Handover" },
            ].map((item) => (
              <div key={item.label} className="bg-white p-6">
                <div className="mb-3 flex items-center gap-2">
                  <item.icon size={16} className="text-pine-green/40" weight="bold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pine-green/60">{item.label}</span>
                </div>
                <p className="text-lg font-medium tracking-tight text-aztec">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Action Checklist & Narrative */}
      <section className="bg-white px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <MotionEyebrow>Methodology</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="mb-8 text-2xl font-medium leading-[1.1] text-aztec md:text-4xl"
              >
                Documenting the restoration process and high-standard finish.
              </ScrollReveal>
              <p className="text-lg leading-relaxed text-xanadu md:text-xl">
                {portfolio.description}
              </p>
              
              <div className="mt-12">
                <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-pine-green">Action Checklist Completed:</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {portfolio.tasksCompleted.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-green/20 text-pine-green">
                        <CheckCircle size={14} weight="fill" />
                      </div>
                      <span className="text-base font-medium text-aztec">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border border-aztec/10 bg-[#f5f5f3] p-8 md:p-10">
                <MotionEyebrow>Handover Note</MotionEyebrow>
                <p className="text-xl font-medium italic leading-relaxed text-aztec">
                  "{portfolio.handoverNotes}"
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {portfolio.trustBadges.map(badge => (
                    <TrustLabel key={badge} label={badge} variant="dark" />
                  ))}
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {portfolio.metrics.map((metric, idx) => (
                  <div 
                    key={idx} 
                    className={`border border-aztec/10 p-6 ${
                      idx === portfolio.metrics.length - 1 && portfolio.metrics.length % 2 !== 0 
                        ? "md:col-span-2" 
                        : ""
                    }`}
                  >
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-pine-green/60">{metric.label}</p>
                    <p className="text-2xl font-medium tracking-tight text-aztec">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentary Evidence Slider */}
      <section className="bg-[#f5f5f3] px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-12 max-w-2xl">
            <MotionEyebrow>Documentary Evidence</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="text-2xl leading-[1.1] text-aztec md:text-4xl"
            >
              Candid proof-of-work: before vs. after handover reset.
            </ScrollReveal>
          </div>

          {beforeImage && afterImage ? (
            <div className="overflow-hidden border border-aztec/10 bg-white p-2 shadow-2xl">
              <BeforeAfterSlider
                beforeImage={beforeImage.url}
                afterImage={afterImage.url}
                beforeAlt="Before state - Documentary evidence"
                afterAlt="After state - Professional finish"
                beforeLabel="Before Restoration"
                afterLabel="Verified Clean"
              />
            </div>
          ) : null}

          {detailImages.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {detailImages.map((image, index) => {
                const aspectRatio = image.width && image.height ? image.width / image.height : 4 / 3;
                return (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden bg-aztec/10"
                    style={{ aspectRatio: `${aspectRatio}` }}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 transition-all translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-green">Detail Insight</p>
                      <p className="mt-2 text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      {/* Public Review Display Board & Feedback */}
      <section className="bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow light>Verified Feedback Wall</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-3xl leading-[1.1] text-white md:text-5xl"
              >
                Property Owner Notes & Landlord Feedback
              </ScrollReveal>
            </div>
            <div className="inline-flex items-center gap-3 border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md">
              <ShieldCheck size={24} className="text-yellow-green" weight="duotone" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Integrity Check</p>
                <p className="text-sm font-medium">All reviews are moderated and verified.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Review Board */}
            <div className="space-y-6">
              {reviews.length ? (
                reviews.map((review, idx) => (
                  <motion.article
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative border-l-2 border-yellow-green bg-white/5 p-8 md:p-10"
                  >
                    <div className="mb-6 flex gap-1 text-yellow-green">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} weight="fill" />
                      ))}
                    </div>
                    <p className="text-xl font-medium leading-relaxed tracking-tight text-white md:text-2xl">
                      "{review.comment}"
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-10 w-10 bg-yellow-green/10 flex items-center justify-center border border-yellow-green/20">
                        <Users size={20} className="text-yellow-green" />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-white">{review.landlordName}</p>
                        <p className="text-xs font-medium text-white/40">{review.company}</p>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="h-full flex flex-col justify-center border border-white/10 bg-white/5 p-12 text-center text-white/40">
                  <Sparkle size={32} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Waiting for first property owner feedback on this project.</p>
                </div>
              )}

            </div>

            {/* Submission Form Area */}
            <div className="flex flex-col gap-6">
              {/* Project Verification Sidebar Block */}
              <div className="h-full border border-white/10 bg-white/5 p-8 md:p-10">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-green text-aztec">
                    <SealCheck size={24} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Official Verification</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Case ID: {portfolio.id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    "Handover Documentation Verified",
                    "Property Inspection Passed",
                    "Safety Standards Maintained",
                    "Post-Clean Audit Completed"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-green/20 text-yellow-green">
                        <CheckCircle size={14} weight="fill" />
                      </div>
                      <span className="text-sm font-medium text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Full-width Submission Form Area */}
          <div className="mt-12 border border-white/10 bg-yellow-green p-1">
            <div className="bg-[#120f0c] p-8 md:p-10">
              <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h3 className="mb-4 text-3xl font-medium tracking-tight text-white">Project Participant?</h3>
                  <p className="text-base leading-relaxed text-white/60">
                    If you were the landlord or property owner for this project, please share your feedback on the handover quality. All submissions are moderated before publishing.
                  </p>
                </div>
              </div>
              <LandlordReviewForm portfolioId={portfolio.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA for conversion */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-6 left-1/2 z-[90] w-[calc(100%-32px)] -translate-x-1/2 md:bottom-8 md:w-auto"
      >
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#120f0c]/90 p-3 shadow-2xl backdrop-blur-2xl md:flex-row md:rounded-full md:p-2">
          <div className="px-6 py-2 text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-green/80">Next Step</p>
            <p className="text-sm font-medium text-white md:text-base">Book a site audit for your property</p>
          </div>
          <ButtonLink 
            href="/contact?source=Sticky Portfolio" 
            variant="primary" 
            className="h-12 w-full rounded-xl px-10 text-sm md:h-11 md:w-auto md:rounded-full"
          >
            Start Project
          </ButtonLink>
        </div>
      </motion.div>
    </>
  );
}
