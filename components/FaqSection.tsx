"use client";

import { useState } from "react";
import SectionTag from "./ui/SectionTag";
import { motion } from "framer-motion";

const faqItems = [
  { question: "Do I need to be present during the cleaning?", answer: "Not necessarily. Many of our clients provide us with a key or access code. Our teams are fully vetted and insured for your peace of mind." },
  { question: "What industries do you specialize in?", answer: "We specialize in luxury residential properties, corporate offices, high-end retail, and specialized medical facilities." },
  { question: "Do you provide your own cleaning supplies?", answer: "Yes, we bring our own premium, eco-friendly cleaning products and professional-grade equipment to every job." },
  { question: "Can I schedule recurring cleaning services?", answer: "Absolutely. We offer daily, weekly, and bi-weekly schedules tailored to your specific needs and property requirements." },
  { question: "What if I'm not satisfied with the results?", answer: "Client satisfaction is our top priority. If any area is missed or not cleaned to our standard, let us know within 24 hours and we will return to make it right." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-wild-sand py-24 px-5 md:px-10 lg:px-20 text-aztec">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              FAQ
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl leading-[1.1] text-aztec">
              Frequently Asked Questions
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xanadu text-lg max-w-sm">
            Here are the top questions our clients ask before getting started.
          </motion.p>
        </div>

        <div className="mx-auto max-w-[1120px]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="border-b border-xanadu/20 last:border-b-0">
                <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex w-full items-start gap-4 py-8 text-left">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl leading-[1.1] text-aztec">{item.question}</h3>
                    <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="max-w-[950px] text-base text-xanadu leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                  <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-aztec/5 text-aztec">
                    <span className="text-2xl font-extralight leading-none">{isOpen ? "-" : "+"}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
