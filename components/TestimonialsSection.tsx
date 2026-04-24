"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

const testimonials = [
  {
    name: "Jonathan Reeves",
    location: "London, UK",
    quote: "Joseph.co has transformed our estate maintenance. Their attention to detail is unparalleled and consistently perfect.",
    image: "/coach-conversation.png",
    alt: "Client portrait one",
  },
  {
    name: "Marcus Thorne",
    location: "New York, USA",
    quote: "The most professional cleaning team we've ever engaged. Immaculate results that our staff noticed instantly.",
    image: "/hero-cleaning-home.jpg",
    alt: "Client portrait two",
  },
  {
    name: "Sofia Moretti",
    location: "Milan, Italy",
    quote: "Pristine standards for our boutique showroom. They understand the luxury market better than any other service.",
    image: "/equipment-vacuum-cleaning.jpg",
    alt: "Client portrait three",
  },
  {
    name: "Isabella Chen",
    location: "Singapore",
    quote: "Efficiency paired with absolute quality. Their multi-point protocol ensures every corner reflects our brand's excellence.",
    image: "/clean-space-living-room.jpg",
    alt: "Client portrait four",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-wild-sand py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        {/* Header - Styled like "The Transformation" */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block"
            >
              Our Clients
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-aztec leading-[1.1]"
            >
              Relied on by Companies <br />& Estates Globally
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xanadu text-lg max-w-sm"
          >
            Join a distinguished network of global clients who trust Joseph.co to maintain their most valuable environments.
          </motion.p>
        </div>

        {/* Dynamic Marquee Section */}
        <div className="mt-12 overflow-hidden md:mt-16 -mx-5 md:-mx-10 lg:-mx-20">
          <div className="flex w-max gap-8 px-5 md:px-10 lg:px-20 [animation:marqueeScroll_50s_linear_infinite] hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.article
                key={`${item.name}-${index}`}
                className="group relative flex h-[340px] w-[600px] md:h-[380px] md:w-[700px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-aztec/5 transition-all duration-500"
              >
                {/* Image Side */}
                <div className="relative w-[35%] h-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-aztec/10" />
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
                  <div>
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-green text-aztec">
                      <Quotes size={20} weight="fill" />
                    </div>
                    <p className="font-sans text-[1.1rem] md:text-[1.2rem] font-medium leading-relaxed tracking-tight text-aztec">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-px w-6 bg-yellow-green" />
                    <div>
                      <h4 className="text-[0.9rem] font-bold uppercase tracking-widest text-aztec">
                        {item.name}
                      </h4>
                      <p className="text-[0.8rem] font-medium text-xanadu">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
