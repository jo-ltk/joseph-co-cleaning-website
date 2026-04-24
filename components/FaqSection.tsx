"use client";

import { useState } from "react";
import SectionTag from "./ui/SectionTag";

const faqItems = [
  {
    question: "Do I need to be present during the cleaning?",
    answer:
      "Not necessarily. Many of our clients provide us with a key or access code. Our teams are fully vetted and insured for your peace of mind.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We specialize in luxury residential properties, corporate offices, high-end retail, and specialized medical facilities.",
  },
  {
    question: "Do you provide your own cleaning supplies?",
    answer:
      "Yes, we bring our own premium, eco-friendly cleaning products and professional-grade equipment to every job.",
  },
  {
    question: "Can I schedule recurring cleaning services?",
    answer:
      "Absolutely. We offer daily, weekly, and bi-weekly schedules tailored to your specific needs and property requirements.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "Client satisfaction is our top priority. If any area is missed or not cleaned to our standard, let us know within 24 hours and we will return to make it right.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="landing-section bg-wild-sand px-5 text-aztec md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col items-center gap-[var(--content-gap)] text-center">
          <SectionTag>FAQ</SectionTag>

          <h2 className="text-aztec">
            Frequently asked questions
          </h2>

          <p className="mx-auto max-w-[760px] text-xanadu md:text-[1.12rem]">
            Here are the top questions our clients ask before getting started.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[1120px] md:mt-14">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="border-b border-xanadu/20 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start gap-5 py-5 text-left md:gap-6 md:py-6"
                >
                  <div className="flex-1">
                    <h3 className="text-[1.08rem] md:text-[1.25rem]">
                      {item.question}
                    </h3>

                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
                        isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[950px] text-xanadu md:text-[1.08rem]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                   <span className="mt-0.5 inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-aztec/5 text-aztec md:h-[48px] md:w-[48px]">
                    <span className="text-[1.75rem] font-extralight leading-none">
                      {isOpen ? "-" : "+"}
                    </span>
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
