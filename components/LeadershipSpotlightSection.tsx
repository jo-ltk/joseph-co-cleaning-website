import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SectionTag from "./ui/SectionTag";

export default function LeadershipSpotlightSection() {
  return (
    <section className="landing-section landing-section--flush-top relative bg-aztec">
      <div className="relative mx-auto h-[400px] w-full overflow-hidden md:h-[460px] xl:h-[520px]">
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
          <div className="flex max-w-[980px] flex-col items-center gap-[var(--content-gap)] text-center">
            <h2 className="font-sans text-[2.45rem] font-normal leading-[0.98] tracking-[-0.08em] text-wild-sand sm:text-[3.2rem] md:text-[4.2rem] xl:text-[4.9rem]">
              <span className="block">Discover the Leaders Transforming</span>
              <span className="block">the Clean Energy Landscape</span>
            </h2>

            <div className="flex items-center gap-[2px]">
              <a
                href="#"
                className="inline-flex h-[48px] items-center rounded-full bg-yellow-green px-5 font-sans text-[0.98rem] font-medium tracking-[-0.04em] text-aztec"
              >
                View Leadership
              </a>
              <a
                href="#"
                aria-label="View Leadership"
                className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full bg-yellow-green text-aztec transition-transform duration-300 hover:translate-x-[2px]"
              >
                <ArrowUpRight size={20} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-wild-sand px-6 md:px-12 xl:px-20">
        <div className="mx-auto max-w-[1280px] py-[var(--section-spacing)]">
          <div className="flex flex-col gap-[var(--content-gap)]">
            <SectionTag>Our Impact</SectionTag>

            <h3 className="max-w-[1200px] font-sans text-[1.5rem] font-bold leading-[1.15] tracking-[-0.04em] text-aztec sm:text-[1.9rem] md:text-[2.5rem] xl:text-[2.9rem]">
              Hydra&apos;s clean energy solutions have made a lasting impact on
              communities and industries across the Americas, Asia, Europe,
              and beyond.
            </h3>

            <div className="flex items-center gap-[2px]">
              <a
                href="#"
                className="inline-flex h-[44px] items-center rounded-full bg-aztec px-5 font-sans text-[0.9rem] font-medium tracking-[-0.04em] text-wild-sand"
              >
                Learn More
              </a>
              <a
                href="#"
                aria-label="Learn More"
                className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-aztec text-wild-sand transition-transform duration-300 hover:translate-x-[2px]"
              >
                <ArrowUpRight size={18} weight="bold" />
              </a>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 md:mt-20 md:grid-cols-4">
            {[
              { value: "45%", label: "Carbon Reduction" },
              { value: "200+", label: "Global Projects" },
              { value: "500M", label: "Saved in Revenue" },
              { value: "25%", label: "Average ROI" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l border-aztec/15 pl-5 md:pl-6"
              >
                <p className="font-sans text-[2.4rem] font-bold leading-none tracking-[-0.06em] text-aztec sm:text-[3rem] md:text-[3.4rem] xl:text-[3.8rem]">
                  {item.value}
                </p>
                <p className="mt-3 font-sans text-[0.85rem] font-medium tracking-[-0.02em] text-xanadu md:text-[0.95rem]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
