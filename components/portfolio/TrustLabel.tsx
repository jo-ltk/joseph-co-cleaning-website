"use client";

import { motion } from "framer-motion";
import { SealCheck, ShieldCheck, UserFocus, Clock, HardDrive, Handshake } from "@phosphor-icons/react/dist/ssr";

type BadgeType = 
  | "Deposit Safe" 
  | "Inventory Ready" 
  | "DBS Checked" 
  | "Fully Insured" 
  | "Agency Standard" 
  | "24h Turnaround" 
  | "Handover Verified" 
  | "Lease Compliant"
  | "Tenant Ready"
  | "Heritage Restored"
  | "Office Ready"
  | "Snag-Free"
  | string;

const getBadgeIcon = (type: BadgeType) => {
  switch (type) {
    case "Deposit Safe": return ShieldCheck;
    case "Inventory Ready": return SealCheck;
    case "DBS Checked": return UserFocus;
    case "Fully Insured": return ShieldCheck;
    case "Agency Standard": return Handshake;
    case "24h Turnaround": return Clock;
    case "Handover Verified": return SealCheck;
    default: return SealCheck;
  }
};

export default function TrustLabel({ label, variant = "light" }: { label: BadgeType; variant?: "light" | "dark" | "accent" }) {
  const Icon = getBadgeIcon(label);
  
  const variants = {
    light: "bg-white/10 text-white/80 border-white/10",
    dark: "bg-aztec/5 text-aztec/60 border-aztec/10",
    accent: "bg-yellow-green/10 text-yellow-green border-yellow-green/20",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${variants[variant]}`}
    >
      <Icon size={12} weight="bold" />
      <span>{label}</span>
    </motion.div>
  );
}
