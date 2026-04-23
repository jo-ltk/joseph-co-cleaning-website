import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const features = [
  "Free initial consultation",
  "1x per 2 weeks training plan update",
  "Coaching via the TrainingPeaks App",
  "Weekly checking",
];

export default function CoachingPlans() {
  return (
    <section className="relative z-30 -mt-10 overflow-hidden rounded-t-[34px] bg-wild-sand text-aztec shadow-[0_-20px_60px_rgba(17,32,37,0.08)] md:-mt-14 md:rounded-t-[42px] lg:-mt-20 lg:rounded-t-[52px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_20%_55%,rgba(255,255,255,0.18),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1450px] px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-20 lg:px-12 lg:pb-40 lg:pt-24">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-aztec sm:text-[4rem] lg:text-[4.7rem]">
            Coaching plans
          </h2>
        </div>

        <div className="rounded-[34px] bg-white px-6 py-6 shadow-[0_18px_60px_rgba(19,17,15,0.06)] md:px-8 md:py-8 lg:px-6 lg:py-6">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(440px,640px)_minmax(0,1fr)] lg:gap-14">
            <div className="relative aspect-[1.08/1] overflow-hidden rounded-[28px]">
              <Image
                src="/equipment-vacuum-cleaning.jpg"
                alt="Professional cleaners using modern floor-cleaning equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>

            <div className="px-2 py-4 md:px-4 lg:px-6 lg:py-8">
              <p className="text-[1.1rem] font-medium tracking-[-0.035em] text-xanadu md:text-[1.2rem]">
                $59/month
              </p>

               <h3 className="mt-6 text-aztec md:text-[3.5rem]">
                Basic
              </h3>

               <ul className="mt-10 space-y-6 text-[1.12rem] font-medium text-aztec md:text-[1.25rem]">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                     <span className="mt-[0.2em] inline-flex h-7 w-7 shrink-0 items-center justify-center text-aztec">
                       <Check size={20} weight="bold" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                 <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-aztec/10 bg-wild-sand pl-7 pr-[6px] text-[1.1rem] font-semibold text-aztec transition hover:bg-aztec/5"
                >
                  <span className="py-4">Get in touch</span>
                  <span className="ml-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-aztec text-yellow-green">
                    <ArrowUpRight size={20} weight="bold" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
