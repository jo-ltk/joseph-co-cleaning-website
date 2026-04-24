import { HardDrives, Cloud, Factory, Wind } from "@phosphor-icons/react/dist/ssr";

const industries = [
  {
    title: "Corporate Offices",
    summary:
      "Maintain a professional and healthy workspace with our comprehensive commercial cleaning solutions.",
    icon: <HardDrives size={64} weight="light" />,
  },
  {
    title: "Luxury Residential",
    summary:
      "Detailed care for high-end homes, ensuring every corner reflects the elegance of your living space.",
    icon: <Cloud size={64} weight="light" />,
  },
  {
    title: "Retail & Showrooms",
    summary:
      "Create an inviting atmosphere for your customers with pristine floors and spotless displays.",
    icon: <Factory size={64} weight="light" />,
  },
  {
    title: "Post-Construction",
    summary:
      "Final touch cleaning that transforms construction sites into move-in ready, immaculate properties.",
    icon: <Wind size={64} weight="light" />,
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
    <section className="landing-section bg-wild-sand text-aztec">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-5">
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
