"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { CaretDown, X } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/areas-we-cover", label: "Areas We Cover" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex w-full max-w-[1920px] items-start justify-between px-5 pt-5 md:px-5">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto w-full md:w-max"
        >
          <div className="hidden items-center rounded-[8px] bg-white px-5 py-6 text-[#111713] shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:flex">
            <Link
              href="/"
              className="shrink-0 text-[1.12rem] font-medium tracking-[-0.06em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              &copy;Joseph.co
            </Link>

            <ul
              className="ml-11 flex items-center gap-7 text-[0.95rem] font-medium tracking-[-0.05em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {navigationItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 transition hover:opacity-65 whitespace-nowrap"
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
                &copy;Joseph.co
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-black/5"
                aria-label="Open navigation"
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
              >
                <span className="flex flex-col gap-[5px]" aria-hidden="true">
                  <span className="block h-[2.5px] w-6 rounded-full bg-[#141914]" />
                  <span className="block h-[2.5px] w-6 rounded-full bg-[#141914]" />
                </span>
              </button>
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
            <ButtonLink
              href="/contact"
              variant="primary"
              className="px-8"
            >
              Book Quote
            </ButtonLink>
          </motion.div>

          <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
            <IconButton
              href="/contact"
              aria-label="Book Quote"
              size="md"
            />
          </motion.div>
        </motion.div>
      </nav>

      {mobileOpen ? (
        <div className="pointer-events-auto fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute inset-0 overflow-y-auto bg-[#e9e6e1] text-[#111713]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <div className="mx-auto flex min-h-full max-w-[560px] flex-col px-6 pb-8 pt-7">
              <div className="flex items-start justify-between">
                <Link
                  href="/"
                  className="text-[1.1rem] font-semibold tracking-[-0.06em]"
                  onClick={() => setMobileOpen(false)}
                >
                  &copy;Joseph.co
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-black/5"
                  aria-label="Close navigation"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="mt-10 text-center">
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#111713]/75">
                  Menu
                </p>
              </div>

              <div className="mt-8 flex flex-1 flex-col">
                <ul className="space-y-5 text-center">
                  {navigationItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[2.65rem] font-medium leading-[1.02] tracking-[-0.06em] transition-opacity hover:opacity-70"
                        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                      >
                        {item.label === "Company" ? "About Us" : item.label}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="block text-[2.65rem] font-medium leading-[1.02] tracking-[-0.06em] transition-opacity hover:opacity-70"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      Book Quote
                    </Link>
                  </li>
                </ul>

                <div className="mt-auto grid grid-cols-1 gap-8 pt-14 text-center sm:grid-cols-2 sm:gap-10 sm:text-left">
                  <div className="flex flex-col items-center sm:items-start">
                    <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#111713]/75">
                      Follow us
                    </p>
                    <ul className="mt-5 space-y-3 text-[1.15rem] font-medium tracking-[-0.03em] text-[#111713]/85">
                      <li>
                        <Link href="#" className="transition-opacity hover:opacity-70">
                          Instagram
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="transition-opacity hover:opacity-70">
                          X
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="transition-opacity hover:opacity-70">
                          Linkedin
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-center sm:items-start">
                    <p className="text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-[#111713]/75">
                      Email us
                    </p>
                    <p className="mt-5 text-[1.15rem] font-medium tracking-[-0.03em] text-[#111713]/85">
                      contact@joseph.co
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
