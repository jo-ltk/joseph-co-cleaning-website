import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function BottomCta() {
  return (
    <section className="lime-plus-pattern relative overflow-hidden text-[#101814]">

      <div className="relative mx-auto max-w-[1450px] px-5 py-12 text-center md:px-8 md:py-14 lg:px-12 lg:py-16">
        <p className="section-label rounded-full">
          Contact
        </p>

        <h2 className="mx-auto mt-6 max-w-[760px] text-aztec sm:text-[2.7rem] md:text-[3.2rem] lg:text-[3.6rem]">
          <span className="block">Ready For A Spotless Space?</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[620px] text-xanadu md:text-[1.08rem]">
          We&apos;ll help your home or workplace feel brighter, fresher, and
          professionally cared for.
        </p>

        <div className="mt-7 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-[2px]"
          >
            <span className="btn-pill btn-pill-dark">
              Get In Touch
            </span>
            <span className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#152225] text-[#e6ff9b] transition-transform duration-300 hover:translate-x-[2px]">
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
