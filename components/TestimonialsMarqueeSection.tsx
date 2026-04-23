import Image from "next/image";

const testimonials = [
  {
    name: "John M., Tech Lead",
    quote:
      "The team's expertise turned our vague ideas into a comprehensive strategy. The project exceeded expectations, showcasing their commitment to excellence and innovation.",
    image: "/coach-conversation.png",
    alt: "Client portrait one",
  },
  {
    name: "Sophia L., Agency Owner",
    quote:
      "Working with them was a game-changer for our agency. They delivered innovative solutions tailored to our needs, resulting in noticeable growth and a stronger online presence.",
    image: "/hero-cleaning-home.jpg",
    alt: "Client portrait two",
  },
  {
    name: "Emma R., Operations Director",
    quote:
      "Their attention to detail and steady communication gave our team confidence from kickoff to launch. The final result felt sharp, thoughtful, and incredibly well executed.",
    image: "/equipment-vacuum-cleaning.jpg",
    alt: "Client portrait three",
  },
];

const marqueeCards = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

function QuoteIcon() {
  return (
    <div className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wild-sand">
      <svg
        viewBox="0 0 14 11"
        className="h-3.5 w-4 fill-[#e5ff8e]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 11V6.6C0 2.95 2.1 0.7 6.3 0L7 1.4C4.9 1.85 3.7 3.15 3.5 5.25H6.3V11H0ZM7.7 11V6.6C7.7 2.95 9.8 0.7 14 0L14.7 1.4C12.6 1.85 11.4 3.15 11.2 5.25H14V11H7.7Z" />
      </svg>
    </div>
  );
}

export default function TestimonialsMarqueeSection() {
  return (
    <section className="overflow-hidden bg-wild-sand px-4 pb-10 pt-9 text-aztec md:px-6 md:pb-12 md:pt-10 xl:px-0 xl:pb-14 xl:pt-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-center text-center">
          <p className="section-label rounded-full">
            Our Clients
          </p>
          <h2 className="mt-4 text-aztec">
            <span className="block">Relied on by Companies</span>
            <span className="block">Globally</span>
          </h2>
        </div>
      </div>

      {/* Marquee track with fade edges */}
      <div
        className="mt-9 overflow-hidden xl:mt-10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="flex w-max gap-5 [animation:marqueeScroll_32s_linear_infinite] hover:[animation-play-state:paused] md:gap-6">
          {marqueeCards.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="flex h-[300px] w-[580px] shrink-0 overflow-hidden rounded-[24px] bg-aztec md:h-[340px] md:w-[660px] xl:h-[380px] xl:w-[740px]"
            >
              {/* Image panel */}
              <div className="relative w-[40%] shrink-0 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.alt}
                  fill
                  sizes="300px"
                  className="object-cover object-center"
                />
              </div>

              {/* Text panel */}
              <div className="flex flex-1 flex-col justify-between px-7 py-6 md:px-8 md:py-7 xl:px-9 xl:py-8">
                <div>
                  <QuoteIcon />
                  <p className="text-[1.05rem] font-medium text-yellow-green md:text-[1.18rem] xl:text-[1.3rem]">
                    {testimonial.quote}
                  </p>
                </div>
                <p className="mt-5 text-[0.9rem] font-medium text-wild-sand/70 md:text-[0.95rem] xl:text-[1rem]">
                  — {testimonial.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Add to globals.css:
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      */}
    </section>
  );
}