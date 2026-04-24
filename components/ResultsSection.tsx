import Image from "next/image";

const stats = [
  { value: "10+", label: "Years of excellence" },
  { value: "500+", label: "Properties cleaned" },
  { value: "100%", label: "Satisfaction rate" },
  { value: "15,000+", label: "Service hours" },
];

export default function ResultsSection() {
  return (
    <section className="landing-section relative min-h-screen bg-wild-sand text-aztec">
      <div className="mx-auto max-w-[1450px] px-5 md:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,512px)] lg:gap-20">
          <div className="max-w-[820px]">
            <h2 className="leading-[0.95]">
              <span className="text-aztec">
                From private residences to corporate headquarters, we create 
                bespoke cleaning schedules
              </span>{" "}
              <span className="text-xanadu">
                tailored to maintain your space at the highest standard of 
                hygiene and presentation.
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
            <div key={stat.label} className="border-t border-aztec/14 pt-8">
              <p className="text-[4rem] text-aztec sm:text-[4.35rem]">
                {stat.value}
              </p>
              <p className="mt-4 text-[1.15rem] text-aztec">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
