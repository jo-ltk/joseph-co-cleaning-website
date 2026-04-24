"use client";

import { motion } from "framer-motion";
import { Timer, Users, Leaf, Tag } from "@phosphor-icons/react/dist/ssr";

const points = [
  {
    title: "Fast Service",
    description: "Responsive scheduling and efficient cleaning protocols to respect your valuable time.",
    icon: <Timer size={48} weight="light" />,
  },
  {
    title: "Professional Team",
    description: "Extensively trained, background-checked specialists dedicated to immaculate standards.",
    icon: <Users size={48} weight="light" />,
  },
  {
    title: "Eco-Friendly",
    description: "Sustainable, non-toxic products that protect your environment and the planet.",
    icon: <Leaf size={48} weight="light" />,
  },
  {
    title: "Affordable Pricing",
    description: "Transparent, competitive rates for premium services without compromising on quality.",
    icon: <Tag size={48} weight="light" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-aztec py-24 px-5 md:px-10 lg:px-20 text-wild-sand">
      <div className="mx-auto max-w-[1760px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-yellow-green font-semibold uppercase tracking-widest text-sm mb-4 block"
            >
              The Joseph.co Advantage
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white leading-[1.1]"
            >
              Why Discerning Clients <br />Choose Our Services
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xanadu text-lg max-w-sm"
          >
            Setting the benchmark for excellence in professional cleaning through a relentless commitment to quality and integrity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-aztec p-10 flex flex-col gap-8 group hover:bg-white/5 transition-colors duration-500"
            >
              <div className="text-yellow-green group-hover:scale-110 transition-transform duration-500 origin-left">
                {point.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl text-white font-medium tracking-tight">
                  {point.title}
                </h3>
                <p className="text-xanadu leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
