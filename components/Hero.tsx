import Link from "next/link";

const heroImage = "/hero-cleaning-home.jpg";

export default function Hero() {
  return (
    <section className="flex h-screen items-stretch overflow-hidden bg-[#120f0c]">
      <div className="relative flex h-full w-full items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${heroImage}")`,
            backgroundPosition: "center center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,12,8,0.78)_0%,rgba(17,12,8,0.38)_34%,rgba(17,12,8,0.18)_56%,rgba(17,12,8,0.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_42%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_78%_72%,rgba(251,218,159,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.3)_100%)]" />

        <div className="relative z-[1] mx-auto flex w-full max-w-[1450px] px-5 pb-16 pt-28 md:px-8 md:pt-32 lg:px-12 lg:pt-36">
          <div className="max-w-[700px]">
            <div className="flex items-center gap-4 text-white/95">
              <span className="h-px w-[60px] bg-white/95 md:w-[72px]" />
              <p className="font-heading text-[1.15rem] font-medium tracking-[-0.035em] md:text-[1.25rem]">
                Experienced triathlon coach
              </p>
            </div>

            <h1 className="mt-10 max-w-[640px] font-heading text-[3.7rem] font-medium leading-[0.92] tracking-[-0.075em] text-white sm:text-[4.4rem] md:text-[5.4rem] lg:text-[6.1rem]">
              Level Up Your Performance
            </h1>

            <p className="mt-8 max-w-[720px] text-balance font-heading text-[1.25rem] font-medium leading-[1.35] tracking-[-0.04em] text-white/92 md:text-[1.38rem]">
              Improve your triathlon performance with personalized training
              plans guided by an experienced coach committed to your success.
            </p>

            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white pl-7 pr-[6px] text-[1.12rem] font-semibold tracking-[-0.035em] text-[#111] shadow-glow transition hover:bg-white/90"
              >
                <span className="py-5">Start now</span>
                <span className="ml-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-black text-white">
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
        </div>
      </div>
    </section>
  );
}
