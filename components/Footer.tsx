import Link from "next/link";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/areas-we-serve", label: "Areas We Serve" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "X" },
  { href: "#", label: "LinkedIn" },
];

const londonTime = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
}).format(new Date());

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-aztec text-yellow-green">
      <div aria-hidden="true" className="lime-plus-pattern h-[94px]" />

      <div className="mx-auto max-w-[1900px] px-5 pb-[var(--section-spacing)] pt-[var(--section-spacing)] md:px-8 lg:px-10 xl:px-7">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,620px)] lg:gap-20">
          <div className="max-w-[560px]">
            <p className="text-[1.05rem] text-yellow-green/90 sm:text-[1.45rem] md:text-[1.85rem] lg:text-[2rem]">
              Transform your space today! Contact us to
              <br />
              learn more about our bespoke cleaning
              <br />
              solutions tailored for you.
            </p>

            <div className="mt-8 flex">
              <div className="btn-pair">
                <ButtonLink href="/contact" variant="primary" className="text-white">
                  Book a Cleaning
                </ButtonLink>
                <IconButton href="/contact" aria-label="Book a Cleaning" size="md" className="text-white" />
              </div>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14 lg:justify-self-end">
            <div className="grid grid-cols-[92px_1fr] items-start gap-5">
              <p className="pt-1 font-mono text-[0.95rem] uppercase tracking-[-0.04em] text-[#e5ff99]">
                Pages
              </p>
               <ul className="space-y-3 text-[1.15rem] text-yellow-green/80 md:text-[1.35rem]">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-opacity duration-300 hover:opacity-75"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

             <div className="grid grid-cols-[92px_1fr] items-start gap-5">
              <p className="pt-1 font-mono text-[0.95rem] uppercase tracking-[-0.04em] text-yellow-green">
                Social
              </p>
              <ul className="space-y-3 text-[1.15rem] text-yellow-green/80 md:text-[1.35rem]">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-opacity duration-300 hover:opacity-75"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 pt-4 md:mt-20 md:flex-row md:items-end md:justify-between lg:mt-24">
            <div className="font-heading text-[4.9rem] font-medium leading-[0.88] tracking-[-0.085em] text-yellow-green sm:text-[6.5rem] md:text-[8rem] lg:text-[9rem] xl:text-[9.4rem]">
            Joseph.co
          </div>

           <div className="pb-3 text-right font-mono text-[0.9rem] uppercase tracking-[-0.04em] text-yellow-green/60 md:text-[1rem]">
            London: {londonTime} &nbsp;&nbsp; &copy;{new Date().getFullYear()} Joseph.co
            &nbsp; All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
