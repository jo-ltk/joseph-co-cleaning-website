import Image from "next/image";

export default function LeadershipSpotlightSection() {
  return (
    <section className="relative bg-[#0f0f0d]">
      <div className="relative mx-auto h-[520px] w-full overflow-hidden md:h-[640px] xl:h-[752px]">
        <Image
          src="/coach-conversation.png"
          alt="Two people in conversation"
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[rgba(18,16,12,0.36)]" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex max-w-[980px] flex-col items-center text-center">
            <h2 className="font-sans text-[2.45rem] font-normal leading-[0.98] tracking-[-0.08em] text-white sm:text-[3.2rem] md:text-[4.2rem] xl:text-[4.9rem]">
              <span className="block">Discover the Leaders Who Are</span>
              <span className="block">Transforming the Clean Energy</span>
              <span className="block">Landscape</span>
            </h2>

            <div className="mt-10 flex items-center gap-[2px]">
              <a
                href="#"
                className="inline-flex h-[48px] items-center rounded-full bg-[#e5ff8e] px-5 font-sans text-[0.98rem] font-medium tracking-[-0.04em] text-[#111]"
              >
                View Leadership
              </a>
              <a
                href="#"
                aria-label="View Leadership"
                className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#e5ff8e] text-[#111] transition-transform duration-300 hover:translate-x-[2px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-[12px] bg-white px-2 pb-2 pt-2 lg:grid-cols-[1.02fr_1fr]">
        <article className="relative min-h-[320px] overflow-hidden bg-[#ddff9a] md:min-h-[430px] xl:min-h-[758px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-95"
            style={{
              backgroundImage:
                "radial-gradient(circle at 100% 0%, transparent 0 34px, rgba(238,255,181,0.95) 34px 42px, transparent 42px 108px), repeating-radial-gradient(circle at 100% 0%, rgba(192,228,132,0.92) 0 92px, rgba(192,228,132,0.92) 92px 134px, rgba(231,255,170,0.92) 134px 176px, rgba(231,255,170,0.92) 176px 218px)",
            }}
          />

          <div className="relative flex h-full items-center justify-center px-8 py-16">
            <div className="flex items-center gap-3 text-[#17202a]">
              <h3 className="font-sans text-[2.5rem] font-normal leading-none tracking-[-0.075em] sm:text-[3.3rem] md:text-[4.2rem] xl:text-[4.5rem]">
                Our Numbers
              </h3>
              <svg
                viewBox="0 0 80 56"
                aria-hidden="true"
                className="mt-2 h-[34px] w-[52px] md:h-[42px] md:w-[64px] xl:h-[52px] xl:w-[78px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 28h62" />
                <path d="m47 10 18 18-18 18" />
              </svg>
            </div>
          </div>
        </article>

        <article className="grid min-h-[320px] grid-cols-2 bg-[#132325] px-8 py-10 text-[#e4ff9a] md:min-h-[430px] md:px-12 md:py-14 xl:min-h-[758px] xl:px-[72px] xl:py-[86px]">
          {[
            { value: "45%", label: "Carbon Reduction" },
            { value: "200+", label: "Global Projects" },
            { value: "500M", label: "Saved in Revenue" },
            { value: "25%", label: "Average Roi" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center px-4 py-8 md:px-6 md:py-10"
            >
              <div className="text-center">
                <p className="font-sans text-[3rem] font-semibold leading-none tracking-[-0.085em] sm:text-[4rem] md:text-[4.6rem] xl:text-[5rem]">
                  {item.value}
                </p>
                <p className="mt-6 font-sans text-[1rem] font-medium tracking-[-0.05em] text-[#dced95] md:text-[1.2rem] xl:text-[1.28rem]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
