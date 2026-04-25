"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";
import ScrollReveal from "./ScrollReveal";

export default function JoinOurTeamSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Topographical Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'url("/images/topo-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Opacity Fades at Top and Bottom as requested */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative z-20 mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
        >
          Join Our Team
        </motion.span>

       <ScrollReveal
  as="h2"
  containerClassName="mx-auto max-w-[900px] text-2xl md:text-4xl leading-[1.1] text-[#1a1a1a] font-medium tracking-tight mb-10 md:mb-16 text-center"
  style={{ fontFamily: "var(--font-inter), sans-serif", textAlign: "center" }}
>
          Ready to Make a Lasting Impact in Premium Cleaning? Discover Our Current Job Openings and Join Our Team
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="btn-pair">
            <ButtonLink href="/careers" variant="primary">
              See Job Openings
            </ButtonLink>
            <IconButton
              href="/careers"
              aria-label="See job openings"
              size="md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
