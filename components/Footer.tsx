import Link from "next/link";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Projects" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Solutions" },
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
    <footer className="overflow-hidden bg-[#122124] text-[#e5ff99]">
      <div aria-hidden="true" className="lime-plus-pattern h-[94px]" />

      <div className="mx-auto max-w-[1900px] px-5 pb-4 pt-12 md:px-8 md:pb-5 md:pt-14 lg:px-10 lg:pt-16 xl:px-7">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,620px)] lg:gap-20">
          <div className="max-w-[560px]">
            <p className="font-sans text-[1.05rem] font-medium leading-[1.22] tracking-[-0.05em] text-[#ebffab] sm:text-[1.45rem] md:text-[1.85rem] lg:text-[2rem]">
              Start your project today! Contact us to
              <br />
              learn more and let&apos;s work together to
              <br />
              achieve your goals.
            </p>

            <div className="mt-8 flex">
              <Link href="/contact" className="inline-flex items-center gap-[2px]">
                <span className="inline-flex h-[50px] items-center rounded-full bg-[#e6ff9b] px-6 font-sans text-[0.98rem] font-medium tracking-[-0.04em] text-[#122124]">
                  Start a Project
                </span>
                <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#e6ff9b] text-[#122124] transition-transform duration-300 hover:translate-x-[2px]">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14 lg:justify-self-end">
            <div className="grid grid-cols-[92px_1fr] items-start gap-5">
              <p className="pt-1 font-mono text-[0.95rem] uppercase tracking-[-0.04em] text-[#e5ff99]">
                Pages
              </p>
              <ul className="space-y-3 font-sans text-[1.15rem] font-medium leading-[1.25] tracking-[-0.05em] text-[#efffb7] md:text-[1.35rem]">
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
              <p className="pt-1 font-mono text-[0.95rem] uppercase tracking-[-0.04em] text-[#e5ff99]">
                Social
              </p>
              <ul className="space-y-3 font-sans text-[1.15rem] font-medium leading-[1.25] tracking-[-0.05em] text-[#efffb7] md:text-[1.35rem]">
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
          <div className="font-heading text-[4.9rem] font-medium leading-[0.88] tracking-[-0.1em] text-[#e6ff9b] sm:text-[6.5rem] md:text-[8rem] lg:text-[9rem] xl:text-[9.4rem]">
            Joseph.co
          </div>

          <div className="pb-3 text-right font-mono text-[0.9rem] uppercase tracking-[-0.04em] text-[#e6ff9b] md:text-[1rem]">
            London: {londonTime} &nbsp;&nbsp; &copy;{new Date().getFullYear()} Joseph.co
            &nbsp; All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
