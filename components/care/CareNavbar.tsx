"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

import CareLogo from "./CareLogo";
import { useCareUi } from "./CareUi";

export default function CareNavbar() {
  const { openRequest } = useCareUi();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const isHome = pathname === "/care";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const threshold = 15;

    if (latest < 80) {
      setIsHidden(false);
    } else if (diff > threshold) {
      setIsHidden(true);
    } else if (diff < -threshold) {
      setIsHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -110, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.3 },
        }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <nav className="mx-auto flex w-full max-w-[1920px] items-start px-5 pt-5">
          <div className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-3.5 text-[#0B1C2C] shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:rounded-[8px] md:px-5 md:py-5">
            <CareLogo />

            <p className="hidden items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--cc-blue)] sm:inline-flex">
              <span className="care-nav-pulse" aria-hidden />
              Desk open 24/7
            </p>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/care/apply"
                className="hidden care-btn care-btn-secondary px-4 sm:inline-flex"
              >
                I&apos;m a clinician
              </Link>
              <button type="button" className="care-btn care-btn-primary" onClick={openRequest}>
                Find Staff
              </button>
            </div>
          </div>
        </nav>
      </motion.header>
      {!isHome ? <div className="h-24" aria-hidden /> : null}
    </>
  );
}
