"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { CaretDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const navigationItems = [
  { href: "/gallery", label: "Projects" },
  { href: "/about", label: "Company" },
  { href: "/services", label: "Solutions" },
  { href: "/testimonials", label: "News" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex w-full max-w-[1920px] items-start justify-between px-5 pt-5 md:px-5">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto w-full md:max-w-[555px]"
        >
          <div className="hidden items-center rounded-[8px] bg-white px-5 py-6 text-[#111713] shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:flex">
            <Link
              href="/"
              className="shrink-0 text-[1.12rem] font-medium tracking-[-0.06em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              &copy;Hydra
            </Link>

            <ul
              className="ml-11 flex items-center gap-9 text-[0.95rem] font-medium tracking-[-0.05em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {navigationItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 transition hover:opacity-65"
                  >
                    <span>{item.label}</span>
                    {index === 1 ? (
                      <CaretDown
                        size={12}
                        className="transition group-hover:translate-y-[1px]"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden">
            <div className="flex items-center justify-between rounded-[8px] bg-white px-4 py-4 text-[#111713] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
              <Link
                href="/"
                className="text-[1.02rem] font-medium tracking-[-0.06em]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                &copy;Hydra
              </Link>

              <details className="relative">
                <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full transition hover:bg-black/5">
                  <span className="sr-only">Open navigation</span>
                  <span className="flex flex-col gap-[5px]">
                    <span className="block h-[2.5px] w-6 rounded-full bg-[#141914]" />
                    <span className="block h-[2.5px] w-6 rounded-full bg-[#141914]" />
                  </span>
                </summary>

                <div className="absolute right-0 top-full mt-3 w-[220px] rounded-[18px] bg-white/95 p-4 text-[#111713] shadow-[0_24px_65px_rgba(0,0,0,0.24)] backdrop-blur">
                  <ul
                    className="space-y-3 text-[0.95rem] font-medium tracking-[-0.04em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {navigationItems.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="block transition hover:opacity-65">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="mt-4 inline-flex h-11 items-center rounded-full bg-[#16231f] px-5 text-[0.95rem] font-medium tracking-[-0.05em] text-[#e8ff91] transition hover:bg-[#1c2d28]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Contact Us
                  </Link>
                </div>
              </details>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto hidden items-center gap-3 md:flex"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex h-[50px] items-center rounded-full bg-[#16231f] px-8 text-[0.95rem] font-medium tracking-[-0.05em] text-[#e8ff91] shadow-[0_20px_40px_rgba(0,0,0,0.16)] transition duration-300 hover:bg-[#1c2d28]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/contact"
              aria-label="Contact Us"
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#16231f] text-[#e8ff91] shadow-[0_20px_40px_rgba(0,0,0,0.16)] transition duration-300 hover:bg-[#1c2d28]"
            >
              <ArrowUpRight size={18} weight="bold" />
            </Link>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
}
