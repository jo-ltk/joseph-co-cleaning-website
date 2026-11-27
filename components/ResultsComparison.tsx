"use client";

import { ArrowsLeftRight } from "@phosphor-icons/react/dist/ssr";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ScrollReveal from "./ScrollReveal";

/**
 * Columns are 9fr / 16fr so a 3:4 portrait and a 4:3 landscape card share one height
 * on desktop with no cropping. Below lg the portrait card switches to a shorter crop.
 */
const comparisons = [
  {
    label: "Interior",
    before: "/images/transformation-kitchen-before.jpg",
    after: "/images/transformation-kitchen-after.jpg",
    beforeAlt: "Cluttered kitchen before professional cleaning",
    afterAlt: "Spotless kitchen after a Joseph.co clean",
    frame: "aspect-[4/5] md:aspect-[16/11] lg:aspect-[3/4]",
    sizes: "(max-width: 1024px) 100vw, 36vw",
  },
  {
    label: "Exterior",
    before: "/images/transformation-house-before.jpg",
    after: "/images/transformation-house-after.jpg",
    beforeAlt: "Overgrown house exterior before restoration",
    afterAlt: "Restored house exterior after Joseph.co property services",
    frame: "aspect-[4/3]",
    sizes: "(max-width: 1024px) 100vw, 64vw",
  },
];

export default function ResultsComparison() {
  return (
    <section className="overflow-hidden bg-white px-5 pb-16 pt-12 md:px-10 md:pb-28 md:pt-20 lg:px-20">
      <div className="mx-auto max-w-[1450px]">
        {/* Header */}
        <div className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <span
              data-reveal
              className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-pine-green"
            >
              <span className="h-px w-10 bg-pine-green" aria-hidden />
              The Transformation
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="max-w-3xl text-3xl leading-[1.05] tracking-tight text-aztec md:text-5xl lg:text-6xl"
            >
              Immaculate Standards, Visible Results
            </ScrollReveal>
          </div>
          <p
            data-reveal
            data-reveal-delay="0.15"
            className="max-w-sm border-t border-pine-green/30 pt-5 text-base leading-relaxed text-xanadu md:text-lg lg:col-span-4 lg:justify-self-end"
          >
            Experience the dramatic difference our specialized cleaning protocols make in
            restoring and maintaining premium environments.
          </p>
        </div>

        {/* Cards */}
        <div data-reveal-group className="grid grid-cols-1 items-start gap-12 px-[10px] lg:grid-cols-[9fr_16fr] lg:gap-10">
          {comparisons.map((item, index) => (
            <figure key={item.label} data-reveal-item className="group/card">
              {/* Frame drawn with outline (no layout space) so the 9fr/16fr split keeps equal heights */}
              <div className="shadow-[0_24px_80px_rgba(17,32,37,0.12)] outline outline-[10px] outline-wild-sand">
                <BeforeAfterSlider
                  beforeImage={item.before}
                  afterImage={item.after}
                  beforeAlt={item.beforeAlt}
                  afterAlt={item.afterAlt}
                  beforeLabel="Prior to Treatment"
                  afterLabel="The Joseph.co Standard"
                  className={item.frame}
                  sizes={item.sizes}
                />
              </div>

              <figcaption className="mt-8 flex items-center justify-between gap-4 border-b border-aztec/10 pb-5">
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="font-sans text-4xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(17,32,37,0.25)] md:text-5xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium tracking-tight text-aztec md:text-xl">
                    {item.label}
                  </span>
                </div>
                <span className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[.18em] text-pine-green">
                  <ArrowsLeftRight size={16} weight="bold" aria-hidden />
                  Drag to compare
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
