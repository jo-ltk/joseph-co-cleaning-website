"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "How long does a typical carbon footprint assessment take?",
    answer:
      "Nope. All the templates are built in Framer, which is a no-code tool. You can edit text, swap images, and update colors without touching a single line of code.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We typically support infrastructure, clean energy, industrial, and operations-focused teams that need clear execution and measurable outcomes.",
  },
  {
    question: "What if we already have some data or reports?",
    answer:
      "That works well. We can review existing materials first, identify gaps quickly, and build from what your team already has in place.",
  },
  {
    question: "Do we even have the internal capability to pull this off?",
    answer:
      "Most teams do with the right structure. We help simplify the process so responsibilities, timing, and delivery feel much more manageable.",
  },
  {
    question: "What if the rules change or targets become impossible to meet?",
    answer:
      "We plan for that reality up front by building adaptable approaches that can respond to shifting requirements without losing momentum.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-wild-sand px-5 pb-12 pt-10 text-aztec md:px-8 md:pb-14 md:pt-12 lg:px-12 lg:pb-16 lg:pt-14">
      <div className="mx-auto max-w-[1450px]">
        <div className="text-center">
          <p className="section-label rounded-full">
            FAQ
          </p>

          <h2 className="mt-6 text-aztec">
            Frequently asked questions
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-xanadu md:text-[1.12rem]">
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
