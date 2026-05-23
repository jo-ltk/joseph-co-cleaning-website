"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Calculator,
  Sparkle,
  ShieldCheck,
  Clock,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

type Plan = {
  name: string;
  price: string;
  unit: string;
  prefix?: string;
  description: string;
  tagline: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Standard Clean",
    price: "18",
    unit: "/hr",
    tagline: "Weekly rhythm",
    description: "Ideal for regular home maintenance and light commercial upkeep.",
    features: [
      "Dusting & vacuuming",
      "Kitchen & bathroom sanitation",
      "Surface wiping",
      "Standard floor mopping",
      "Waste removal",
    ],
  },
  {
    name: "Deep Clean",
    price: "24",
    unit: "/hr",
    tagline: "Most booked",
    description: "Intensive seasonal refresh with detail work standard cleans skip.",
    popular: true,
    features: [
      "Everything in Standard",
      "Oven & appliance cleaning",
      "Interior window cleaning",
      "Skirting board detailing",
      "Limescale removal",
    ],
  },
  {
    name: "End of Tenancy",
    price: "150",
    unit: "",
    prefix: "from",
    tagline: "Move-ready",
    description: "Complete move-in/out service with deposit-back confidence.",
    features: [
      "Full property sanitization",
      "Deep carpet cleaning",
      "Internal cupboard cleaning",
      "Deposit-back guarantee",
      "Professional report",
    ],
  },
];

const assurances = [
  { label: "Fully insured", icon: ShieldCheck },
  { label: "Vetted specialists", icon: Star },
  { label: "Quote in minutes", icon: Clock },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

function PricingCard({
  plan,
  index,
  onEstimate,
  shouldReduceMotion,
}: {
  plan: Plan;
  index: number;
  onEstimate: () => void;
  shouldReduceMotion: boolean | null;
}) {
  const popular = plan.popular;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: smoothEase }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className={`relative flex flex-col overflow-hidden border transition-shadow duration-500 ${
        popular
          ? "z-10 border-yellow-green/40 bg-aztec text-white shadow-[0_32px_80px_-24px_rgba(17,32,37,0.45)] md:scale-[1.04]"
          : "border-aztec/10 bg-white text-aztec shadow-[0_16px_48px_-20px_rgba(17,32,37,0.1)]"
      }`}
    >
      <div
        className={`h-1 w-full ${popular ? "bg-yellow-green" : "bg-aztec/15"}`}
        aria-hidden
      />

      <div className="flex flex-1 flex-col p-6 md:p-8">
        {popular && (
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 bg-yellow-green px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[.18em] text-aztec">
            <Sparkle size={12} weight="fill" aria-hidden />
            Most popular
          </span>
        )}

        <p
          className={`mb-1 font-sans text-[10px] font-bold uppercase tracking-[.22em] ${popular ? "text-yellow-green" : "text-pine-green"}`}
        >
          {plan.tagline}
        </p>
        <h3
          className={`mb-2 font-medium tracking-tight ${popular ? "text-2xl text-white md:text-3xl" : "text-xl text-aztec md:text-2xl"}`}
        >
          {plan.name}
        </h3>
        <p
          className={`mb-6 min-h-[3rem] font-sans text-sm leading-relaxed ${popular ? "text-white/65" : "text-xanadu"}`}
        >
          {plan.description}
        </p>

        <div className="mb-6 flex items-end gap-1">
          {plan.prefix && (
            <span
              className={`mb-1 font-sans text-[10px] font-bold uppercase tracking-[.2em] ${popular ? "text-white/40" : "text-aztec/40"}`}
            >
              From
            </span>
          )}
          <span className={`text-lg font-bold ${popular ? "text-white" : "text-aztec"}`}>
            £
          </span>
          <span
            className={`font-bold leading-none tracking-tighter ${popular ? "text-4xl text-white md:text-5xl" : "text-3xl text-aztec md:text-4xl"}`}
          >
            {plan.price}
          </span>
          {plan.unit && (
            <span
              className={`mb-1 font-sans text-sm font-medium ${popular ? "text-white/40" : "text-aztec/40"}`}
            >
              {plan.unit}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onEstimate}
          className={`mb-6 flex h-12 w-full items-center justify-center gap-2 font-sans text-sm font-bold transition-colors duration-300 ${
            popular
              ? "bg-yellow-green text-aztec hover:bg-white"
              : "border border-aztec/10 bg-wild-sand text-aztec hover:bg-aztec hover:text-yellow-green"
          }`}
        >
          <Calculator size={18} weight="bold" aria-hidden />
          Get custom quote
        </button>

        <ul
          className={`flex-1 space-y-3 border-t pt-6 ${popular ? "border-white/10" : "border-aztec/8"}`}
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={16}
                weight="bold"
                className={`mt-0.5 shrink-0 ${popular ? "text-yellow-green" : "text-pine-green"}`}
                aria-hidden
              />
              <span
                className={`font-sans text-sm font-medium leading-snug ${popular ? "text-white/85" : "text-aztec/80"}`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function PricingSection() {
  const shouldReduceMotion = useReducedMotion();

  const openEstimate = () => {
    window.dispatchEvent(new CustomEvent("open-estimate"));
  };

  return (
    <section className="relative overflow-hidden border-t border-aztec/8 bg-wild-sand px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-20 lg:px-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23112025' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-[1450px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 lg:flex-row lg:items-end lg:gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 block font-sans text-sm font-semibold uppercase tracking-widest text-pine-green"
            >
              Investment in Excellence
            </motion.span>
            <ScrollReveal
              as="h2"
              enableBlur
              blurStrength={8}
              containerClassName="text-2xl leading-[1.1] text-aztec md:text-4xl"
            >
              Transparent Pricing, Pristine Standards
            </ScrollReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="max-w-sm text-base leading-relaxed text-xanadu md:text-lg"
          >
            Three clear packages — pick what fits, then get a tailored quote for
            your property in minutes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              onEstimate={openEstimate}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
          className="mt-8 flex flex-col gap-6 border border-aztec/10 bg-white p-5 md:mt-10 md:flex-row md:items-center md:justify-between md:p-6 lg:mt-12"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {assurances.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[.12em] text-aztec/75"
              >
                <span className="flex h-8 w-8 items-center justify-center bg-wild-sand text-pine-green">
                  <Icon size={18} weight="light" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openEstimate}
            className="group inline-flex items-center gap-2 self-start font-sans text-sm font-bold text-aztec transition-colors hover:text-pine-green md:self-center"
          >
            <Calculator
              size={22}
              weight="bold"
              className="text-yellow-green"
              aria-hidden
            />
            <span>Get an instant estimate</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="inline-block"
              aria-hidden
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
