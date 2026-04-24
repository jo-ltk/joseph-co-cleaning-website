"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

const testimonials = [
  { name: "Jonathan Reeves", location: "London, UK", quote: "Joseph.co has transformed our estate maintenance. Their attention to detail is unparalleled and consistently perfect.", image: "/coach-conversation.png", alt: "Client portrait one" },
  { name: "Marcus Thorne", location: "New York, USA", quote: "The most professional cleaning team we've ever engaged. Immaculate results that our staff noticed instantly.", image: "/hero-cleaning-home.jpg", alt: "Client portrait two" },
  { name: "Sofia Moretti", location: "Milan, Italy", quote: "Pristine standards for our boutique showroom. They understand the luxury market better than any other service.", image: "/equipment-vacuum-cleaning.jpg", alt: "Client portrait three" },
  { name: "Isabella Chen", location: "Singapore", quote: "Efficiency paired with absolute quality. Their multi-point protocol ensures every corner reflects our brand's excellence.", image: "/clean-space-living-room.jpg", alt: "Client portrait four" },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-wild-sand py-16 md:py-24 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Our Clients
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl leading-[1.1] text-aztec">
              Relied on by Companies <br />&amp; Estates Globally
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xanadu text-base md:text-lg max-w-sm">
            Join a distinguished network of global clients who trust Joseph.co to maintain their most valuable environments.
          </motion.p>
        </div>

        {/* MARQUEE — same on both mobile and desktop, just smaller cards on mobile */}
        <div className="overflow-hidden -mx-5 md:-mx-10 lg:-mx-20">
          <div className="flex w-max gap-4 md:gap-8 px-5 md:px-10 lg:px-20 [animation:marqueeScroll_50s_linear_infinite] hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.article
                key={`${item.name}-${index}`}
                className="group relative flex shrink-0 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-aztec/5 transition-all duration-500
                  h-[200px] w-[300px] md:h-[380px] md:w-[700px]"
              >
                {/* image */}
                <div className="relative w-[30%] md:w-[35%] h-full overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.alt} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-aztec/10" />
                </div>

                {/* content */}
                <div className="flex flex-col justify-between p-4 md:p-10 flex-1 min-w-0">
                  <div>
                    <div className="mb-2 md:mb-4 flex h-7 w-7 md:h-10 md:w-10 items-center justify-center rounded-lg md:rounded-xl bg-yellow-green text-aztec">
                      <Quotes size={14} weight="fill" className="md:hidden" />
                      <Quotes size={20} weight="fill" className="hidden md:block" />
                    </div>
                    <p className="font-sans text-xs md:text-base font-medium leading-snug md:leading-relaxed tracking-tight text-aztec line-clamp-3 md:line-clamp-none">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="h-px w-5 md:w-8 bg-yellow-green flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-aztec truncate">{item.name}</h4>
                      <p className="text-[10px] md:text-sm font-medium text-xanadu">{item.location}</p>
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