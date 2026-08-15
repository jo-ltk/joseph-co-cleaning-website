import Link from "next/link";

import CareLogo from "./CareLogo";
import { careBrand } from "@/lib/care";

const links = [
  { href: "/care/apply", label: "Clinicians" },
  { href: "/care/privacy", label: "Privacy Policy" },
  { href: "/care/terms", label: "Terms" },
];

export default function CareFooter() {
  return (
    <footer className="bg-[var(--cc-navy)] text-[var(--cc-white)]">
      <div className="care-wrap grid gap-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-24 lg:gap-12">
        <div>
          <CareLogo inverted />
          <p className="mt-6 max-w-md text-base leading-relaxed !text-white/65 md:text-lg">
            {careBrand.description}
          </p>
        </div>
        <div className="self-start pt-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/45">Staffing desk</p>
          <a
            href={`tel:${careBrand.phoneTel}`}
            className="mt-3 block text-xl font-medium tracking-tight text-white"
          >
            {careBrand.phoneDisplay}
          </a>
          <a href={`mailto:${careBrand.email}`} className="mt-1 block text-sm text-white/70 hover:text-white">
            {careBrand.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="care-wrap flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p className="!text-white/45">© {new Date().getFullYear()} Care Connect. All rights reserved.</p>
          <p className="!text-white/45">{careBrand.address}</p>
        </div>
      </div>
    </footer>
  );
}
