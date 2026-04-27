"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

import { X, Calculator } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";
import InstantEstimateModal from "./estimate/InstantEstimateModal";

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
  const [estimateOpen, setEstimateOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  // Listen for global estimate trigger
  useEffect(() => {
    const handleOpenEstimate = () => setEstimateOpen(true);
    window.addEventListener("open-estimate", handleOpenEstimate);
    return () => window.removeEventListener("open-estimate", handleOpenEstimate);
  }, []);

  // Smart scroll logic for premium hide/show behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileOpen) return; // Don't hide while menu is open

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    
    // Professionals threshold: ignore tiny movements
    const threshold = 15;
    
    if (latest < 80) {
      // Always show at the top of the page
      setIsHidden(false);
    } else if (diff > threshold) {
      // Scrolling down significantly: hide
      setIsHidden(true);
    } else if (diff < -threshold) {
      // Scrolling up significantly: show
      setIsHidden(false);
    }
  });

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
    <>
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -110, opacity: 0 }
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ 
          duration: 0.45, 
          ease: [0.22, 1, 0.36, 1], // Premium expo-out ease
          opacity: { duration: 0.3 }
        }}
        className="pointer-events-none fixed inset-x-0 top-0 z-30"
      >
        <nav className="mx-auto flex w-full max-w-[1920px] items-start justify-between px-5 pt-5 md:px-5">
          {/* ... existing nav content ... */}
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
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:hidden">
              <div className="flex items-center justify-between rounded-[12px] bg-white px-4 py-3.5 text-[#111713] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                <Link
                  href="/"
                  className="text-[1.02rem] font-medium tracking-[-0.06em]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  &copy;Joseph.co
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEstimateOpen(true)}
                    className="pointer-events-auto flex h-10 items-center gap-2 rounded-full bg-aztec/5 px-4 text-xs font-bold text-aztec transition hover:bg-aztec/10"
                  >
                    <Calculator size={16} weight="bold" />
                    Estimate
                  </button>
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto hidden items-center gap-3 md:flex"
          >
            <motion.button 
              whileHover={{ y: -2 }} 
              whileTap={{ scale: 0.98 }}
              onClick={() => setEstimateOpen(true)}
              className="flex items-center gap-2 rounded-full border border-aztec/10 bg-white px-6 py-3 text-sm font-bold text-aztec transition-all hover:bg-gray-50"
            >
              <Calculator size={18} weight="bold" />
              Instant Estimate
            </motion.button>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink
                href="/contact?source=Navbar"
                variant="primary"
                className="px-8"
              >
                Book Quote
              </ButtonLink>
            </motion.div>

            <motion.div whileHover={{ y: -2, rotate: 3 }} whileTap={{ scale: 0.96 }}>
              <IconButton
                href="/contact?source=Navbar"
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
                      <button
                        onClick={() => { setMobileOpen(false); setEstimateOpen(true); }}
                        className="block w-full text-[2.65rem] font-medium leading-[1.02] tracking-[-0.06em] transition-opacity hover:opacity-70"
                        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                      >
                        Instant Estimate
                      </button>
                    </li>

                    <li>
                      <Link
                        href="/contact?source=Navbar"
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
      </motion.header>

      <InstantEstimateModal isOpen={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </>
  );
}
