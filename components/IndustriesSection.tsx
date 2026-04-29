"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HardDrives, Cloud, Factory, Wind, Tree } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

const industries = [
  {
    title: "Corporate Offices",
    summary: "Maintain a professional and healthy workspace with our comprehensive commercial cleaning solutions.",
    icon: <HardDrives size={64} weight="light" />,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tag: "Commercial",
  },
  {
    title: "Luxury Residential",
    summary: "Detailed care for high-end homes, ensuring every corner reflects the elegance of your living space.",
    icon: <Cloud size={64} weight="light" />,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    tag: "Residential",
  },
  {
    title: "Retail & Showrooms",
    summary: "Create an inviting atmosphere for your customers with pristine floors and spotless displays.",
    icon: <Factory size={64} weight="light" />,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    tag: "Retail",
  },
  {
    title: "Post-Construction",
    summary: "Final touch cleaning that transforms construction sites into move-in ready, immaculate properties.",
    icon: <Wind size={64} weight="light" />,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    tag: "Specialized",
  },
{
    title: "Private Estates",
    summary: "Comprehensive exterior care for distinguished properties, from manicured gardens to pristine driveways.",
    icon: <Tree size={64} weight="light" />,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    tag: "Outdoor",
  },
];

function IndustryCard({
  title, summary, icon, image, tag,
}: {
  title: string; summary: string; icon: React.ReactNode; image: string; tag: string;
}) {
  return (
    <article className="group bg-white border border-aztec/8 overflow-hidden transition-shadow duration-300 hover:shadow-xl">

      {/* Top: image with category tag */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover grayscale-[20%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover:scale-105 group-hover:grayscale-0"
        />
        <span className="absolute bottom-3 left-3 bg-aztec text-yellow-green text-[10px] font-bold uppercase tracking-[.18em] px-3 py-1.5 font-sans">
          {tag}
        </span>
      </div>

      {/* Bottom: text content */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-medium text-aztec tracking-tight leading-[1.15] mb-2.5">
          {title}
        </h3>

        {/* Animated underline accent */}
        <div className="h-[1.5px] bg-yellow-green w-7 mb-3 transition-all duration-400 group-hover:w-12" />

        <p className="font-sans text-[13px] leading-[1.7] text-aztec/65">{summary}</p>

        <button className="mt-4 flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[.14em] text-pine-green bg-transparent border-none cursor-pointer p-0 transition-all duration-300 group-hover:gap-2.5">
          Learn more <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
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
            From luxury residences to corporate headquarters, our specialized teams deliver tailored cleaning solutions for every environment.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {industries.map((industry) => (
            <IndustryCard key={industry.title} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}