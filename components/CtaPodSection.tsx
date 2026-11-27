"use client";

import Image from "next/image";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Button, { ButtonLink } from "./ui/Button";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  "Free on-site assessment",
  "Fully vetted cleaning teams",
  "Flexible weekly or one-off visits",
];

/**
 * Full-bleed CTA band: the image fills the right of the viewport edge to edge and fades
 * into the copy; highlights sit in a divided strip along the bottom.
 */
export default function CtaPodSection() {
  return (
    <section className="relative isolate overflow-hidden bg-aztec text-white">
      {/* Image */}
      <div className="relative h-[340px] overflow-hidden sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
        <div data-img-reveal data-parallax="0.08" data-parallax-cover className="absolute inset-0">
          <Image
            src="/images/cta-pod.png"
            alt="Professional cleaning service by Joseph.co"
            fill
            quality={95}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aztec via-aztec/20 to-transparent lg:bg-gradient-to-r lg:from-aztec lg:via-aztec/40 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-aztec/80 to-transparent lg:block" />
      </div>

      {/* Glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-yellow-green/10 blur-[120px]"
      />

      <div className="relative px-5 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1450px] flex-col lg:min-h-[780px]">
          {/* Copy */}
          <div className="flex flex-1 flex-col justify-center py-14 md:py-20 lg:max-w-[46%] lg:py-28">
            <span
              data-reveal
              className="mb-7 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-yellow-green"
            >
              <span className="h-px w-10 bg-yellow-green" aria-hidden />
              Book your clean
            </span>

            {/* Spacing lives on the wrapper: .scroll-reveal sets its own margin-block. */}
            <div className="mb-8">
              <ScrollReveal
                as="h2"
                containerClassName="text-[2.75rem] leading-[1] tracking-tight text-white md:text-7xl xl:text-8xl"
              >
                Ready for a spotless space?
              </ScrollReveal>
            </div>

            <p
              data-reveal
              data-reveal-delay="0.1"
              className="mb-10 max-w-md text-base leading-relaxed text-white/65 md:text-lg"
            >
              Tell us about your property. We will build a bespoke cleaning plan around your schedule, finish, and standards.
            </p>

            <div data-reveal data-reveal-delay="0.2" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                variant="primary"
                className="group !h-14 w-full !px-9 !text-base font-semibold sm:w-auto"
                onClick={() => window.dispatchEvent(new CustomEvent("open-estimate"))}
              >
                Get a free quote
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <ButtonLink
                href="/contact?source=CtaPod"
                variant="secondary"
                className="!h-14 w-full border border-white/25 !px-9 !text-base font-semibold !text-white hover:bg-white hover:!text-aztec sm:w-auto"
              >
                Contact us
              </ButtonLink>
            </div>
          </div>

          {/* Highlights strip */}
          <ul
            data-reveal-group
            className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3"
          >
            {highlights.map((item, index) => (
              <li
                key={item}
                data-reveal-item
                className="flex items-center gap-4 border-white/10 py-6 sm:py-8 sm:pr-6 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:pl-6 lg:[&:not(:first-child)]:pl-10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-yellow-green text-aztec">
                  <Check size={18} weight="bold" aria-hidden />
                </span>
                <span>
                  <span className="mb-0.5 block font-sans text-[10px] font-bold uppercase tracking-[.2em] text-yellow-green/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-white md:text-lg">{item}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
