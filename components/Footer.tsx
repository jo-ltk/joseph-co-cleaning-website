"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/areas-we-cover", label: "Areas We Cover" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.facebook.com/people/JosephCo-Ltd/61572054301932/", label: "Facebook", Icon: FacebookLogo },
  { href: "https://www.instagram.com/joseph_and_co_l.t.d?utm_source=qr", label: "Instagram", Icon: InstagramLogo },
];

const contactInfo = {
  email: "JosephandCol.t.d@outlook.com",
  phone: "+44 7787857305",
  address: "TA6 4HW, 32 Willow Man Road, UK",
};

function getLondonTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).format(new Date());
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [londonTime, setLondonTime] = useState("--:--");

  useEffect(() => {
    setLondonTime(getLondonTime());
    const interval = window.setInterval(() => {
      setLondonTime(getLondonTime());
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="bg-aztec text-yellow-green selection:bg-yellow-green selection:text-aztec">
      <div className="h-px w-full bg-yellow-green/20" />
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-[1.2fr_0.8fr]">

          <div className="flex flex-col justify-between">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-[680px]">
              <h2 className="mb-5 md:mb-8 text-2xl md:text-4xl leading-[1.1] text-yellow-green">
                Elevating the standards of clean.
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-yellow-green/70">
                Joseph & Co provides bespoke cleaning services for the most discerning residential and commercial spaces across the South West. We combine traditional care with modern precision.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-8 md:mt-16 flex items-center gap-4">
              <div className="btn-pair">
                <ButtonLink href="/contact?source=Footer" variant="primary">Book Quote</ButtonLink>
                <IconButton href="/contact?source=Footer" aria-label="Book Quote" size="md" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-3 md:space-y-4">
              <span className="block font-mono text-sm uppercase tracking-widest text-yellow-green/40">Sitemap</span>
              <ul className="space-y-3 md:space-y-4">
                {pageLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm md:text-base transition-colors duration-300 hover:text-white">{link.label}</Link></li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-3 md:space-y-4">
              <span className="block font-mono text-sm uppercase tracking-widest text-yellow-green/40">Social</span>
              <ul className="space-y-3 md:space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-2 text-sm md:text-base transition-colors duration-300 hover:text-white"
                    >
                      <link.Icon size={20} weight="fill" className="text-yellow-green/60 transition-colors duration-300 group-hover:text-yellow-green" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="col-span-2 space-y-3 md:space-y-4 md:col-span-1">
              <span className="block font-mono text-sm uppercase tracking-widest text-yellow-green/40">Contact</span>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                <a href={`mailto:${contactInfo.email}`} className="block transition-colors hover:text-white truncate">{contactInfo.email}</a>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-white">{contactInfo.phone}</a>
                <p className="text-yellow-green/60">{contactInfo.address}</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="border-t border-yellow-green/10 px-5 md:px-10 lg:px-20 pt-6 md:pt-8 pb-6 md:pb-8">
        <div className="relative overflow-hidden">
          <motion.h1 initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap font-heading text-[15vw] font-bold leading-[0.8] tracking-[-0.05em] text-yellow-green md:text-[18vw]">
            Joseph.co
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 md:mt-8 flex flex-col items-start justify-between gap-3 md:gap-4 font-mono text-sm uppercase tracking-wider text-yellow-green/50 md:flex-row md:items-end">
          <div className="flex gap-6 md:gap-8">
            <span>London: {londonTime}</span>
            <div className="flex items-center gap-6 md:gap-8">
              <span>&copy; {currentYear}</span>
              <Link 
                href="/admin/login" 
                className="opacity-20 transition-opacity hover:opacity-100 hover:text-white"
              >
                Admin Access
              </Link>
            </div>
          </div>
          <div className="flex gap-6 md:gap-8">
            <Link href="/privacy-policy" className="hover:text-yellow-green">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-yellow-green">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
