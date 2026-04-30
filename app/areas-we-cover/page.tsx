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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
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
      className={`flex flex-col gap-10 lg:gap-16 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} lg:items-center`}
    >
      <div className="w-full shrink-0 lg:w-[48%]">
        <div className={`group relative overflow-hidden bg-[#eef1ea] shadow-[0_20px_60px_rgba(17,32,37,0.08)] ${reverse ? "rounded-[40px] rounded-tl-[120px]" : "rounded-[40px] rounded-tr-[120px]"}`}>
          <Image
            src={region.image}
            alt={region.alt}
            width={1200}
            height={1200}
            quality={100}
            className="relative h-[400px] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 md:h-[580px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,32,37,0.0)_0%,rgba(17,32,37,0.3)_100%)] pointer-events-none transition-opacity duration-700 group-hover:opacity-70" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
            <div className="inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-pine-green shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
              {region.name}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-pine-green">
              <ArrowUpRight size={20} weight="bold" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[52%]">
        <div className={`max-w-[680px] ${reverse ? "lg:ml-auto lg:pr-12" : "lg:pl-12"}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-pine-green/15 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-pine-green shadow-sm"
          >
            <MapPin size={16} weight="fill" />
            {region.name} Coverage
          </motion.div>

          <ScrollReveal
            as="h2"
            enableBlur={true}
            blurStrength={8}
            containerClassName="mb-6 text-3xl font-medium leading-[1.12] tracking-tight text-aztec md:text-5xl"
          >
            {region.strap}
          </ScrollReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mb-8 text-lg leading-relaxed text-xanadu md:text-xl"
          >
            {region.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="relative mb-10 overflow-hidden rounded-[28px] border border-aztec/5 bg-white p-6 shadow-[0_10px_40px_rgba(17,32,37,0.04)] md:p-8"
          >
            <div className="absolute left-0 top-0 h-full w-1.5 bg-yellow-green" />
            <p className="text-xl font-medium leading-relaxed text-pine-green">
              {region.highlight}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {region.bullets.map((bullet, bulletIndex) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.22 + bulletIndex * 0.08 }}
                className="flex items-center gap-2.5 rounded-full border border-aztec/10 bg-white px-5 py-3 shadow-[0_4px_15px_rgba(17,32,37,0.03)] transition-colors hover:border-pine-green/30"
              >
                <CheckCircle size={18} weight="fill" className="text-pine-green" />
                <p className="text-sm font-medium text-aztec">{bullet}</p>
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
            style={{ backgroundImage: 'url("/images/areas-hero.png")' }} 
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
                Premium Coverage Across the South West
              </ScrollReveal>
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

      <section className="bg-wild-sand px-5 py-20 md:px-10 md:py-32 lg:px-20 overflow-hidden">
        <div className="mx-auto max-w-[1450px]">
          <div className="flex flex-col gap-4">
            
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
              {/* Text Card */}
              <div className="lg:w-[60%] rounded-[32px] bg-white p-8 md:p-12 lg:p-14 flex flex-col justify-center shadow-[0_20px_60px_rgba(17,32,37,0.05)]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block bg-[#eef1ea] text-pine-green px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] mb-8">
                    Local Reach
                  </span>
                </motion.div>
                <ScrollReveal
                  as="h2"
                  enableBlur={true}
                  blurStrength={8}
                  containerClassName="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-aztec mb-6 max-w-2xl"
                >
                  Coverage designed for properties that expect more.
                </ScrollReveal>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-lg md:text-xl text-xanadu leading-relaxed max-w-2xl mb-10"
                >
                  This is not a list of postcodes. It is a clearer picture of where Joseph & Co works best: regions where reliability, presentation standards, and responsive communication matter.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <ButtonLink href="/contact?source=Areas We Cover" variant="primary" className="px-8 w-fit">
                    Discover coverage
                  </ButtonLink>
                </motion.div>
              </div>

              {/* Image 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:w-[20%] rounded-[32px] overflow-hidden relative min-h-[350px] shadow-[0_20px_60px_rgba(17,32,37,0.05)]"
              >
                <Image src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80" fill className="object-cover transition-transform duration-1000 hover:scale-105" alt="Premium cleaning service" />
              </motion.div>

              {/* Image 2 */}
              <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.3 }}
  className="lg:w-[20%] rounded-[32px] overflow-hidden relative min-h-[350px] shadow-[0_20px_60px_rgba(17,32,37,0.05)]"
>
  <Image 
    // UPDATED: High-quality, reliable link for an immaculate living space
    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop" 
    fill 
    className="object-cover transition-transform duration-1000 hover:scale-105" 
    alt="Immaculate living space" 
  />
</motion.div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
              
              {/* Dark Image Card with Pills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:w-[40%] rounded-[32px] bg-[#112025] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden min-h-[350px] shadow-[0_20px_60px_rgba(17,32,37,0.08)]"
              >
                <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80" fill className="object-cover opacity-50 transition-transform duration-1000 hover:scale-105" alt="Joseph & Co team" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="relative z-10 flex flex-col justify-end h-full mt-24">
                  <h3 className="text-2xl md:text-3xl font-medium leading-[1.1] mb-6">
                    Fast response times & trusted continuity.
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-white/90 backdrop-blur-sm text-aztec px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm">Somerset</span>
                    <span className="bg-white/90 backdrop-blur-sm text-aztec px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm">Devon</span>
                    <span className="bg-white/90 backdrop-blur-sm text-aztec px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm">Bristol</span>
                  </div>
                </div>
              </motion.div>

              {/* Stats & Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:w-[60%] rounded-[32px] bg-[#eef1ea] p-8 md:p-12 flex flex-col justify-between shadow-[0_20px_60px_rgba(17,32,37,0.03)]"
              >
                <div>
                  <h3 className="text-3xl md:text-5xl font-medium text-aztec mb-5 tracking-tight leading-[1.05] max-w-[800px]">
                    Responsive scheduling across our core regions.
                  </h3>
                  <p className="text-xanadu text-lg md:text-xl max-w-2xl leading-relaxed">
                    The same premium service language carries from county to county, ensuring clients get reassurance without a generic chain-service feel.
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-pine-green/10">
                  <div>
                    <div className="text-3xl md:text-4xl font-medium text-pine-green mb-2 tracking-tight">4</div>
                    <div className="text-xs md:text-sm font-medium uppercase tracking-[0.1em] text-xanadu">Core Regions</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-medium text-pine-green mb-2 tracking-tight">Fast</div>
                    <div className="text-xs md:text-sm font-medium uppercase tracking-[0.1em] text-xanadu">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-medium text-pine-green mb-2 tracking-tight">100%</div>
                    <div className="text-xs md:text-sm font-medium uppercase tracking-[0.1em] text-xanadu">Continuity</div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#120f0c] px-5 py-20 text-white md:px-10 md:py-32 lg:px-20">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-yellow-green/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-pine-green/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center xl:gap-12">
          <div>
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 grid max-w-[560px] grid-cols-2 gap-3"
            >
              {[
                ["4", "Core regions"],
                ["Fast", "response guidance"],
                ["Local", "route planning"],
                ["Premium", "service continuity"],
              ].map(([value, label]) => (
                <div key={label} className="border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-medium leading-[1.1] tracking-tight text-yellow-green md:text-3xl">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/48">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <ButtonLink href="/contact?source=Areas We Cover" variant="primary" className="px-8">
                Request Visit
              </ButtonLink>
              <a
                href="/contact?source=Areas We Cover"
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
            className="min-w-0"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,#243239_0%,#161513_58%,#0f0d0b_100%)] p-4 md:p-5">
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/images/topo-bg.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_100%)] p-4 md:p-6">
                <div className="absolute left-7 top-7 hidden h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-yellow-green/0 via-yellow-green/30 to-yellow-green/0 md:block" />
                <div className="absolute left-7 top-7 hidden h-[32%] w-px bg-pine-green md:block" />
                <div className="absolute bottom-0 right-0 h-56 w-56 translate-x-1/4 translate-y-1/4 rounded-full bg-yellow-green/8 blur-[90px]" />

                <div className="relative z-10 mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#c7e993]">
                      Route Ledger
                    </p>
                    <h3 className="mt-2 max-w-[460px] text-xl font-medium leading-[1.1] tracking-tight text-white md:text-2xl">
                      Four service regions connected by one Joseph & Co standard.
                    </h3>
                  </div>
                  <p className="max-w-[220px] text-sm font-medium leading-relaxed text-white/55 md:text-right">
                    Planned routes, steadier communication, cleaner continuity.
                  </p>
                </div>

                <div className="relative z-10 grid gap-3">
                  {[
                  {
                    name: "Somerset",
                    note: "Country homes and design-led residences",
                    meta: "01",
                    className: "",
                  },
                  {
                    name: "Gloucestershire",
                    note: "Cotswold homes and refined commercial spaces",
                    meta: "02",
                    className: "md:ml-8",
                  },
                  {
                    name: "Devon",
                    note: "Coastal homes, retreats and family properties",
                    meta: "03",
                    className: "",
                  },
                  {
                    name: "Local Reliability",
                    note: "Cleaner routes, steadier communication and better continuity for repeat clients.",
                    meta: "04",
                    className: "md:ml-8",
                  }
                ].map((point, index) => (
                  <motion.div
                    key={point.name}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.58, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative grid gap-4 rounded-[18px] border border-white/10 bg-[#3d403d]/88 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-yellow-green/22 hover:bg-[#444742]/92 md:grid-cols-[auto_1fr_auto] md:items-center md:p-5 ${point.className}`}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1] }}
                      transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-green/20 bg-[#c7e993] text-[0.7rem] font-bold tracking-[0.12em] text-aztec shadow-[0_0_28px_rgba(199,233,147,0.22)]"
                    >
                      {point.meta}
                    </motion.div>
                    <motion.div
                      animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
                      transition={shouldReduceMotion ? undefined : { duration: 5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <p className="mb-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#c7e993]">
                        {point.name}
                      </p>
                      <p className="max-w-[520px] text-[0.95rem] font-medium leading-relaxed tracking-tight text-white/88 md:text-[0.98rem]">
                        {point.note}
                      </p>
                    </motion.div>
                    <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/6 text-yellow-green transition duration-300 group-hover:bg-yellow-green group-hover:text-aztec md:flex">
                      <ArrowUpRight size={17} weight="bold" />
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-wild-sand px-5 py-20 text-aztec md:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-16 max-w-[860px] md:mb-24">
            <SectionEyebrow>Regional Spotlights</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-3xl leading-[1.05] tracking-tight text-aztec md:text-5xl lg:text-[56px] font-medium mt-4"
            >
              Each area feels distinct, but the service language stays unmistakably Joseph & Co.
            </ScrollReveal>
          </div>

          <div className="space-y-24 md:space-y-32">
            {regions.map((region, index) => (
              <RegionSpotlight key={region.name} region={region} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 text-aztec md:px-10 md:py-16 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="flex h-full flex-col lg:col-span-5">
            <SectionEyebrow>Why Clients Trust Us</SectionEyebrow>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="max-w-[560px] text-2xl leading-[1.1] text-aztec md:text-[2rem]"
            >
              Trusted across these regions because the experience feels considered from first contact to final detail.
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 flex flex-1 flex-col overflow-hidden rounded-[24px] bg-[#eef1ea] p-4 md:p-5"
            >
              <div className="relative flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="https://images.unsplash.com/photo-1627634777217-c864268db30c?w=1200&q=80"
                  alt="Joseph & Co premium service delivery"
                  width={1200}
                  height={900}
                  className="h-full min-h-[180px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,32,37,0.02)_0%,rgba(17,32,37,0.34)_100%)]" />
              </div>
              <div className="mt-4 rounded-[18px] bg-white p-4 shadow-[0_18px_50px_rgba(17,32,37,0.08)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-green text-aztec">
                    <Quotes size={16} weight="fill" />
                  </div>
                  <p className="text-sm leading-relaxed text-aztec md:text-base">
                    Clients are not just looking for someone who can clean the property. They want someone they can trust with the rhythm, presentation and reliability around it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex h-full flex-col gap-3 lg:col-span-7">
            {trustReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="grid shrink-0 gap-4 rounded-[24px] border border-aztec/8 bg-[#f7f7f4] p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-5 md:px-7 md:py-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aztec text-yellow-green">
                  <CheckCircle size={18} weight="fill" />
                </div>
                <div>
                  <h3 className="text-lg leading-[1.1] text-aztec md:text-xl">{reason.title}</h3>
                  <p className="mt-2 max-w-[640px] text-sm leading-relaxed text-xanadu">
                    {reason.description}
                  </p>
                </div>
                <ArrowUpRight size={20} className="hidden text-aztec/28 md:block" />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-1 flex flex-1 flex-col justify-center rounded-[24px] bg-[#112025] p-5 text-white md:px-7 md:py-6"
            >
              <div className="grid w-full gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-green">
                    Request Quote
                  </p>
                  <p className="mt-2 max-w-[640px] text-base leading-relaxed text-white/78">
                    Tell us where the property is, what kind of support you need and how often you want the space cared for. We will shape the next step around your area and your expectations.
                  </p>
                </div>
                <div className="btn-pair">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <ButtonLink href="/contact?source=Areas We Cover" variant="primary" className="py-2.5 px-6 text-sm">
                      Start Request
                    </ButtonLink>
                  </motion.div>
                  <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
                    <IconButton href="/contact?source=Areas We Cover" aria-label="Start your quote request" size="md" className="h-[42px] w-[42px]" />
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

      <section className="relative overflow-hidden bg-aztec py-12 text-white">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-yellow-green/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-pine-green/10 blur-[150px]" />

        <div className="relative w-full">
          <div className="relative w-full overflow-hidden">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/areas-closing.png"
                alt=""
                fill
                className="object-cover blur-[2px] scale-105 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-aztec/60 via-aztec/40 to-aztec/60" />
            </div>

            {/* Content Layered on Top */}
            <div className="relative z-10 flex flex-col items-center px-6 py-8 md:py-14 text-center">
              <SectionEyebrow light={true}>Closing CTA</SectionEyebrow>
              <ScrollReveal
                as="h2"
                enableBlur={true}
                blurStrength={10}
                containerClassName="max-w-[950px] text-balance text-4xl leading-[1.05] text-white md:text-6xl lg:text-7xl mx-auto"
              >
                If your property sits within our reach, the finish should feel exceptional from day one.
              </ScrollReveal>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.16 }}
                className="mt-8 max-w-[680px] text-lg leading-relaxed text-white/85 mx-auto font-medium"
              >
                Request a quote for Somerset, Devon, Gloucestershire or Bristol and we will shape the right service around your property, your timing and the level of care you expect.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center justify-center"
              >
                <div className="btn-pair">
                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                    <ButtonLink href="/contact?source=Areas We Cover" variant="primary" className="px-12">
                      Book Quote
                    </ButtonLink>
                  </motion.div>
                  <motion.div whileHover={{ y: -3, rotate: 3 }} whileTap={{ scale: 0.96 }}>
                    <IconButton href="/contact?source=Areas We Cover" aria-label="Book quote" size="md" />
                  </motion.div>
                </div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <ButtonLink
                    href="/services"
                    variant="secondary"
                    className="border border-white/20 bg-white/10 px-12 !text-white backdrop-blur-md hover:bg-white/20"
                  >
                    View Services
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
