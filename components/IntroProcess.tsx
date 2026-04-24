import { Phone, MagnifyingGlass, Truck } from "@phosphor-icons/react/dist/ssr";

const steps = [
  { title: "Book Your Service", description: "Easy online booking or a quick call to schedule your premium cleaning.", icon: <Phone size={44} weight="light" /> },
  { title: "Tailored Plan", description: "We assess your space to create a customized cleaning checklist that meets your exact needs.", icon: <MagnifyingGlass size={44} weight="light" /> },
  { title: "Pristine Results", description: "Our professional cleaners arrive on time and transform your space into a sanctuary.", icon: <Truck size={44} weight="light" /> },
];

export default function IntroProcess() {
  return (
    <section className="bg-wild-sand py-24 px-5 md:px-10 lg:px-20 text-aztec">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-y-12 lg:grid-cols-3 lg:items-start lg:gap-x-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center gap-4">
              {index < steps.length - 1 ? (
                <div className="pointer-events-none absolute right-[-18%] top-[12px] hidden text-xanadu lg:block">
                  <svg viewBox="0 0 170 52" aria-hidden="true" className="h-[52px] w-[170px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 26c36-6 79-6 122 0" />
                    <path d="m112 11 28 15-28 15" />
                  </svg>
                </div>
              ) : null}
              <div className="flex h-[74px] w-[156px] items-center justify-center rounded-full bg-yellow-green text-aztec">{step.icon}</div>
              <h3 className="text-xl md:text-2xl leading-[1.1] text-center text-aztec">{step.title}</h3>
              <p className="max-w-[352px] text-center text-base text-xanadu">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
