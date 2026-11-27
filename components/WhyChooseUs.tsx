"use client";

import Image from "next/image";
import { Timer, Users, Leaf, Tag } from "@phosphor-icons/react/dist/ssr";

import ScrollReveal from "./ScrollReveal";

const points = [
  {
    title: "Fast Service",
    description:
      "Responsive scheduling and efficient cleaning protocols to respect your valuable time.",
    Icon: Timer,
  },
  {
    title: "Professional Team",
    description:
      "Extensively trained, background-checked specialists dedicated to immaculate standards.",
    Icon: Users,
  },
  {
    title: "Eco-Friendly",
    description:
      "Sustainable, non-toxic products that protect your environment and the planet.",
    Icon: Leaf,
  },
  {
    title: "Affordable Pricing",
    description:
      "Transparent, competitive rates for premium services without compromising on quality.",
    Icon: Tag,
  },
];

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Motion is declarative (see lib/motion): the image uses parallax + zoom reveal, the
 * tiles stagger in, and the outlined word band drifts sideways with scroll.
 */
export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-aztec pt-16 text-wild-sand md:pt-28">
      {/* Soft lime glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-yellow-green/[0.07] blur-[120px]"
      />

      <div className="relative px-5 md:px-10 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          {/* Header */}
          <div className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <span
                data-reveal
                className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-yellow-green"
              >
                <span className="h-px w-10 bg-yellow-green" aria-hidden />
                The Joseph.co Advantage
              </span>
              <ScrollReveal
                as="h2"
                containerClassName="max-w-3xl text-3xl leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl"
              >
                Why Discerning Clients Choose Our Services
              </ScrollReveal>
            </div>
            <p
              data-reveal
              data-reveal-delay="0.15"
              className="max-w-sm border-t border-yellow-green/40 pt-5 text-base leading-relaxed text-xanadu md:text-lg lg:col-span-4 lg:justify-self-end"
            >
              Setting the benchmark for excellence in professional cleaning through a
              relentless commitment to quality and integrity.
            </p>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
            {/* Image tile */}
            <div className="relative min-h-[380px] overflow-hidden border border-white/10 sm:min-h-[460px] lg:col-span-5 lg:min-h-[600px]">
              <div data-img-reveal data-parallax="0.08" data-parallax-cover className="absolute inset-0">
                <Image
                  src="/images/why-choose-us.png"
                  alt="Joseph.co cleaning specialists delivering premium service"
                  fill
                  quality={95}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aztec via-aztec/10 to-aztec/30" />

              <span className="absolute left-5 top-5 z-10 bg-yellow-green px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-[.2em] text-aztec">
                Trusted Excellence
              </span>

              <div data-reveal data-reveal-delay="0.2" className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                <span className="mb-4 block h-px w-12 bg-yellow-green" aria-hidden />
                <p className="mb-2 font-sans text-[11px] font-bold uppercase tracking-[.18em] text-yellow-green">
                  The standard we uphold
                </p>
                <p className="max-w-sm text-lg leading-snug text-white md:text-xl">
                  Real teams, real results — the same meticulous care on every visit.
                </p>
              </div>
            </div>

            {/* Feature tiles */}
            <div data-reveal-group className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
              {points.map(({ title, description, Icon }, index) => (
                <article
                  key={title}
                  data-reveal-item
                  className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden border border-white/10 bg-white/[0.03] p-7 md:p-8"
                >
                  {/* Lime sweep on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 origin-bottom scale-y-0 bg-yellow-green transition-transform duration-700 ${ease} group-hover:scale-y-100`}
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      className={`flex h-14 w-14 items-center justify-center border border-yellow-green/40 text-yellow-green transition-colors duration-500 group-hover:border-aztec/30 group-hover:text-aztec`}
                    >
                      <Icon size={30} weight="light" aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="font-sans text-6xl font-semibold leading-none text-transparent transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1px_rgba(199,233,147,0.35)] group-hover:[-webkit-text-stroke:1px_rgba(17,32,37,0.35)] md:text-7xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mt-10">
                    <h3 className="mb-3 text-xl font-medium tracking-tight text-white transition-colors duration-500 group-hover:text-aztec md:text-2xl">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-xanadu transition-colors duration-500 group-hover:text-aztec/75 md:text-base">
                      {description}
                    </p>
                    <span
                      aria-hidden
                      className={`mt-6 block h-px w-8 origin-left bg-yellow-green transition-all duration-700 ${ease} group-hover:w-full group-hover:bg-aztec/40`}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outlined word band — continuous marquee, speeds up with scroll */}
      <div aria-hidden className="mt-16 overflow-hidden border-t border-white/10 py-8 md:mt-24 md:py-10">
        <div data-marquee="40" className="flex w-max items-center whitespace-nowrap">
          {[...points, ...points].map(({ title }, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 md:gap-14 md:pr-14">
              <span className="text-5xl font-medium tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(246,246,246,0.22)] md:text-7xl lg:text-8xl">
                {title}
              </span>
              <span className="text-2xl text-yellow-green md:text-4xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
