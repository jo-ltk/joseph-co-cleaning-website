import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

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

export default function TestimonialsMarqueeSection() {
  return (
    <section className="bg-wild-sand pb-16 pt-12 text-aztec md:pb-20 md:pt-16">
      <div className="mx-auto max-w-[1600px] px-6">
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

      {/* Marquee track - mask removed as requested */}
      <div className="mt-12 overflow-hidden md:mt-16">
        <div className="flex w-max gap-6 [animation:marqueeScroll_40s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeCards.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="group flex h-[320px] w-[600px] shrink-0 overflow-hidden rounded-[32px] border border-aztec/5 bg-aztec transition-all duration-500 hover:border-yellow-green/50 md:h-[360px] md:w-[680px] xl:h-[400px] xl:w-[760px]"
            >
              {/* Image panel */}
              <div className="relative w-[38%] shrink-0 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.alt}
                  fill
                  sizes="400px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-aztec/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
              </div>

              {/* Text panel */}
              <div className="flex flex-1 flex-col justify-between px-8 py-7 md:px-10 md:py-9 xl:px-12 xl:py-10">
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-green text-aztec shadow-lg shadow-yellow-green/10">
                    <Quotes size={24} weight="fill" />
                  </div>
                  <p className="font-sans text-[1.1rem] font-medium leading-[1.35] tracking-[-0.03em] text-wild-sand md:text-[1.25rem] xl:text-[1.4rem]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-yellow-green/30" />
                  <p className="text-[0.9rem] font-semibold uppercase tracking-wider text-yellow-green md:text-[0.95rem] xl:text-[1rem]">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}