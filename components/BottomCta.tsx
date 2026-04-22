import Link from "next/link";

export default function BottomCta() {
  return (
    <section className="lime-plus-pattern relative overflow-hidden text-[#101814]">

      <div className="relative mx-auto max-w-[1450px] px-5 py-12 text-center md:px-8 md:py-14 lg:px-12 lg:py-16">
        <p className="mx-auto inline-flex bg-[#16231c] px-3.5 py-2.5 font-sans text-[0.82rem] font-semibold uppercase leading-none tracking-[-0.03em] text-[#e6ff9b]">
          Contact
        </p>

        <h2 className="mx-auto mt-6 max-w-[760px] font-heading text-[2.15rem] font-medium leading-[0.98] tracking-[-0.07em] text-black sm:text-[2.7rem] md:text-[3.2rem] lg:text-[3.6rem]">
          <span className="block">Ready For A Spotless Space?</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[620px] font-sans text-[0.98rem] font-medium leading-[1.45] tracking-[-0.03em] text-[#38453c] md:text-[1.08rem]">
          We&apos;ll help your home or workplace feel brighter, fresher, and
          professionally cared for.
        </p>

        <div className="mt-7 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-[2px]"
          >
            <span className="inline-flex h-[44px] items-center rounded-full bg-[#152225] px-5 font-sans text-[0.95rem] font-semibold tracking-[-0.04em] text-[#e6ff9b] transition-colors duration-300 hover:bg-[#101916]">
              Get In Touch
            </span>
            <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#152225] text-[#e6ff9b] transition-transform duration-300 hover:translate-x-[2px]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4.5 w-4.5"
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
    </section>
  );
}
