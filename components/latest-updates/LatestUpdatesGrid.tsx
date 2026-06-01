"use client";

import { motion, useReducedMotion } from "framer-motion";

import LatestUpdatesCard from "@/components/latest-updates/LatestUpdatesCard";
import type { InstagramMediaItem } from "@/types/instagram";

type Props = {
  items: InstagramMediaItem[];
};

export default function LatestUpdatesGrid({ items }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const [featured, ...rest] = items;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
    >
      {featured && (
        <LatestUpdatesCard item={featured} featured index={0} />
      )}
      {rest.map((item, index) => (
        <LatestUpdatesCard key={item.id} item={item} index={index + 1} />
      ))}
    </motion.div>
  );
}
