"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Button, { ButtonLink } from "./ui/Button";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  "Free on-site assessment",
  "Fully vetted cleaning teams",
  "Flexible weekly or one-off visits",
];

export default function CtaPodSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-wild-sand py-16 md:py-24 px-5 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1450px]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="grid overflow-hidden rounded-[28px] border border-aztec/8 bg-white shadow-[0_24px_80px_rgba(17,32,37,0.08)] md:rounded-[40px] lg:grid-cols-[1fr_1.05fr]"
        >
          {/* Copy */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 block text-sm font-semibold uppercase tracking-widest text-pine-green"
            >
              Book your clean
            </motion.span>

            <ScrollReveal
              as="h2"
              enableBlur={!shouldReduceMotion}
              blurStrength={8}
              containerClassName="mb-4 text-2xl leading-[1.1] text-aztec md:text-4xl lg:text-[2.75rem]"
            >
              Ready for a spotless space?
            </ScrollReveal>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-8 max-w-md text-base leading-relaxed text-xanadu md:text-lg"
            >
              Tell us about your property. We will build a bespoke cleaning plan around your schedule, finish, and standards.
            </motion.p>

            <motion.ul
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-8 space-y-3"
            >
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-aztec md:text-base">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-pine-green" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                variant="primary"
                className="group h-12 w-full px-8 text-base font-semibold sm:w-auto"
                onClick={() => window.dispatchEvent(new CustomEvent("open-estimate"))}
              >
                Get a free quote
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Button>
              <ButtonLink
                href="/contact?source=CtaPod"
                variant="secondary"
                className="h-12 w-full border border-aztec/15 px-8 text-base font-semibold text-aztec hover:bg-aztec/5 sm:w-auto"
              >
                Contact us
              </ButtonLink>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="relative min-h-[260px] bg-wild-sand sm:min-h-[320px] lg:min-h-[420px]">
            <Image
              src="/images/cta-pod.png"
              alt="Professional cleaning service by Joseph.co"
              fill
              quality={95}
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
