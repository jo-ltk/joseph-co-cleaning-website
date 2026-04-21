import Image from "next/image";
import Link from "next/link";

const features = [
  "Free initial consultation",
  "1x per 2 weeks training plan update",
  "Coaching via the TrainingPeaks App",
  "Weekly checking",
];

export default function CoachingPlans() {
  return (
    <section className="relative z-30 -mt-10 overflow-hidden rounded-t-[34px] bg-[linear-gradient(180deg,#ece4d6_0%,#e6dccb_100%)] text-[#080808] shadow-[0_-20px_60px_rgba(18,14,10,0.08)] md:-mt-14 md:rounded-t-[42px] lg:-mt-20 lg:rounded-t-[52px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_20%_55%,rgba(255,255,255,0.18),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1450px] px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-20 lg:px-12 lg:pb-40 lg:pt-24">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-heading text-[3rem] font-medium tracking-[-0.08em] text-[#060606] sm:text-[4rem] lg:text-[4.7rem]">
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
              <p className="text-[1.1rem] font-medium tracking-[-0.035em] text-black/62 md:text-[1.2rem]">
                $59/month
              </p>

              <h3 className="mt-6 font-heading text-[3rem] font-medium tracking-[-0.08em] text-[#090909] md:text-[3.5rem]">
                Basic
              </h3>

              <ul className="mt-10 space-y-6 text-[1.28rem] font-medium tracking-[-0.04em] text-[#111111] md:text-[1.45rem]">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <span className="mt-[0.2em] inline-flex h-7 w-7 shrink-0 items-center justify-center text-black">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-black/10 bg-[#f4f3f0] pl-7 pr-[6px] text-[1.1rem] font-semibold tracking-[-0.04em] text-[#111] transition hover:bg-[#eceae5]"
                >
                  <span className="py-4">Get in touch</span>
                  <span className="ml-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-black text-white">
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
      </div>
    </section>
  );
}
