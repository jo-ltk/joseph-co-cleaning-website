"use client";

import { motion } from "framer-motion";
import { Check, Calculator } from "@phosphor-icons/react/dist/ssr";
import Button from "./ui/Button";
import ScrollReveal from "./ScrollReveal";

const plans = [
  { 
    name: "Standard Clean", 
    price: "18", 
    unit: "/hr",
    description: "Ideal for regular home maintenance", 
    features: [
      "Dusting & Vacuuming", 
      "Kitchen & Bathroom sanitation", 
      "Surface wiping", 
      "Standard floor mopping", 
      "Waste removal"
    ] 
  },
  { 
    name: "Deep Clean", 
    price: "24", 
    unit: "/hr",
    description: "Intensive seasonal refresh", 
    features: [
      "Everything in Standard", 
      "Oven & Appliance cleaning", 
      "Interior window cleaning", 
      "Skirting board detailing", 
      "Limescale removal"
    ], 
    popular: true 
  },
  { 
    name: "End of Tenancy", 
    price: "150", 
    unit: "from",
    description: "Complete move-in/out service", 
    features: [
      "Full property sanitization", 
      "Deep carpet cleaning", 
      "Internal cupboard cleaning", 
      "Deposit-back guarantee", 
      "Professional report"
    ] 
  },
];

export default function PricingSection() {
  const openEstimate = () => {
    window.dispatchEvent(new CustomEvent("open-estimate"));
  };

  return (
    <section className="bg-white pb-16 md:pb-24 pt-20 px-5 md:px-10 lg:px-20 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Investment in Excellence
            </motion.span>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              Transparent Pricing, Pristine Standards
            </ScrollReveal>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <p className="text-xanadu text-base md:text-lg max-w-sm leading-relaxed">
              Premium cleaning designed to fit your lifestyle. Not sure which plan is right?
            </p>
            <button 
              onClick={openEstimate}
              className="flex items-center gap-2 text-sm font-bold text-aztec hover:text-pine-green transition-colors group"
            >
              <Calculator size={20} weight="bold" className="text-yellow-green" />
              <span>Get an Instant Estimate</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block">→</motion.span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 md:items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-[24px] md:rounded-[32px] overflow-hidden border border-aztec/5 transition-all duration-500 ${plan.popular ? "bg-aztec text-white py-8 md:py-12 shadow-[0_40px_100px_rgba(0,0,0,0.1)] md:scale-105 z-10" : "bg-[#f9f9f8] text-aztec py-7 md:py-10"}`}
            >
              <div className="px-6 md:px-10">
                <h3 className={`text-xl md:text-2xl leading-[1.1] font-bold mb-2 md:mb-4 ${plan.popular ? "text-white" : "text-aztec"}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 md:mb-8 ${plan.popular ? "text-white/60" : "text-xanadu"}`}>{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-5 md:mb-8">
                  {plan.unit === "from" && <span className={`text-xs font-semibold uppercase tracking-wider mr-1 ${plan.popular ? "text-white/40" : "text-aztec/40"}`}>From</span>}
                  <span className="text-xl font-bold">£</span>
                  <span className="text-3xl md:text-4xl font-bold tracking-tighter leading-none">{plan.price}</span>
                  {plan.unit !== "from" && <span className={`text-sm font-medium ml-1 ${plan.popular ? "text-white/40" : "text-aztec/40"}`}>{plan.unit}</span>}
                </div>
                <button 
                  onClick={openEstimate}
                  className={`w-full h-11 md:h-12 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? "bg-yellow-green text-aztec hover:bg-white" : "bg-white border border-aztec/10 text-aztec hover:bg-aztec hover:text-white"}`}>
                  <Calculator size={18} />
                  Get Custom Quote
                </button>
              </div>
              <div className={`mt-6 md:mt-8 px-6 md:px-10 py-6 md:py-8 flex-1 border-t ${plan.popular ? "border-white/10" : "border-aztec/5"}`}>
                <ul className="space-y-3 md:space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 md:gap-4">
                      <Check size={16} weight="bold" className={`mt-0.5 ${plan.popular ? "text-yellow-green" : "text-aztec/40"}`} />
                      <span className={`text-sm font-medium leading-tight ${plan.popular ? "text-white/80" : "text-aztec/80"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}