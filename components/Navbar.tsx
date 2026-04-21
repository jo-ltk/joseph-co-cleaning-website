import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-10">
      <nav className="mx-auto flex w-full max-w-[1450px] flex-wrap items-center justify-between gap-6 px-5 py-5 text-white md:px-8 lg:px-12">
        <div className="flex items-center gap-5 md:gap-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-[1.65rem] font-bold tracking-[-0.04em]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-white/95 backdrop-blur-sm">
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
            <span className="font-heading text-[1.2rem] font-extrabold">Perform</span>
          </Link>
          <span className="hidden h-8 w-px bg-white/35 md:block" />
          <ul className="hidden items-center gap-10 text-[1.05rem] font-medium tracking-[-0.03em] text-white/95 md:flex">
            <li>
              <Link href="/services" className="transition hover:text-white/75">
                Coaching
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="transition hover:text-white/75">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-white/75">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white/75">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/contact"
          className="rounded-full border border-white/10 bg-[rgba(153,121,80,0.45)] px-6 py-3 text-[1.05rem] font-semibold tracking-[-0.03em] text-white backdrop-blur-md transition hover:bg-[rgba(173,139,94,0.6)] md:px-8"
        >
          Get template
        </Link>

        <ul className="flex w-full items-center gap-6 overflow-x-auto pb-1 text-[0.96rem] font-medium tracking-[-0.03em] text-white/90 md:hidden">
          <li className="shrink-0">
            <Link href="/services" className="transition hover:text-white/75">
              Coaching
            </Link>
          </li>
          <li className="shrink-0">
            <Link href="/testimonials" className="transition hover:text-white/75">
              Reviews
            </Link>
          </li>
          <li className="shrink-0">
            <Link href="/about" className="transition hover:text-white/75">
              About
            </Link>
          </li>
          <li className="shrink-0">
            <Link href="/contact" className="transition hover:text-white/75">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
