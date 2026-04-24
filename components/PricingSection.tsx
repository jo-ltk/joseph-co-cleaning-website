"use client";

import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react/dist/ssr";
import Button from "./ui/Button";

const plans = [
  { name: "Basic Plan", price: "1,499", description: "Ideal for small businesses", features: ["Unified dashboard", "Finance management module", "Inventory control", "Basic reporting and analytics", "10 user accounts"] },
  { name: "Business Plan", price: "2,999", description: "For growing businesses", features: ["Everything in basic plan", "HR & payroll module", "Sales & CRM module", "Workflow automation", "Advanced analytics & reporting"], popular: true },
  { name: "Premium Plan", price: "4,999", description: "Ideal for enterprises seeking", features: ["Everything in business plan", "Custom integrations", "AI-Driven recommendations", "Role based access control", "Unlimited user accounts"] },
];

export default function PricingSection() {
  return (
    <section className="bg-wild-sand py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Investment in Excellence
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl leading-[1.1] text-aztec">
              Simple Packages, <br />Pristine Standards
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xanadu text-lg max-w-sm">
            Transparent pricing designed to fit your lifestyle. Each tier guarantees the signature Joseph.co quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-[32px] overflow-hidden border border-aztec/5 transition-all duration-500 ${plan.popular ? "bg-aztec text-white py-12 shadow-[0_40px_100px_rgba(0,0,0,0.2)] scale-105 z-10" : "bg-white text-aztec py-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"}`}>
              <div className="px-10">
                <h3 className={`text-xl md:text-2xl leading-[1.1] font-bold mb-4 ${plan.popular ? "text-white" : "text-aztec"}`}>{plan.name}</h3>
                <p className={`text-sm mb-8 ${plan.popular ? "text-white/60" : "text-xanadu"}`}>{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-2xl font-bold">₹</span>
                  <span className="text-4xl font-bold tracking-tighter leading-none">{plan.price}</span>
                  <span className={`text-sm font-medium ml-1 ${plan.popular ? "text-white/40" : "text-aztec/40"}`}>/monthly</span>
                </div>
                <Button variant={plan.popular ? "primary" : "secondary"}
                  className={`w-full h-12 rounded-full text-sm font-bold transition-all duration-300 ${plan.popular ? "bg-yellow-green text-aztec hover:bg-white" : "bg-transparent border border-aztec/10 text-aztec hover:bg-aztec/5"}`}>
                  Select Plan
                </Button>
              </div>
              <div className={`mt-8 px-10 py-8 flex-1 border-t ${plan.popular ? "border-white/10" : "border-aztec/5"}`}>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
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
