"use client";

import { Star, ShieldCheck, Medal, Users, Checks } from "@phosphor-icons/react";
import { motion } from "framer-motion";

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
    label: "4.9/5 Average Rating",
    highlight: "4.9/5",
    subtext: "Average Rating"
  },
  {
    id: 2,
    icon: <Users size={18} className="text-[#c7e993]" weight="duotone" />,
    label: "500+ Premium Clients Trusted",
    highlight: "500+",
    subtext: "Premium Clients"
  },
  {
    id: 3,
    icon: <ShieldCheck size={18} className="text-[#c7e993]" weight="duotone" />,
    label: "Fully Insured & Bonded",
    highlight: "Insured & Bonded",
    subtext: "Fully"
  },
  {
    id: 4,
    icon: <Medal size={18} className="text-[#c7e993]" weight="duotone" />,
    label: "Verified Professionals",
    highlight: "Verified",
    subtext: "Professionals"
  },
  {
    id: 5,
    icon: <Checks size={18} className="text-[#c7e993]" weight="duotone" />,
    label: "100% Satisfaction Rate",
    highlight: "100%",
    subtext: "Satisfaction"
  }
];

export default function TrustStrip() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative z-10 bg-[#112025] border-b border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Mobile Marquee (Visible on small screens) */}
        <div className="flex lg:hidden py-3 relative">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#112025] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#112025] to-transparent z-10" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-8 whitespace-nowrap px-4"
          >
            {[...trustItems, ...trustItems].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-2 text-[0.6rem] font-medium tracking-[0.1em] uppercase text-white/70">
                {item.icon}
                <span>
                  <span className="text-white font-bold">{item.highlight}</span> {item.subtext}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Static (Visible on large screens) */}
        <div className="hidden lg:flex items-center justify-center gap-x-12 py-4 px-10 text-[0.7rem] font-medium tracking-[0.1em] uppercase text-white/60">
          {trustItems.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-6">
              <div className="flex items-center gap-2 group transition-colors hover:text-white">
                {item.icon}
                <span>
                  <span className="text-white font-bold">{item.highlight}</span> {item.subtext}
                </span>
              </div>
              {idx !== trustItems.length - 1 && (
                <div className="h-3 w-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
