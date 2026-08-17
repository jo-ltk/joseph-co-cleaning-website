"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Equals, X } from "@phosphor-icons/react/dist/ssr";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import CareButton from "./CareButton";
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto w-full max-w-[1920px] px-3 pt-3 sm:px-5 sm:pt-4">
          <div
            ref={menuRef}
            className={`pointer-events-auto relative${isHome ? "" : " care-nav--light"}`}
          >
            <motion.div
              className="care-nav-glass"
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
            >
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

                <CareButton onClick={openRequest}>Find Staff</CareButton>

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
            </motion.div>

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
                  <CareButton
                    href="/care/apply"
                    variant="ghost"
                    surface={isHome ? "dark" : "light"}
                    role="menuitem"
                    className={pathname === "/care/apply" ? "is-active" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    Join Our Team
                  </CareButton>
                  <CareButton
                    role="menuitem"
                    surface={isHome ? "dark" : "light"}
                    onClick={() => {
                      setMenuOpen(false);
                      openRequest();
                    }}
                  >
                    Find Staff
                  </CareButton>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </header>
      {!isHome ? <div className="h-24" aria-hidden /> : null}
    </>
  );
}
