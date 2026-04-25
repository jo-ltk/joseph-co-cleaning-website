"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  MapPin,
  PhoneCall,
  Quotes,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ScrollReveal from "../../components/ScrollReveal";
import { ButtonLink } from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";

const coverageStats = [
  { value: "4", label: "core regions covered" },
  { value: "Fast", label: "response scheduling" },
  { value: "7 days", label: "availability across routes" },
];

const routePoints = [
  { name: "Somerset", top: "18%", left: "28%", note: "Country homes and design-led residences" },
  { name: "Devon", top: "64%", left: "16%", note: "Coastal homes, retreats and family properties" },
  { name: "Gloucestershire", top: "22%", left: "72%", note: "Cotswold homes and refined commercial spaces" },
  { name: "Bristol", top: "56%", left: "62%", note: "City apartments, offices and managed buildings" },
];

const regions = [
  {
    name: "Somerset",
    strap: "Polished routines for estates, family homes and modern developments.",
    description:
      "Across Bath approaches, market towns and village addresses, Joseph & Co brings a calm, detail-led standard that suits homes where presentation matters every single week.",
    highlight: "Reliable recurring visits with tailored arrival windows and the same premium finish every time.",
    image: "/hero-cleaning-home.jpg",
    alt: "Bright premium home interior prepared to a high standard",
    accent: "bg-[#dfe7d5]",
    align: "left" as const,
    bullets: ["Luxury residential care", "End-of-tenancy precision", "Flexible weekly and fortnightly visits"],
  },
  {
    name: "Devon",
    strap: "A softer, coastal rhythm without losing operational precision.",
    description:
      "From waterfront homes to countryside properties, we adapt our cleaning flow to travel windows, guest turnovers and high-expectation private clients who need consistency without chasing providers.",
    highlight: "Smart scheduling for holiday lets, move-ins, family homes and large-format cleans.",
    image: "/clean-space-living-room.jpg",
    alt: "Curated living room with clean surfaces and natural light",
    accent: "bg-[#ece8de]",
    align: "right" as const,
    bullets: ["Holiday home readiness", "Deep cleans before key moments", "Trusted access for repeat visits"],
  },
  {
    name: "Gloucestershire",
    strap: "Measured, discreet service suited to premium properties and heritage settings.",
    description:
      "Clients across Gloucestershire choose Joseph & Co for teams that understand finish quality, fabric care and the quiet professionalism needed in homes and workplaces where standards are noticed instantly.",
    highlight: "Detail-focused cleaning that respects materials, routines and presentation-sensitive spaces.",
    image: "/equipment-vacuum-cleaning.jpg",
    alt: "Professional cleaning equipment in use inside a refined interior",
    accent: "bg-[#d7e3de]",
    align: "left" as const,
    bullets: ["Respectful around delicate finishes", "Ideal for listed and character properties", "Commercial and residential capability"],
  },
  {
    name: "Bristol",
    strap: "Fast-moving city coverage for homes, offices and managed spaces.",
    description:
      "In Bristol, responsiveness matters as much as polish. Our teams support apartments, shared buildings and busy work environments with dependable communication and a finish that still feels elevated, never rushed.",
    highlight: "Urban responsiveness paired with the same handcrafted Joseph & Co standard.",
    image: "/images/about-story.png",
    alt: "Joseph & Co team member delivering careful premium cleaning service",
    accent: "bg-[#e7eadf]",
    align: "right" as const,
    bullets: ["Quick route access", "Efficient visits for busy schedules", "Clear communication from quote to completion"],
  },
];

const trustReasons = [
  {
    title: "Consistency clients can feel",
    description:
      "The experience stays calm, polished and reliable from the first quote through recurring visits and larger one-off cleans.",
  },
  {
    title: "Professional teams with care built in",
    description:
      "Joseph & Co is chosen for respectful access, close attention to detail and a presentation-first mindset in premium homes and workspaces.",
  },
  {
    title: "Regional reach without diluted standards",
    description:
      "Being active across Somerset, Devon, Gloucestershire and Bristol means broader coverage for clients, while the service still feels personal and considered.",
  },
];

const faqItems = [
  {
    question: "Do you cover both city properties and more rural addresses?",
    answer:
      "Yes. Our routes are designed around a mix of urban and regional appointments, so we regularly support central Bristol properties as well as homes and estates across Somerset, Devon and Gloucestershire.",
  },
  {
    question: "Can I request recurring visits in one of the covered regions?",
    answer:
      "Absolutely. Many clients across these areas book weekly, fortnightly or scheduled specialist visits, with timing tailored around how the property is used.",
  },
  {
    question: "Do you provide one-off deep cleans as well as regular maintenance?",
    answer:
      "Yes. We handle deep cleans, end-of-tenancy preparation, after-builders work and premium recurring cleaning, depending on the property and the level of support needed.",
  },
  {
    question: "How quickly can you respond to quote requests?",
    answer:
      "Response time depends on the property type and location, but the page is designed to show where we already operate so that enquiries from these regions can move quickly into scheduling.",
  },
];

function SectionEyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-4 block text-sm font-semibold uppercase tracking-widest ${light ? "text-yellow-green" : "text-pine-green"}`}
    >
      {children}
    </motion.span>
  );
}

function RegionSpotlight({
  region,
  index,
}: {
  region: (typeof regions)[number];
  index: number;
}) {
  const reverse = region.align === "right";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12"
    >
      <div className={`${reverse ? "lg:order-2 lg:col-span-5" : "lg:col-span-5"}`}>
        <div className="relative overflow-hidden rounded-[28px]">
          <div className={`absolute inset-0 ${region.accent}`} />
          <Image
            src={region.image}
            alt={region.alt}
            width={1200}
            height={900}
            className="relative h-[320px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,32,37,0.04)_0%,rgba(17,32,37,0.26)_100%)]" />
          <div className="absolute bottom-5 left-5 rounded-full bg-white/88 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-aztec backdrop-blur-md">
            {region.name}
          </div>
        </div>
      </div>

      <div className={`${reverse ? "lg:order-1 lg:col-span-7" : "lg:col-span-7"}`}>
        <div className="max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, x: reverse ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-aztec/10 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-xanadu"
          >
            <MapPin size={16} weight="fill" className="text-pine-green" />
            {region.name}
          </motion.div>

          <ScrollReveal
            as="h2"
            enableBlur={true}
            blurStrength={8}
            containerClassName="max-w-[760px] text-2xl leading-[1.1] tracking-tight text-aztec md:text-4xl"
          >
            {region.strap}
          </ScrollReveal>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-5 max-w-[690px] text-base leading-relaxed text-xanadu md:text-lg"
          >
            {region.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-4 max-w-[650px] text-lg font-medium leading-relaxed text-aztec md:text-xl"
          >
            {region.highlight}
          </motion.p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {region.bullets.map((bullet, bulletIndex) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.22 + bulletIndex * 0.08 }}
                className="rounded-[22px] border border-aztec/10 bg-white p-5"
              >
                <CheckCircle size={20} weight="fill" className="mb-3 text-pine-green" />
                <p className="text-sm leading-relaxed text-aztec md:text-base">{bullet}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function AreasWeCoverPage() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <main className="relative bg-[#120f0c]">
      <Navbar />

      <section className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden bg-[#5c645d] text-white md:min-h-[600px]">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={shouldReduceMotion ? undefined : { scale: heroImageScale, y: heroImageY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: 'url("/hero-cleaning-home.jpg")' }} 
          />
          <div className="absolute inset-0 bg-black/25 md:bg-transparent md:bg-gradient-to-t md:from-black/50 md:via-transparent md:to-black/20" />
        </motion.div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none md:hidden">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
        </div>
        <div className="absolute inset-0 hidden pointer-events-none md:block">
          {["0%", "25%", "50%", "75%", "100%"].map((line) => (
            <div key={line} className="absolute top-0 h-full w-px -translate-x-1/2 bg-white/18" style={{ left: line }} />
          ))}
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pb-4 md:px-10 md:pb-5 lg:px-20"
          style={shouldReduceMotion ? undefined : { y: contentY }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
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
                Premium cleaning coverage shaped around how the South West actually lives.
              </ScrollReveal>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-[720px] text-lg font-medium leading-relaxed text-white/88 md:text-xl"
              >
                Joseph & Co supports homes, apartments, offices and high-expectation properties across Somerset, Devon, Gloucestershire and Bristol with service that feels precise, calm and deeply considered.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <div className="btn-pair">
                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                    <ButtonLink href="/contact" variant="primary" className="px-8">
                      Request A Quote
                    </ButtonLink>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, rotate: 3 }} whileTap={{ scale: 0.96 }}>
                    <IconButton href="/contact" aria-label="Request a quote" size="md" />
                  </motion.div>
                </div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <ButtonLink
                    href="/services"
                    variant="secondary"
                    className="border border-white/12 bg-white/12 px-8 !text-white backdrop-blur-md hover:bg-white/18"
                  >
                    Explore Services
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="hidden md:block pb-2"
            >
              <div 
                className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white cursor-default"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Areas We Cover
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="bg-wild-sand px-5 py-20 text-aztec md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionEyebrow>Local Reach</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="max-w-[640px] text-2xl leading-[1.1] text-aztec md:text-4xl"
            >
              Coverage designed for properties that expect more than a basic service radius.
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="lg:col-span-7"
          >
            <p className="max-w-[760px] text-lg font-medium leading-relaxed text-xanadu md:text-xl">
              This page is not a list of postcodes. It is a clearer picture of where Joseph & Co already works well: regions where reliability, route planning, presentation standards and responsive communication all matter to the client experience.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative overflow-hidden rounded-[28px] bg-[#dfe4da] p-4 md:p-5">
                <Image
                  src="/images/team-stats.png"
                  alt="Joseph & Co team image representing trusted regional service coverage"
                  width={900}
                  height={900}
                  className="h-[360px] w-full rounded-[22px] object-cover md:h-[430px]"
                />
                <div className="absolute bottom-9 left-9 max-w-[220px] rounded-[20px] bg-white/92 p-5 shadow-[0_24px_70px_rgba(17,32,37,0.12)] backdrop-blur-md">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-pine-green">
                    Fast Response
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-aztec">
                    Cleaners routed around active service areas for smoother booking and dependable follow-through.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] bg-white p-6 shadow-[0_28px_80px_rgba(17,32,37,0.08)] md:p-8">
                  <Clock size={22} weight="fill" className="text-pine-green" />
                  <h3 className="mt-5 text-xl leading-[1.1] text-aztec md:text-2xl">Responsive scheduling</h3>
                  <p className="mt-3 text-base leading-relaxed text-xanadu">
                    Quote requests from covered regions move more smoothly into site visits, one-off bookings and recurring plans.
                  </p>
                </div>
                <div className="rounded-[28px] bg-[#112025] p-6 text-white md:p-8">
                  <ShieldCheck size={22} weight="fill" className="text-yellow-green" />
                  <h3 className="mt-5 text-xl leading-[1.1] md:text-2xl">Trusted local continuity</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/68">
                    The same premium service language carries from county to county, so clients get reassurance without a generic chain-service feel.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-yellow-green/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-pine-green/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionEyebrow light={true}>Coverage Story</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="max-w-[560px] text-2xl leading-[1.1] text-white md:text-4xl"
            >
              A visual footprint built around real routes, not generic radius marketing.
            </ScrollReveal>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-[520px] text-base leading-relaxed text-white/70 md:text-lg"
            >
              Somerset, Devon, Gloucestershire and Bristol each ask for something slightly different. The page expresses that through one connected service map, showing regional character without fragmenting the Joseph & Co standard.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-8 flex items-center gap-4"
            >
              <ButtonLink href="/contact" variant="primary" className="px-8">
                Request Visit
              </ButtonLink>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/76 transition-colors hover:text-white"
              >
                <PhoneCall size={18} weight="fill" className="text-yellow-green" />
                Speak To Joseph & Co
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top,#243239_0%,#161513_58%,#0f0d0b_100%)] p-6 md:p-8">
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/images/topo-bg.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[460px] rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)]">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M27 20 C38 25, 54 28, 62 48 S72 72, 82 78"
                    fill="none"
                    stroke="rgba(199,233,147,0.75)"
                    strokeWidth="0.55"
                    strokeDasharray="2.4 2.4"
                  />
                  <path
                    d="M28 20 C22 30, 18 40, 17 63"
                    fill="none"
                    stroke="rgba(1,119,117,0.8)"
                    strokeWidth="0.55"
                    strokeDasharray="2.4 2.4"
                  />
                  <path
                    d="M17 63 C28 62, 44 60, 62 56"
                    fill="none"
                    stroke="rgba(255,255,255,0.24)"
                    strokeWidth="0.4"
                    strokeDasharray="2.2 2.2"
                  />
                </svg>

                {routePoints.map((point, index) => (
                  <motion.div
                    key={point.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.12 + index * 0.08 }}
                    className="absolute"
                    style={{ top: point.top, left: point.left }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-green/10 blur-2xl" />
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.16, 1] }}
                      transition={shouldReduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.22 }}
                      className="relative flex h-4 w-4 items-center justify-center rounded-full border border-yellow-green/60 bg-yellow-green"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-aztec" />
                    </motion.div>
                    <div className="mt-4 w-[220px] rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-yellow-green">
                        {point.name}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/72">{point.note}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="absolute bottom-6 right-6 max-w-[240px] rounded-[22px] border border-white/10 bg-black/20 p-5 backdrop-blur-md">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-yellow-green">
                    Local Reliability
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/72">
                    Regional coverage means cleaner routes, steadier communication and a better chance of continuity for repeat clients.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-wild-sand px-5 py-20 text-aztec md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-10 max-w-[780px] md:mb-16">
            <SectionEyebrow>Regional Spotlights</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl leading-[1.1] text-aztec md:text-4xl"
            >
              Each area feels distinct, but the service language stays unmistakably Joseph & Co.
            </ScrollReveal>
          </div>

          <div className="space-y-16 md:space-y-24">
            {regions.map((region, index) => (
              <RegionSpotlight key={region.name} region={region} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionEyebrow>Why Clients Trust Us</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="max-w-[560px] text-2xl leading-[1.1] text-aztec md:text-4xl"
            >
              Trusted across these regions because the experience feels considered from first contact to final detail.
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-8 overflow-hidden rounded-[30px] bg-[#eef1ea] p-5 md:p-6"
            >
              <div className="relative overflow-hidden rounded-[24px]">
                <Image
                  src="/images/about-hero.png"
                  alt="Joseph & Co premium service delivery"
                  width={1200}
                  height={900}
                  className="h-[320px] w-full object-cover md:h-[380px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,32,37,0.02)_0%,rgba(17,32,37,0.34)_100%)]" />
              </div>
              <div className="mt-5 rounded-[22px] bg-white p-5 shadow-[0_18px_50px_rgba(17,32,37,0.08)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-green text-aztec">
                    <Quotes size={18} weight="fill" />
                  </div>
                  <p className="text-base leading-relaxed text-aztec md:text-lg">
                    Clients are not just looking for someone who can clean the property. They want someone they can trust with the rhythm, presentation and reliability around it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            {trustReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="grid gap-5 rounded-[28px] border border-aztec/8 bg-[#f7f7f4] p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 md:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aztec text-yellow-green">
                  <CheckCircle size={20} weight="fill" />
                </div>
                <div>
                  <h3 className="text-xl leading-[1.1] text-aztec md:text-2xl">{reason.title}</h3>
                  <p className="mt-3 max-w-[640px] text-base leading-relaxed text-xanadu">
                    {reason.description}
                  </p>
                </div>
                <ArrowUpRight size={22} className="hidden text-aztec/28 md:block" />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-2 rounded-[30px] bg-[#112025] p-6 text-white md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-yellow-green">
                    Request Quote
                  </p>
                  <p className="mt-3 max-w-[640px] text-lg leading-relaxed text-white/78">
                    Tell us where the property is, what kind of support you need and how often you want the space cared for. We will shape the next step around your area and your expectations.
                  </p>
                </div>
                <div className="btn-pair">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <ButtonLink href="/contact" variant="primary">
                      Start Request
                    </ButtonLink>
                  </motion.div>
                  <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
                    <IconButton href="/contact" aria-label="Start your quote request" size="md" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-wild-sand px-5 py-20 text-aztec md:px-10 md:py-24 lg:px-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-10 max-w-[720px] md:mb-16">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl leading-[1.1] text-aztec md:text-4xl"
            >
              Practical questions clients ask when enquiring from our covered regions.
            </ScrollReveal>
          </div>

          <div className="rounded-[32px] border border-aztec/8 bg-white px-5 py-2 shadow-[0_28px_70px_rgba(17,32,37,0.06)] md:px-8">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={item.question} className="border-b border-aztec/8 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-start gap-4 py-6 text-left md:gap-6 md:py-8"
                  >
                    <div className="flex-1">
                      <h3 className="text-base leading-[1.1] text-aztec md:text-2xl">{item.question}</h3>
                      <div
                        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                          isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-[900px] text-sm leading-relaxed text-xanadu md:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aztec/5 text-aztec md:h-12 md:w-12">
                      <span className="text-2xl font-extralight leading-none">{isOpen ? "-" : "+"}</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-aztec px-5 py-24 text-white md:px-10 lg:px-20">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-yellow-green/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-pine-green/10 blur-[150px]" />

        <div className="relative mx-auto max-w-[1450px]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionEyebrow light={true}>Closing CTA</SectionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur={true}
                blurStrength={10}
                containerClassName="max-w-[780px] text-balance text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl"
              >
                If your property sits within our reach, the finish should feel exceptional from day one.
              </ScrollReveal>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.16 }}
                className="mt-6 max-w-[620px] text-lg leading-relaxed text-white/72"
              >
                Request a quote for Somerset, Devon, Gloucestershire or Bristol and we will shape the right service around your property, your timing and the level of care you expect.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <div className="btn-pair">
                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                    <ButtonLink href="/contact" variant="primary" className="px-8">
                      Book Quote
                    </ButtonLink>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, rotate: 3 }} whileTap={{ scale: 0.96 }}>
                    <IconButton href="/contact" aria-label="Book quote" size="md" />
                  </motion.div>
                </div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <ButtonLink
                    href="/services"
                    variant="secondary"
                    className="border border-white/10 bg-white/10 px-8 !text-white hover:bg-white/16"
                  >
                    View Services
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/6 p-4 backdrop-blur-md md:p-5">
                <Image
                  src="/images/cta-overlap.png"
                  alt="Joseph & Co closing call to action visual"
                  width={1400}
                  height={900}
                  className="h-auto w-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
