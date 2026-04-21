import Image from "next/image";

const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "200+", label: "Athletes coached" },
  { value: "500+", label: "Race strategies" },
  { value: "10,000+", label: "Training hours" },
];

export default function ResultsSection() {
  return (
    <section className="relative min-h-screen bg-[#f5f3ef] text-[#090909]">
      <div className="mx-auto max-w-[1450px] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:pb-44 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,512px)] lg:gap-20">
          <div className="max-w-[820px]">
            <h2 className="font-heading text-[2.45rem] font-medium leading-[1.16] tracking-[-0.07em] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.05rem]">
              <span className="text-[#050505]">
                From beginners to seasoned pros, I create custom plans
              </span>{" "}
              <span className="text-[#8a8a8a]">
                tailored to help you unlock your full potential and succeed in
                races.
              </span>
            </h2>
          </div>

          <div className="justify-self-start lg:justify-self-end">
            <div className="relative aspect-[1.74/1] w-full max-w-[510px] overflow-hidden rounded-[24px]">
              <Image
                src="/clean-space-living-room.jpg"
                alt="Bright, professionally cleaned living room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 510px"
                priority={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 xl:mt-24 xl:grid-cols-4 xl:gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-black/14 pt-8">
              <p className="font-heading text-[4rem] font-medium leading-none tracking-[-0.08em] text-[#050505] sm:text-[4.35rem]">
                {stat.value}
              </p>
              <p className="mt-4 text-[1.15rem] font-medium tracking-[-0.04em] text-[#0d0d0d]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
