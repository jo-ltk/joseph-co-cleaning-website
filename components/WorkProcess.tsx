"use client";

import { motion } from "framer-motion";
import { FileMagnifyingGlass, CalendarCheck, Sparkle, Smiley } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { 
    number: "01", 
    title: "Request a Quote", 
    description: "Fill out our simple form or give us a call for a tailored cleaning estimate.", 
    icon: <FileMagnifyingGlass size={32} weight="light" /> 
  },
  { 
    number: "02", 
    title: "Schedule Your Service", 
    description: "Choose a date and time that fits your schedule. We offer flexible booking options.", 
    icon: <CalendarCheck size={32} weight="light" /> 
  },
  { 
    number: "03", 
    title: "We Clean Thoroughly", 
    description: "Our professional team arrives and executes our high-standard cleaning protocol.", 
    icon: <Sparkle size={32} weight="light" /> 
  },
  { 
    number: "04", 
    title: "Enjoy Spotless Results", 
    description: "Walk into your transformed space and enjoy the pristine, luxury environment.", 
    icon: <Smiley size={32} weight="light" /> 
  },
];

export default function WorkProcess() {
  return (
    <section className="bg-wild-sand py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
          >
            How It Works
          </motion.span>
          <ScrollReveal
            as="h2"
            enableBlur={true}
            blurStrength={8}
            containerClassName="text-3xl md:text-5xl leading-[1.1] text-aztec font-medium tracking-tight"
          >
            A Seamless Path to Cleanliness
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-x-8 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] } } 
              }} 
              className="relative flex flex-col items-center group"
            >
              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-25%] top-[20px] hidden text-xanadu lg:block z-0 opacity-40">
                  <svg viewBox="0 0 170 52" aria-hidden="true" className="h-[52px] w-[150px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path 
                      d="M12 26c36-6 79-6 122 0" 
                      initial={{ pathLength: 0 }} 
                      whileInView={{ pathLength: 1 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.8, delay: (index * 0.2) + 0.5 }} 
                    />
                    <motion.path 
                      d="m112 11 28 15-28 15" 
                      initial={{ opacity: 0 }} 
                      whileInView={{ opacity: 1 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.3, delay: (index * 0.2) + 1.1 }} 
                    />
                  </svg>
                </div>
              )}
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }} 
                className="flex h-[80px] w-[80px] items-center justify-center rounded-2xl bg-yellow-green text-aztec mb-8 shadow-md relative z-10"
              >
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-aztec text-yellow-green text-xs font-bold flex items-center justify-center shadow-lg border-2 border-wild-sand">
                  {step.number}
                </div>
              </motion.div>
              <h3 className="text-xl md:text-2xl leading-[1.1] text-center font-medium mb-4 text-aztec">{step.title}</h3>
              <p className="max-w-[280px] text-center text-base text-xanadu leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
