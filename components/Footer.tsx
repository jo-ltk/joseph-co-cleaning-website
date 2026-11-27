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

const serviceLinks = [
  { href: "/services/domestic-cleaning", label: "Domestic Cleaning" },
  { href: "/services/commercial-cleaning", label: "Commercial Cleaning" },
  { href: "/services/end-of-tenancy-cleaning", label: "End of Tenancy" },
  { href: "/services/property-services", label: "Property Services" },
  { href: "/services/deep-cleaning", label: "Deep Cleaning" },
  { href: "/services/after-builders-cleaning", label: "After Builders" },
];

const socialLinks = [
  { href: "https://www.facebook.com/people/JosephCo-Ltd/61572054301932/", label: "Facebook", Icon: FacebookLogo },
  { href: "https://www.instagram.com/joseph_and_co_l.t.d?utm_source=qr", label: "Instagram", Icon: InstagramLogo },
];

const contactInfo = {
  email: "josephandcocleaningservicesltd@gmail.com",
  phone: "+44 7787 857305",
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
        {/* Brand + CTA on top; link columns get the full width below so nothing is squeezed on laptops */}
        <div className="flex flex-col gap-12 md:gap-16">

          <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-[680px] lg:col-span-8">
              <img src="/logo.png" alt="Joseph.co Logo" className="h-28 md:h-36 w-auto object-contain mb-0 md:-mb-4 brightness-0 invert opacity-90 scale-[1.2] origin-left" />
              <h2 className="relative z-10 mb-4 text-[1.75rem] leading-[1.1] tracking-tight text-yellow-green sm:text-3xl md:mb-6 md:text-4xl xl:text-5xl">
                Elevating the standards of clean.
              </h2>
              <p className="max-w-[60ch] text-[0.95rem] leading-relaxed text-yellow-green/70 md:text-base xl:text-lg">
                Joseph & Co provides bespoke cleaning and property services for the most discerning residential and commercial spaces across the South West. We combine traditional care with modern precision.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-4 lg:col-span-4 lg:justify-self-end">
              <div className="btn-pair">
                <ButtonLink href="/contact?source=Footer" variant="primary">Book Quote</ButtonLink>
                <IconButton href="/contact?source=Footer" aria-label="Book Quote" size="md" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-yellow-green/10 pt-10 sm:gap-x-10 md:grid-cols-3 md:pt-14 lg:grid-cols-[0.85fr_1.1fr_0.75fr_1.9fr] lg:gap-x-12 xl:gap-x-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-3 md:space-y-4">
              <span className="block font-mono text-sm uppercase tracking-widest text-yellow-green/40">Sitemap</span>
              <ul className="space-y-3 md:space-y-4">
                {pageLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm md:text-base transition-colors duration-300 hover:text-white">{link.label}</Link></li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.35 }} className="space-y-3 md:space-y-4">
              <span className="block font-mono text-sm uppercase tracking-widest text-yellow-green/40">Services</span>
              <ul className="space-y-3 md:space-y-4">
                {serviceLinks.map((link) => (
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="col-span-2 space-y-3 md:col-span-3 md:space-y-4 lg:col-span-1">
              <span className="block font-mono text-sm uppercase tracking-widest text-yellow-green/40">Contact</span>
              {/* Tablet: three items side by side; phone and desktop: stacked */}
              <div className="grid gap-3 text-sm md:grid-cols-3 md:gap-6 md:text-base lg:grid-cols-1 lg:gap-4">
                <a href={`mailto:${contactInfo.email}`} className="block transition-colors [overflow-wrap:anywhere] hover:text-white">
                  {/* Prefer wrapping before the @ rather than mid-word */}
                  {contactInfo.email.split("@")[0]}<wbr />@{contactInfo.email.split("@")[1]}
                </a>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="block whitespace-nowrap transition-colors hover:text-white">{contactInfo.phone}</a>
                <p className="text-yellow-green/60">{contactInfo.address}</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="border-t border-yellow-green/10 px-5 md:px-10 lg:px-20 pt-6 md:pt-8 pb-6 md:pb-8">
        <div className="relative overflow-hidden">
          <motion.p initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap font-heading text-[15vw] font-bold leading-[0.8] tracking-[-0.05em] text-yellow-green md:text-[18vw]">
            Joseph.co
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 md:mt-8 flex flex-col items-start justify-between gap-3 md:gap-4 font-mono text-sm uppercase tracking-wider text-yellow-green/50 md:flex-row md:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8">
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8">
            <Link href="/privacy-policy" className="hover:text-yellow-green">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-yellow-green">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
