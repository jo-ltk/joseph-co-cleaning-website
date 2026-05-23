"use client";

import { Star, ShieldCheck, Medal, Users, Checks } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";

const trustItems = [
  {
    id: 1,
    icon: (
      <div className="flex text-[#c7e993]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} weight="fill" />
        ))}
      </div>
    ),
    highlight: "4.9/5",
    subtext: "Average Rating",
  },
  {
    id: 2,
    icon: <Users size={18} className="text-[#c7e993]" weight="duotone" />,
    highlight: "500+",
    subtext: "Premium Clients",
  },
  {
    id: 3,
    icon: <ShieldCheck size={18} className="text-[#c7e993]" weight="duotone" />,
    highlight: "Insured & Bonded",
    subtext: "Fully",
  },
  {
    id: 4,
    icon: <Medal size={18} className="text-[#c7e993]" weight="duotone" />,
    highlight: "Verified",
    subtext: "Professionals",
  },
  {
    id: 5,
    icon: <Checks size={18} className="text-[#c7e993]" weight="duotone" />,
    highlight: "100%",
    subtext: "Satisfaction",
  },
];

function TrustItem({
  item,
  showDivider,
}: {
  item: (typeof trustItems)[number];
  showDivider?: boolean;
}) {
  return (
    <>
      <div className="flex shrink-0 items-center gap-2.5 px-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors duration-300 hover:text-white md:text-[0.7rem] md:tracking-[0.14em]">
        {item.icon}
        <span>
          <span className="font-bold text-white">{item.highlight}</span>{" "}
          {item.subtext}
        </span>
      </div>
      {showDivider && (
        <span
          className="mx-2 hidden h-3 w-px shrink-0 bg-white/15 sm:block md:mx-4"
          aria-hidden
        />
      )}
    </>
  );
}

export default function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();
  const loopItems = [...trustItems, ...trustItems];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 overflow-hidden border-b border-white/5 bg-[#112025]"
    >
      <div className="mx-auto max-w-[1920px]">
        {shouldReduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-4 md:gap-x-12 md:py-5">
            {trustItems.map((item, idx) => (
              <TrustItem
                key={item.id}
                item={item}
                showDivider={idx < trustItems.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="trust-strip-marquee group relative py-3.5 md:py-4">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#112025] via-[#112025]/80 to-transparent md:w-24"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#112025] via-[#112025]/80 to-transparent md:w-24"
              aria-hidden
            />

            <div className="trust-strip-marquee-track items-center gap-2 md:gap-4">
              {loopItems.map((item, idx) => (
                <TrustItem
                  key={`${item.id}-${idx}`}
                  item={item}
                  showDivider={idx < loopItems.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
