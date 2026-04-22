import Image from "next/image";

const testimonials = [
  {
    name: "John M., Tech Lead",
    quote:
      '"The team\'s expertise turned our vague ideas into a comprehensive strategy. The project exceeded expectations, showcasing their commitment to excellence and innovation."',
    image: "/coach-conversation.png",
    alt: "Client portrait one",
  },
  {
    name: "Sophia L., Agency Owner",
    quote:
      '"Working with them was a game-changer for our agency. They delivered innovative solutions tailored to our needs, resulting in noticeable growth and a stronger online presence."',
    image: "/hero-cleaning-home.jpg",
    alt: "Client portrait two",
  },
  {
    name: "Emma R., Operations Director",
    quote:
      '"Their attention to detail and steady communication gave our team confidence from kickoff to launch. The final result felt sharp, thoughtful, and incredibly well executed."',
    image: "/equipment-vacuum-cleaning.jpg",
    alt: "Client portrait three",
  },
];

const marqueeCards = [...testimonials, ...testimonials];

function QuoteBadge() {
  return (
    <div className="relative h-[74px] w-[74px]">
      <div className="absolute inset-0 rounded-full bg-white" />
      <div className="absolute inset-[8px] rounded-full border-[8px] border-white/0 [box-shadow:0_-18px_0_0_#fff,0_18px_0_0_#fff,18px_0_0_0_#fff,-18px_0_0_0_#fff,13px_13px_0_0_#fff,-13px_13px_0_0_#fff,13px_-13px_0_0_#fff,-13px_-13px_0_0_#fff]" />
      <div className="absolute inset-0 flex items-center justify-center text-[2.45rem] font-semibold leading-none text-[#ff6138]">
        <span className="-mt-2 tracking-[-0.12em]">&ldquo;</span>
      </div>
    </div>
  );
}

export default function TestimonialsMarqueeSection() {
  return (
    <section className="overflow-hidden bg-[#f7f3ee] px-4 pb-10 pt-12 text-[#201c1b] md:px-6 md:pb-12 md:pt-14 xl:px-0 xl:pb-14 xl:pt-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-center text-center">
          <p className="rounded-[8px] bg-[#ff6a3d] px-3 py-2 font-sans text-[0.92rem] font-bold uppercase leading-none tracking-[0.02em] text-white">
            Our Client&apos;s
          </p>
          <h2 className="mt-5 max-w-[980px] font-heading text-[3rem] font-medium leading-[0.92] tracking-[-0.08em] text-[#211d1d] sm:text-[4rem] md:text-[5.2rem] xl:text-[5.45rem]">
            <span className="block">Relied on by Companies</span>
            <span className="block">Globally</span>
          </h2>
        </div>
      </div>

      <div className="mt-12 overflow-hidden xl:mt-14">
        <div className="testimonials-marquee-track flex gap-5 pl-4 md:gap-6 md:pl-6 xl:gap-9">
          {marqueeCards.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="flex h-[340px] w-[760px] shrink-0 overflow-hidden rounded-[28px] bg-[#ff6138] p-[18px] text-white md:h-[392px] md:w-[860px] md:rounded-[30px] xl:h-[478px] xl:w-[946px] xl:rounded-[31px]"
            >
              <div className="relative hidden h-full w-[39.7%] overflow-hidden rounded-[18px] md:block xl:rounded-[19px]">
                <Image
                  src={testimonial.image}
                  alt={testimonial.alt}
                  fill
                  sizes="380px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-1 items-center px-7 py-7 md:px-9 xl:px-10">
                <div className="w-full max-w-[470px]">
                  <QuoteBadge />
                  <p className="mt-11 font-sans text-[1.48rem] font-semibold leading-[1.5] tracking-[-0.065em] text-white md:text-[1.72rem] xl:text-[1.96rem]">
                    {testimonial.quote}
                  </p>
                  <p className="mt-8 font-sans text-[1.18rem] font-medium tracking-[-0.055em] text-white md:text-[1.28rem] xl:text-[1.36rem]">
                    - {testimonial.name}
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
