"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import ScrollReveal from "./ScrollReveal";

type TestimonialVariant = "a" | "b" | "c" | "d";

interface Testimonial {
  name: string;
  location: string;
  tag: string;
  quote: string;
  image: string;
  alt: string;
  variant: TestimonialVariant;
}

const testimonials: Testimonial[] = [
  { 
    name: "Jonathan Reeves", 
    location: "Taunton, Somerset", 
    tag: "Private Estate",
    quote: "Joseph.co has transformed our estate maintenance. Their attention to detail is unparalleled and consistently perfect.",
    image: "/images/unsplash/photo-1507003211169-0a1dd7228f2d.jpg", 
    alt: "Jonathan Reeves portrait",
    variant: "b"
  },
  { 
    name: "Alastair Vance", 
    location: "Bristol, UK", 
    tag: "Commercial",
    quote: "The most professional cleaning team we've ever engaged in Bristol. Immaculate results that our staff noticed instantly.",
    image: "/images/unsplash/photo-1500648767791-00dcc994a43e.jpg", 
    alt: "Alastair Vance portrait",
    variant: "a"
  },
  { 
    name: "Sarah Higgins", 
    location: "Bath, UK", 
    tag: "Retail",
    quote: "Pristine standards for our boutique showroom. They understand the premium market better than any other service.",
    image: "/images/unsplash/photo-1494790108377-be9c29b29330.jpg", 
    alt: "Sarah Higgins portrait",
    variant: "c"
  },
  { 
    name: "Eleanor Thorne", 
    location: "Manchester, UK", 
    tag: "Corporate",
    quote: "Efficiency paired with absolute quality. Their multi-point protocol ensures every corner reflects our brand's excellence.",
    image: "/images/unsplash/photo-1573496359142-b8d87734a5a2.jpg", 
    alt: "Eleanor Thorne portrait",
    variant: "d"
  },
  { 
    name: "Julian Rhodes", 
    location: "Bridgwater, Somerset", 
    tag: "Manor House",
    quote: "Discretion and excellence are the hallmarks of their service. Our residence has never looked more pristine.",
    image: "/images/unsplash/photo-1472099645785-5658abf4ff4e.jpg", 
    alt: "Julian Rhodes portrait",
    variant: "b"
  },
  { 
    name: "Victoria Penhaligon", 
    location: "London, UK", 
    tag: "Office HQ",
    quote: "The reliability of their team is unmatched. They've become an essential partner in our daily operations across London.",
    image: "/images/unsplash/photo-1580489944761-15a19d654956.jpg", 
    alt: "Victoria Penhaligon portrait",
    variant: "a"
  },
];

// Variant A (narrow, 240px) — tall text card with a slim image strip at the bottom
function CardA({ name, location, quote, image, alt }: Testimonial) {
  return (
    <article className="group flex-shrink-0 w-[240px] h-[520px] bg-white border border-aztec/8 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="block font-serif text-[64px] leading-[0.7] text-yellow-green mb-3 select-none">"</span>
          <p className="font-serif text-[15px] italic leading-[1.75] text-aztec">
            {quote}"
          </p>
        </div>
        <div className="mt-5">
          <div className="h-[1.5px] bg-yellow-green w-7 mb-3.5 transition-all duration-400 group-hover:w-12" />
          <p className="font-sans text-[11px] font-bold uppercase tracking-[.14em] text-aztec">{name}</p>
          <p className="font-sans text-[11px] text-xanadu mt-0.5">{location}</p>
        </div>
      </div>
      <div className="h-[140px] relative overflow-hidden">
        <Image 
          src={image} alt={alt} fill 
          className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
        />
      </div>
    </article>
  );
}

// Variant B (wide, 420px) — landscape with image on the left half, quote filling the right
function CardB({ name, location, quote, image, alt }: Testimonial) {
  return (
    <article className="group flex-shrink-0 w-[420px] h-[420px] bg-white border border-aztec/8 overflow-hidden flex flex-row transition-all duration-300 hover:shadow-xl">
      <div className="w-1/2 relative h-full overflow-hidden">
        <Image 
          src={image} alt={alt} fill 
          className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
        />
      </div>
      <div className="w-1/2 p-7 flex flex-col justify-between border-l border-aztec/8">
        <div>
          <span className="block font-serif text-[64px] leading-[0.7] text-yellow-green mb-3 select-none">"</span>
          <p className="font-serif text-[15px] italic leading-[1.75] text-aztec">
            {quote}"
          </p>
        </div>
        <div className="mt-5">
          <div className="h-[1.5px] bg-yellow-green w-7 mb-3.5 transition-all duration-400 group-hover:w-12" />
          <p className="font-sans text-[11px] font-bold uppercase tracking-[.14em] text-aztec">{name}</p>
          <p className="font-sans text-[11px] text-xanadu mt-0.5">{location}</p>
        </div>
      </div>
    </article>
  );
}

// Variant C (square, 280px) — image-dominant top, quote below
function CardC({ name, location, tag, quote, image, alt }: Testimonial) {
  return (
    <article className="group flex-shrink-0 w-[280px] h-[480px] bg-white border border-aztec/8 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <div className="h-[200px] relative overflow-hidden">
        <Image 
          src={image} alt={alt} fill 
          className="object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
        />
        <span className="absolute top-3 left-3 bg-aztec text-yellow-green text-[9px] font-bold uppercase tracking-[.18em] px-2.5 py-1 font-sans">
          {tag}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between border-t border-aztec/8">
        <div>
          <span className="block font-serif text-[64px] leading-[0.7] text-yellow-green mb-3 select-none">"</span>
          <p className="font-serif text-[15px] italic leading-[1.75] text-aztec">
            {quote}"
          </p>
        </div>
        <div className="mt-5">
          <div className="h-[1.5px] bg-yellow-green w-7 mb-3.5 transition-all duration-400 group-hover:w-12" />
          <p className="font-sans text-[11px] font-bold uppercase tracking-[.14em] text-aztec">{name}</p>
          <p className="font-sans text-[11px] text-xanadu mt-0.5">{location}</p>
        </div>
      </div>
    </article>
  );
}

// Variant D (360px) — pure text with a bold yellow-green left accent bar, no image at all
function CardD({ name, location, quote }: Testimonial) {
  return (
    <article className="group flex-shrink-0 w-[360px] h-[450px] bg-white border border-aztec/8 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl relative">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-green" />
      <div className="p-10 flex-1 flex flex-col justify-between">
        <div>
          <span className="block font-serif text-[64px] leading-[0.7] text-yellow-green mb-3 select-none">"</span>
          <p className="font-serif text-[18px] italic leading-[1.75] text-aztec">
            {quote}"
          </p>
        </div>
        <div className="mt-5">
          <div className="h-[1.5px] bg-yellow-green w-7 mb-3.5 transition-all duration-400 group-hover:w-12" />
          <p className="font-sans text-[12px] font-bold uppercase tracking-[.14em] text-aztec">{name}</p>
          <p className="font-sans text-[12px] text-xanadu mt-0.5">{location}</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-wild-sand py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20 mb-10 md:mb-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Our Clients
            </motion.span>
            <ScrollReveal as="h2" enableBlur blurStrength={8} containerClassName="text-2xl md:text-4xl leading-[1.1] text-aztec">
              Relied on by Companies &amp; Estates Globally
            </ScrollReveal>
          </div>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xanadu text-base md:text-lg max-w-sm leading-relaxed">
            Join a distinguished network of global clients who trust Joseph.co to maintain their most valuable environments.
          </motion.p>
        </div>
      </div>

      {/* Marquee — Layout breaks the grid with varying widths */}
      <div className="relative group">
        <div className="overflow-hidden py-12">
          <div className="flex w-max gap-12 px-12 
                          [animation:marqueeScroll_70s_linear_infinite]
                          hover:[animation-play-state:paused]
                          items-center">
            {[...testimonials, ...testimonials].map((t, i) => {
              const key = `${t.name}-${i}`;
              switch (t.variant) {
                case "a": return <CardA key={key} {...t} />;
                case "b": return <CardB key={key} {...t} />;
                case "c": return <CardC key={key} {...t} />;
                case "d": return <CardD key={key} {...t} />;
                default: return <CardA key={key} {...t} />;
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}