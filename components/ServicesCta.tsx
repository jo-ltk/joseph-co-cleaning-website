"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import ScrollReveal from "./ScrollReveal";

export default function ServicesCta() {
  return (
    <section className="bg-aztec relative overflow-hidden py-24 text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-green/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pine-green/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative mx-auto flex max-w-[1450px] flex-col items-center px-5 md:px-10 lg:px-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-yellow-green font-semibold uppercase tracking-widest text-sm mb-6 block"
        >
          Get In Touch
        </motion.span>
        
        <ScrollReveal
          as="h2"
          enableBlur={true}
          blurStrength={10}
          containerClassName="mx-auto max-w-[900px] text-balance text-4xl md:text-6xl lg:text-7xl leading-[1.05] font-medium tracking-tight text-white mb-10"
        >
          Need Professional Cleaning You Can Rely On?
        </ScrollReveal>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <ButtonLink href="/contact?source=Services CTA Block" variant="primary" className="px-12">Book Quote</ButtonLink>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <ButtonLink href="tel:+0123456789" variant="secondary" className="px-12 bg-white !text-aztec hover:bg-gray-100">Call Now</ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
