"use client";

import { motion } from "framer-motion";
import { CalendarCheck, HouseLine, Sparkle, CheckCircle } from "@phosphor-icons/react/dist/ssr";

import ScrollReveal from "./ScrollReveal";

const steps = [
  { number: "01", title: "Book", description: "Select your service and preferred time through our seamless booking interface.", icon: <CalendarCheck size={28} weight="light" /> },
  { number: "02", title: "We Arrive", description: "Our vetted specialists arrive promptly, fully equipped with premium cleaning supplies.", icon: <HouseLine size={28} weight="light" /> },
  { number: "03", title: "Clean", description: "We execute our signature multi-point protocol with obsessive attention to detail.", icon: <Sparkle size={28} weight="light" /> },
  { number: "04", title: "Done", description: "Your space is transformed. We conduct a final quality check for your peace of mind.", icon: <CheckCircle size={28} weight="light" /> },
];

export default function ProcessSection() {
  return (
    <section className="bg-wild-sand py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Our Methodology
            </motion.span>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              A Seamless Experience From Start to Finish
            </ScrollReveal>
          </div>
         <motion.p
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
  className="text-xanadu text-base md:text-lg max-w-sm leading-relaxed"
>
  Four simple steps from booking to completion. Our proven methodology ensures consistent, premium results every time.
</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-x-8 relative">
          {steps.map((step, index) => (
            <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] } } }} className="relative flex flex-col items-center group">
              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-25%] top-[12px] hidden text-xanadu lg:block z-0 opacity-40">
                  <svg viewBox="0 0 170 52" aria-hidden="true" className="h-[52px] w-[150px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path d="M12 26c36-6 79-6 122 0" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: (index * 0.2) + 0.5 }} />
                    <motion.path d="m112 11 28 15-28 15" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: (index * 0.2) + 1.1 }} />
                  </svg>
                </div>
              )}
              <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="flex h-[74px] w-[156px] items-center justify-center rounded-full bg-yellow-green text-aztec mb-6 shadow-sm relative z-10">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}>
                  {step.icon}
                </motion.div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-aztec text-yellow-green text-sm font-bold flex items-center justify-center">{step.number}</div>
              </motion.div>
              <h3 className="text-xl md:text-2xl leading-[1.1] text-center font-medium mb-3 text-aztec">{step.title}</h3>
              <p className="max-w-[280px] text-center text-base text-xanadu leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}