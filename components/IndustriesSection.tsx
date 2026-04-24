"use client";

import { motion } from "framer-motion";
import { HardDrives, Cloud, Factory, Wind } from "@phosphor-icons/react/dist/ssr";

import ScrollReveal from "./ScrollReveal";

const industries = [
  { title: "Corporate Offices", summary: "Maintain a professional and healthy workspace with our comprehensive commercial cleaning solutions.", icon: <HardDrives size={64} weight="light" /> },
  { title: "Luxury Residential", summary: "Detailed care for high-end homes, ensuring every corner reflects the elegance of your living space.", icon: <Cloud size={64} weight="light" /> },
  { title: "Retail & Showrooms", summary: "Create an inviting atmosphere for your customers with pristine floors and spotless displays.", icon: <Factory size={64} weight="light" /> },
  { title: "Post-Construction", summary: "Final touch cleaning that transforms construction sites into move-in ready, immaculate properties.", icon: <Wind size={64} weight="light" /> },
];

function IndustryCard({ title, summary, icon }: { title: string; summary: string; icon: React.ReactNode }) {
  return (
    <article className="group relative min-h-[260px] md:min-h-[360px] overflow-hidden bg-aztec/5 transition-colors duration-300 ease-out hover:bg-yellow-green">
      <button type="button" aria-label={`Expand ${title}`} className="absolute right-4 top-4 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-aztec/10 text-2xl font-light leading-none text-aztec transition-colors duration-300 group-hover:bg-aztec/20">
        <span className="-mt-1 transition-transform duration-300 ease-out group-hover:rotate-45">+</span>
      </button>
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-[40%] flex-col items-start md:items-center px-6 md:px-8 text-left md:text-center text-aztec transition-all duration-300 ease-out group-hover:translate-y-[-2rem] group-hover:opacity-0">
        <div className="flex h-[72px] md:h-[92px] items-center justify-start md:justify-center text-xanadu">{icon}</div>
        <h3 className="mt-4 md:mt-6 max-w-[260px] text-xl md:text-2xl leading-[1.1] font-medium tracking-tight text-aztec">{title}</h3>
        <p className="mt-2 md:mt-3 text-sm text-aztec/70 max-w-[280px] line-clamp-2">{summary}</p>
      </div>
      <div className="absolute inset-0 z-10 flex items-center px-6 md:px-10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
        <div className="max-w-[330px] text-aztec">
          <p className="inline-block bg-aztec px-4 py-2 font-sans text-sm font-semibold uppercase tracking-widest text-yellow-green">Overview:</p>
          <p className="mt-6 md:mt-8 font-sans text-base leading-relaxed text-aztec/80">{summary}</p>
        </div>
      </div>
    </article>
  );
}

export default function IndustriesSection() {
  return (
    <section className="bg-wild-sand pb-16 md:pb-24 pt-0 px-5 md:px-10 lg:px-20 text-aztec">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
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
  From luxury residences to corporate headquarters, our specialized teams deliver tailored cleaning solutions for every environment.
</motion.p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <IndustryCard key={industry.title} title={industry.title} summary={industry.summary} icon={industry.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}