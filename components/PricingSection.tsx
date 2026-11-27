"use client";

import {
  ArrowRight,
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

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const openEstimate = () => window.dispatchEvent(new CustomEvent("open-estimate"));

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const popular = plan.popular;

  return (
    <article
      data-reveal-item
      className={`group relative flex flex-col overflow-hidden border transition-[transform,box-shadow] duration-700 ${ease} hover:-translate-y-2 ${
        popular
          ? "border-yellow-green/30 bg-aztec text-white shadow-[0_40px_90px_-30px_rgba(17,32,37,0.6)]"
          : "border-aztec/10 bg-white text-aztec shadow-[0_20px_60px_-30px_rgba(17,32,37,0.18)] hover:shadow-[0_30px_70px_-30px_rgba(17,32,37,0.3)]"
      }`}
    >
      {/* Top rule: grows to full width on hover */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-700 ${ease} ${
          popular ? "scale-x-100 bg-yellow-green" : "scale-x-[0.18] bg-pine-green group-hover:scale-x-100"
        }`}
      />
      {popular && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-green/15 blur-[80px]"
        />
      )}

      <div className="relative flex flex-1 flex-col p-7 md:p-9">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p
              className={`mb-2 font-sans text-[10px] font-bold uppercase tracking-[.22em] ${popular ? "text-yellow-green" : "text-pine-green"}`}
            >
              {plan.tagline}
            </p>
            <h3 className={`text-2xl font-medium tracking-tight md:text-[1.75rem] ${popular ? "text-white" : "text-aztec"}`}>
              {plan.name}
            </h3>
          </div>
          {popular ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 bg-yellow-green px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[.18em] text-aztec">
              <Sparkle size={12} weight="fill" aria-hidden />
              Most popular
            </span>
          ) : (
            <span
              aria-hidden
              className="font-sans text-5xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(17,32,37,0.18)]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Price */}
        <div className={`mb-6 flex items-end gap-1.5 border-b pb-8 ${popular ? "border-white/10" : "border-aztec/10"}`}>
          {plan.prefix && (
            <span className={`mb-2 font-sans text-[10px] font-bold uppercase tracking-[.2em] ${popular ? "text-white/45" : "text-aztec/45"}`}>
              From
            </span>
          )}
          <span className={`mb-2 text-2xl font-semibold ${popular ? "text-yellow-green" : "text-pine-green"}`}>£</span>
          <span className={`text-6xl font-semibold leading-[0.85] tracking-tighter md:text-7xl ${popular ? "text-white" : "text-aztec"}`}>
            {plan.price}
          </span>
          {plan.unit && (
            <span className={`mb-1 font-sans text-base font-medium ${popular ? "text-white/45" : "text-aztec/45"}`}>
              {plan.unit}
            </span>
          )}
        </div>

        <p className={`mb-7 font-sans text-sm leading-relaxed ${popular ? "text-white/70" : "text-xanadu"}`}>
          {plan.description}
        </p>

        <ul className="mb-9 flex-1 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center ${popular ? "bg-yellow-green/15 text-yellow-green" : "bg-pine-green/10 text-pine-green"}`}
              >
                <Check size={12} weight="bold" aria-hidden />
              </span>
              <span className={`font-sans text-sm font-medium leading-snug ${popular ? "text-white/85" : "text-aztec/80"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openEstimate}
          className={`group/btn flex h-14 w-full items-center justify-between px-6 font-sans text-sm font-bold transition-colors duration-300 ${
            popular
              ? "bg-yellow-green text-aztec hover:bg-white"
              : "border border-aztec/15 text-aztec hover:border-aztec hover:bg-aztec hover:text-yellow-green"
          }`}
        >
          <span className="flex items-center gap-2">
            <Calculator size={18} weight="bold" aria-hidden />
            Get custom quote
          </span>
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
        </button>
      </div>
    </article>
  );
}

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden border-t border-aztec/8 bg-wild-sand px-5 pb-16 pt-16 md:px-10 md:pb-28 md:pt-24 lg:px-20">
      <div className="relative mx-auto max-w-[1450px]">
        {/* Header */}
        <div className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <span
              data-reveal
              className="mb-5 flex items-center gap-3 font-sans text-sm font-semibold uppercase tracking-widest text-pine-green"
            >
              <span className="h-px w-10 bg-pine-green" aria-hidden />
              Investment in Excellence
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="max-w-3xl text-3xl leading-[1.05] tracking-tight text-aztec md:text-5xl lg:text-6xl"
            >
              Transparent Pricing, Pristine Standards
            </ScrollReveal>
          </div>
          <p
            data-reveal
            data-reveal-delay="0.15"
            className="max-w-sm border-t border-pine-green/30 pt-5 text-base leading-relaxed text-xanadu md:text-lg lg:col-span-4 lg:justify-self-end"
          >
            Three clear packages — pick what fits, then get a tailored quote for your
            property in minutes.
          </p>
        </div>

        {/* Plans */}
        <div data-reveal-group className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Assurance bar */}
        <div
          data-reveal
          className="mt-6 flex flex-col gap-6 bg-aztec p-6 text-white md:flex-row md:items-center md:justify-between md:px-9 md:py-7 lg:mt-8"
        >
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {assurances.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3 font-sans text-[12px] font-semibold uppercase tracking-[.14em] text-white/80"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-yellow-green/30 text-yellow-green">
                  <Icon size={18} weight="light" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openEstimate}
            className="group inline-flex h-12 items-center gap-3 self-start bg-yellow-green px-6 font-sans text-sm font-bold text-aztec transition-colors hover:bg-white md:self-center"
          >
            <Calculator size={20} weight="bold" aria-hidden />
            Get an instant estimate
            <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
