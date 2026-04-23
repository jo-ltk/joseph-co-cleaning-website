const industries = [
  {
    title: "Data Centers",
    summary:
      "Custom-built, energy-efficient data centre solutions tailored to high-performance digital infrastructure.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-[78px] w-[78px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m16 20 16-9 16 9-16 9-16-9Z" />
        <path d="M16 30l16 9 16-9" />
        <path d="M16 40l16 9 16-9" />
        <path d="M16 20v20" />
        <path d="M48 20v20" />
        <path d="m20 25 4 2" />
        <path d="m20 29 4 2" />
        <path d="m20 33 4 2" />
        <path d="m40 25 4-2" />
        <path d="m40 29 4-2" />
        <path d="m40 33 4-2" />
        <path d="m20 35 4 2" />
        <path d="m20 39 4 2" />
        <path d="m40 35 4-2" />
        <path d="m40 39 4-2" />
      </svg>
    ),
  },
  {
    title: "Cloud Infrastructure",
    summary:
      "Scalable digital backbone planning that supports resilient systems and long-term operational growth.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-[78px] w-[78px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 46a12 12 0 0 1 1.9-23.84A14.25 14.25 0 0 1 51 18.75a11 11 0 0 1 1.38 21.9H23Z" />
        <path d="M26 43c.95-3.2 3.38-5.94 7.34-8.23 2.95-1.71 5.93-2.98 7.59-5.61" />
        <path d="m35.5 17.5-3.3 4.33" />
        <path d="m43.5 21.5-2.25 3.12" />
      </svg>
    ),
  },
  {
    title: "Energy",
    summary:
      "Expertise in securing and managing low-cost, sustainable energy sources for high-demand industries.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-[78px] w-[78px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m19 25 15-9 15 9-15 9-15-9Z" />
        <path d="m15 21 15-9 15 9" />
        <path d="M22 29.25v9.5l12 7 12-7v-9.5" />
        <path d="M34 16v29.75" />
        <path d="m25 34 9 5.25 9-5.25" />
      </svg>
    ),
  },
  {
    title: "Renewables",
    summary:
      "Clean-energy project support shaped around modern infrastructure, efficiency, and future-ready systems.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-[78px] w-[78px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M33 17v26" />
        <path d="m33 22 8 6.5-8 2.4" />
        <path d="m33 26-8 6.6 8 2.1" />
        <path d="m33 33 11 9" />
        <path d="m33 35.5-9.5 8.5" />
        <path d="M27 47.5h12" />
        <path d="M16 49c3 1.75 5.37 1.75 8.37 0 3 1.75 5.37 1.75 8.38 0 3 1.75 5.37 1.75 8.37 0 3 1.75 5.38 1.75 8.38 0" />
        <path d="M19 54c2.02 1.04 3.61 1.04 5.63 0 2.02 1.04 3.61 1.04 5.62 0 2.02 1.04 3.61 1.04 5.63 0 2.02 1.04 3.61 1.04 5.63 0 2.02 1.04 3.61 1.04 5.62 0" />
      </svg>
    ),
  },
];

function IndustryCard({
  title,
  summary,
  icon,
}: {
  title: string;
  summary: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="group relative min-h-[360px] overflow-hidden bg-aztec/5 transition-colors duration-300 ease-out hover:bg-yellow-green">
      <button
        type="button"
        aria-label={`Expand ${title}`}
        className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-aztec/10 text-[2rem] font-light leading-none text-aztec transition-colors duration-300 group-hover:bg-aztec/20"
      >
        <span className="-mt-1 transition-transform duration-300 ease-out group-hover:rotate-45">
          +
        </span>
      </button>

      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-[32%] flex-col items-center px-6 text-center text-aztec transition-all duration-300 ease-out group-hover:translate-y-[-2rem] group-hover:opacity-0">
        <div className="flex h-[92px] items-center justify-center text-xanadu">
          {icon}
        </div>
        <h3 className="mt-12 max-w-[260px] font-sans text-[1.1rem] font-medium tracking-[-0.05em] text-aztec sm:text-[1.25rem] md:text-[1.45rem]">
          {title}
        </h3>
      </div>

      <div className="absolute inset-0 z-10 flex items-center px-10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
        <div className="max-w-[330px] text-aztec">
          <div className="mb-8 ml-12 h-5 w-5 text-[1.6rem] font-extralight leading-none text-pine-green">
            +
          </div>
          <p className="inline-block bg-aztec px-3 py-2 font-sans text-[0.85rem] font-semibold uppercase tracking-[-0.03em] text-yellow-green">
            Overview:
          </p>
          <p className="mt-8 font-sans text-[1.15rem] leading-[1.3] tracking-[-0.05em] text-aztec/80 md:text-[1.25rem]">
            {summary}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function IndustriesSection() {
  return (
    <section className="bg-wild-sand text-aztec">
      <div className="mx-auto w-full max-w-[1920px] px-5 py-5 md:px-5 md:py-6">
        <h2 className="text-aztec">
          Industries We Serve
        </h2>

        <div className="mt-12 grid gap-[10px] md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.title}
              title={industry.title}
              summary={industry.summary}
              icon={industry.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
