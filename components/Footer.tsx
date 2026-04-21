import Link from "next/link";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Coaching" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", label: "Twitter" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      <div className="mx-auto grid max-w-[1450px] gap-16 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1.35fr)_180px_160px] lg:gap-24 lg:px-12 lg:py-32">
        <div className="max-w-[520px]">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-white/95">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 5a1.75 1.75 0 1 0 0-3.5A1.75 1.75 0 0 0 13 5Z" />
                <path d="m6 11 3.3-3.2 2.8 1 2.4 3.2 3.5.9" />
                <path d="m8.3 17.8 2.5-4.4" />
                <path d="m12.8 10.1-1.1 6.4" />
                <path d="m16.5 7.7 2 2.3" />
              </svg>
            </span>
            <span className="font-heading text-[1.55rem] font-semibold tracking-[-0.06em]">
              Joseph &amp; Co
            </span>
          </div>

          <p className="mt-10 max-w-[430px] text-[1.12rem] leading-[1.55] tracking-[-0.035em] text-white/68 md:text-[1.18rem]">
            Improve your home or workspace with detail-focused cleaning
            services delivered with care, consistency, and a polished finish.
          </p>

          <p className="mt-10 text-[1.05rem] tracking-[-0.03em] text-white/60">
            Created by <span className="font-semibold text-white">Joseph &amp; Co</span>
          </p>
        </div>

        <div>
          <h3 className="font-heading text-[1.2rem] font-medium tracking-[-0.05em] text-white">
            Sections
          </h3>
          <ul className="mt-8 space-y-5 text-[1.1rem] tracking-[-0.035em] text-white/72">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-[1.2rem] font-medium tracking-[-0.05em] text-white">
            Socials
          </h3>
          <ul className="mt-8 space-y-5 text-[1.1rem] tracking-[-0.035em] text-white/72">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
