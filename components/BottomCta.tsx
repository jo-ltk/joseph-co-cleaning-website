import Link from "next/link";

const ctaImage = "/clean-space-living-room.jpg";

export default function BottomCta() {
  return (
    <section className="relative overflow-hidden bg-[#0f0d0a] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${ctaImage}")`,
          backgroundPosition: "center center",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,9,7,0.76)_0%,rgba(11,9,7,0.58)_32%,rgba(11,9,7,0.8)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,168,0.22),transparent_24%),linear-gradient(90deg,rgba(11,9,7,0.38)_0%,rgba(11,9,7,0.14)_50%,rgba(11,9,7,0.38)_100%)]" />

      <div className="relative mx-auto max-w-[1450px] px-5 py-18 text-center md:px-8 md:py-22 lg:px-12 lg:py-24">
        <h2 className="mx-auto max-w-[920px] font-heading text-[2.4rem] font-medium tracking-[-0.08em] text-white sm:text-[3rem] md:text-[3.7rem] lg:text-[4.25rem]">
          Ready For A Spotless Space?
        </h2>

        <p className="mx-auto mt-4 max-w-[700px] text-[1rem] font-medium tracking-[-0.04em] text-white/86 md:text-[1.2rem]">
          We&apos;ll help your home or workplace feel brighter, fresher, and
          professionally cared for.
        </p>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-white pl-7 pr-[6px] text-[1.02rem] font-semibold tracking-[-0.04em] text-[#111] transition hover:bg-white/92"
          >
            <span className="py-3.5">Let&apos;s Talk</span>
            <span className="ml-4 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-black text-white">
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
