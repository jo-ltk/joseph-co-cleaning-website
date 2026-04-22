const steps = [
  {
    title: "Call us 555-0123",
    description: "We remain available 24/7 for any plumbing emergency.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[68px] w-[68px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3.4a2 2 0 0 1-.6 1.8l-1.6 1.6a16 16 0 0 0 6.4 6.4l1.6-1.6a2 2 0 0 1 1.8-.6l3.4.5A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
  },
  {
    title: "Expert evaluation",
    description: "Our experts will evaluate the situation and look for solutions.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[68px] w-[68px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="4.5" r="2.8" />
        <path d="M12 7.8v4.1" />
        <path d="m12 9.5-4.7 4.1" />
        <path d="m12 9.5 4.7 4.1" />
        <path d="m10.3 12.2-2 7.1" />
        <path d="m13.7 12.2 2 7.1" />
      </svg>
    ),
  },
  {
    title: "We arrive in 30 minutes",
    description: "Our team will arrive with all the necessary equipment.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[68px] w-[68px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7h10v7H3z" />
        <path d="M13 9h4l3 3v2h-7z" />
        <circle cx="8" cy="18" r="2.3" />
        <circle cx="18" cy="18" r="2.3" />
        <path d="M13 16h2.7" />
        <path d="M13 7V4h8v10" />
      </svg>
    ),
  },
];

export default function IntroProcess() {
  return (
    <section className="bg-[#f5f3ef] text-[#090909]">
      <div className="mx-auto max-w-[1920px] px-[10px] py-[56px] md:py-[74px]">
        <div className="grid gap-y-[46px] md:gap-y-[54px] lg:grid-cols-3 lg:items-start lg:gap-x-[34px]">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center">
              {index < steps.length - 1 ? (
                <div className="pointer-events-none absolute right-[-18%] top-[12px] hidden text-[#c7c1b1] lg:block">
                  <svg
                    viewBox="0 0 170 52"
                    aria-hidden="true"
                    className="h-[52px] w-[170px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 26c36-6 79-6 122 0" />
                    <path d="m112 11 28 15-28 15" />
                  </svg>
                </div>
              ) : null}

              <div className="flex h-[74px] w-[156px] items-center justify-center rounded-full bg-[#f0d95e] text-[#090909]">
                {step.icon}
              </div>

              <h3 className="mt-[34px] text-center font-sans text-[30px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#090909]">
                {step.title}
              </h3>

              <p className="mt-[22px] max-w-[352px] text-center font-sans text-[22px] font-normal leading-[1.6] tracking-[-0.03em] text-[#5f5a53]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
