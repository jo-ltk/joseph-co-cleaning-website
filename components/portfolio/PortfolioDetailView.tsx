"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import {
  Buildings,
  ClockCountdown,
  MapPin,
  SealCheck,
  Sparkle,
  Star,
} from "@phosphor-icons/react/dist/ssr";

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

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<any>;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-aztec/10 bg-[#f5f5f3] p-5 md:p-6">
      <Icon size={20} className="mb-6 text-pine-green" weight="duotone" />
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-pine-green">
        {label}
      </p>
      <p className="text-base font-medium leading-relaxed tracking-tight text-aztec md:text-lg">
        {value}
      </p>
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
  const beforeImage = getPortfolioBeforeImage(portfolio);
  const afterImage = getPortfolioAfterImage(portfolio);
  const detailImages = getPortfolioDetailImages(portfolio);

  return (
    <>
      <section className="relative flex min-h-[620px] items-end overflow-hidden bg-[#5f655f] text-white md:min-h-[760px]">
        <Image
          src={portfolio.coverImage.url}
          alt={portfolio.coverImage.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/90 via-[#120f0c]/34 to-[#120f0c]/18" />
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
            <div className="max-w-[880px]">
              <MotionEyebrow light>{portfolio.serviceType}</MotionEyebrow>
              <ScrollReveal
                as="h1"
                enableBlur
                blurStrength={10}
                containerClassName="max-w-[820px] text-balance text-3xl leading-[1.0] text-white md:text-6xl lg:text-[78px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {portfolio.title}
              </ScrollReveal>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/72 md:text-xl"
              >
                {portfolio.resultSummary}
              </motion.p>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="grid gap-3"
            >
              <div className="border border-white/10 bg-black/15 p-5 backdrop-blur-sm md:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-green">
                  Location
                </p>
                <p className="text-lg font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                  {portfolio.location}
                </p>
              </div>
              <div className="border border-white/10 bg-black/15 p-5 backdrop-blur-sm md:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-green">
                  Completion
                </p>
                <p className="text-lg font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                  {format(new Date(portfolio.completionDate), "dd MMMM yyyy")}
                </p>
              </div>
              <div className="border border-white/10 bg-black/15 p-5 backdrop-blur-sm md:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-green">
                  Turnaround
                </p>
                <p className="text-lg font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                  {portfolio.turnaroundTime}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <MotionEyebrow>Case Study Narrative</MotionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="mb-6 max-w-3xl text-xl leading-[1.1] text-aztec md:text-4xl"
            >
              Premium cleaning work documented as a before, during, and after story.
            </ScrollReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-3xl text-lg font-medium leading-relaxed text-xanadu md:text-xl"
            >
              {portfolio.description}
            </motion.p>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            <MetaItem icon={Buildings} label="Service Type" value={portfolio.serviceType} />
            <MetaItem icon={MapPin} label="Location" value={portfolio.location} />
            <MetaItem icon={ClockCountdown} label="Turnaround" value={portfolio.turnaroundTime} />
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1450px] gap-4 md:grid-cols-3">
          {portfolio.metrics.map((metric, index) => (
            <motion.article
              key={`${metric.label}-${metric.value}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="border border-aztec/10 bg-[#f5f5f3] p-6 md:p-8"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-pine-green">
                {metric.label}
              </p>
              <h3 className="text-2xl font-medium leading-[1.05] tracking-tight text-aztec md:text-4xl">
                {metric.value}
              </h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f5f3] px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow>Before And After</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-2xl leading-[1.1] text-aztec md:text-4xl"
              >
                The visual proof behind the finished result.
              </ScrollReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-xanadu md:text-lg"
            >
              The case study keeps the contrast honest: what the space felt like before, what changed during the clean, and how it landed at handover.
            </motion.p>
          </div>

          {beforeImage && afterImage ? (
            <BeforeAfterSlider
              beforeImage={beforeImage.url}
              afterImage={afterImage.url}
              beforeLabel="Before"
              afterLabel="After"
            />
          ) : null}

          {detailImages.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {detailImages.map((image, index) => (
                <motion.article
                  key={`${image.url}-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className={`relative overflow-hidden bg-[#d9d9d2] ${
                    index === 0 ? "md:col-span-2 md:min-h-[440px]" : "min-h-[300px]"
                  }`}
                >
                  <Image src={image.url} alt={image.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/72 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-yellow-green">
                      Detail View
                    </p>
                    <p className="mt-3 max-w-md text-lg font-medium leading-relaxed tracking-tight text-white">
                      {image.alt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow>Result Highlights</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-2xl leading-[1.1] text-aztec md:text-4xl"
              >
                The finish was designed for inspection, confidence, and next-step readiness.
              </ScrollReveal>
            </div>
            <div className="btn-pair">
              <ButtonLink
                href={`/contact?source=Portfolio Detail&service=${encodeURIComponent(portfolio.serviceType)}`}
                variant="primary"
                className="px-8"
              >
                Request Similar Work
              </ButtonLink>
              <IconButton
                href={`/contact?source=Portfolio Detail&service=${encodeURIComponent(portfolio.serviceType)}`}
                aria-label="Request similar work"
                size="md"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Sparkle,
                title: "Result Summary",
                body: portfolio.resultSummary,
              },
              {
                icon: SealCheck,
                title: "Completion Standard",
                body: `${portfolio.serviceType} delivered in ${portfolio.turnaroundTime.toLowerCase()}.`,
              },
              {
                icon: Star,
                title: "Handover Use Case",
                body: "Photographs, tenant transitions, landlord inspections, and snag-free revisits were all considered in the finishing sequence.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="border border-aztec/10 bg-[#f5f5f3] p-6 md:p-8"
                >
                  <Icon size={24} className="mb-8 text-pine-green" weight="duotone" />
                  <h3 className="mb-4 text-xl font-medium leading-[1.1] tracking-tight text-aztec md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-xanadu">{item.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <MotionEyebrow light>Landlord Testimonials</MotionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur
                blurStrength={8}
                containerClassName="text-2xl leading-[1.1] text-white md:text-4xl"
              >
                Approved trust signals connected to this exact project.
              </ScrollReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-white/60 md:text-lg"
            >
              Reviews stay private until moderation approves them, which keeps the portfolio grounded in real, attributable property feedback.
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4">
              {reviews.length ? (
                reviews.map((review, index) => (
                  <motion.article
                    key={review.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.65, delay: index * 0.08 }}
                    className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
                  >
                    <div className="mb-5 flex items-center gap-2 text-yellow-green">
                      {Array.from({ length: review.rating }).map((_, starIndex) => (
                        <Star key={starIndex} size={16} weight="fill" />
                      ))}
                    </div>
                    <p className="mb-6 text-lg font-medium leading-relaxed tracking-tight text-white md:text-xl">
                      {review.comment}
                    </p>
                    <div className="text-sm font-semibold uppercase tracking-widest text-white/52">
                      <span className="text-yellow-green">{review.landlordName}</span>
                      <span className="mx-2 text-white/28">/</span>
                      <span>{review.company}</span>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="border border-white/10 bg-white/5 p-6 text-white/60 md:p-8">
                  Approved project reviews will appear here once the first landlord submissions have been moderated.
                </div>
              )}
            </div>

            <LandlordReviewForm portfolioId={portfolio.id} />
          </div>
        </div>
      </section>
    </>
  );
}
