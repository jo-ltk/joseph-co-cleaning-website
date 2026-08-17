"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Equals, X, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import CareLogo from "./CareLogo";
import { useCareUi } from "./CareUi";

const navLinks = [
  { href: "/care#services", label: "Services" },
  { href: "/care#facilities", label: "Facilities" },
  { href: "/care#why-us", label: "Why us" },
];

function isNavLinkActive(pathname: string, hash: string, href: string) {
  if (href.startsWith("/care#")) {
    return pathname === "/care" && hash === href.slice("/care".length);
  }

  return pathname === href;
}

export default function CareNavbar() {
  const { openRequest } = useCareUi();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/care";

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const threshold = 15;

    if (latest < 80 || menuOpen) {
      setIsHidden(false);
    } else if (diff > threshold) {
      setIsHidden(true);
    } else if (diff < -threshold) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
        <nav className="mx-auto w-full max-w-[1920px] px-3 pt-3 sm:px-5 sm:pt-4">
          <div ref={menuRef} className="pointer-events-auto relative">
            <div className="care-nav-glass">
              <CareLogo compact />

              <div className="flex shrink-0 items-center gap-2">
                <div className="care-nav-links" aria-label="Primary">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={isNavLinkActive(pathname, hash, link.href) ? "is-active" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <button type="button" className="care-btn care-btn-primary" onClick={openRequest}>
                  <span className="care-btn-label">Find Staff</span>
                  <span className="care-btn-hero-icon" aria-hidden>
                    <ArrowRight size={16} weight="bold" />
                  </span>
                </button>

                <button
                  type="button"
                  className="care-nav-menu-btn"
                  aria-expanded={menuOpen}
                  aria-controls="care-nav-menu"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  {menuOpen ? <X size={18} weight="bold" /> : <Equals size={20} weight="bold" />}
                </button>
              </div>
            </div>

            {menuOpen ? (
              <div id="care-nav-menu" className="care-nav-dropdown" role="menu">
                <div className="care-nav-dropdown-links">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className={`lg:hidden${isNavLinkActive(pathname, hash, link.href) ? " is-active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/care/apply"
                    role="menuitem"
                    className={`care-btn care-btn-primary${pathname === "/care/apply" ? " is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    I&apos;m a clinician
                    <span className="care-btn-hero-icon" aria-hidden>
                      <ArrowRight size={16} weight="bold" />
                    </span>
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    className="care-btn care-btn-secondary"
                    onClick={() => {
                      setMenuOpen(false);
                      openRequest();
                    }}
                  >
                    Request staff
                    <span className="care-btn-hero-icon" aria-hidden>
                      <ArrowRight size={16} weight="bold" />
                    </span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </motion.header>
      {!isHome ? <div className="h-24" aria-hidden /> : null}
    </>
  );
}
