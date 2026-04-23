import Link from "next/link";
import { ButtonLink } from "./ui/Button";
import IconButton from "./ui/IconButton";
import SectionTag from "./ui/SectionTag";

export default function BottomCta() {
  return (
    <section className="landing-section lime-plus-pattern relative overflow-hidden text-[#101814]">

      <div className="relative mx-auto flex max-w-[1450px] flex-col items-center gap-[var(--content-gap)] px-5 text-center md:px-8 lg:px-12">
        <SectionTag className="bg-yellow-green text-aztec">Contact</SectionTag>

        <h2 className="mx-auto max-w-[760px] text-aztec">
          <span className="block">Ready For A Spotless Space?</span>
        </h2>

        <p className="mx-auto max-w-[620px] text-aztec">
          We&apos;ll help your home or workplace feel brighter, fresher, and
          professionally cared for.
        </p>

        <div className="flex justify-center">
          <div className="btn-pair">
            <ButtonLink href="/contact" variant="primary" className="text-white">
              Get In Touch
            </ButtonLink>
            <IconButton
              href="/contact"
              aria-label="Get In Touch"
              size="md"
              className="text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
