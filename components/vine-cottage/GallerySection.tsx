"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import {
  SectionContainer,
  SectionHeading,
  SectionLabel,
  SectionLead,
} from "@/components/vine-cottage/PresentationComponents";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    title: "Luxury Countryside Wellness Retreat",
    image: "/images/vine-cottage/gallery/vine-cottage-wellness-retreat.png",
    category: "Wellness",
    description:
      "Heritage stone barn meets modern wellness — Cube sauna, cedar hot tub and refined guest amenities.",
  },
  {
    title: "Luxury Outdoor Sauna & Hot Tub Retreat",
    image: "/images/vine-cottage/gallery/vine-cottage-sauna-hot-tub.png",
    category: "Wellness",
    description:
      "Private sauna and wood-fired hot tub beside the historic barn — a boutique spa escape.",
  },
  {
    title: "Bathroom",
    image: "/images/vine-cottage/gallery/vine-cottage-03.png",
    category: "Bathroom",
    description: "Calm, considered spaces designed for rest and renewal.",
  },
  {
    title: "Master Bedroom",
    image: "/images/vine-cottage/gallery/vine-cottage-04.png",
    category: "Master Bedroom",
    description: "A restful retreat with character and comfort in equal measure.",
  },
  {
    title: "Living Room",
    image: "/images/vine-cottage/gallery/vine-cottage-05.png",
    category: "Living Room",
    description: "Warm, inviting interiors that honour the cottage's historic soul.",
  },
  {
    title: "Kitchen",
    image: "/images/vine-cottage/gallery/vine-cottage-06.png",
    category: "Kitchen",
    description: "A welcoming heart of the home for long lunches and slow mornings.",
  },
  {
    title: "Sitting Room",
    image: "/images/vine-cottage/gallery/vine-cottage-07.png",
    category: "Sitting Room",
    description: "Intimate spaces to unwind, read and watch the light change.",
  },
  {
    title: "Mudroom",
    image: "/images/vine-cottage/gallery/vine-cottage-08.png",
    category: "Barn",
    description: "Stone barns and practical charm—a distinctive arrival experience.",
  },
] as const;

export default function GallerySection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-gallery-slide]");

      slides.forEach((slide) => {
        const image = slide.querySelector("[data-gallery-image]");
        const copy = slide.querySelector("[data-gallery-copy]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.16 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                start: "top 72%",
                end: "top 40%",
                scrub: 0.6,
              },
            },
          );
        }
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const refreshTimer = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("resize", refresh);
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className="bg-aztec">
      <div className="relative z-10 bg-wild-sand">
        <SectionContainer className="py-20 md:py-32">
          <div className="max-w-3xl">
            <SectionLabel>Transformation Vision</SectionLabel>
            <SectionHeading>A hospitality concept, sensitively imagined.</SectionHeading>
            <SectionLead>
              Scroll through every space in full screen—an illustrative direction for guest
              experience and atmosphere, not a proposal for structural renovation.
            </SectionLead>
          </div>
        </SectionContainer>
      </div>

      <div className="relative">
        {galleryImages.map((item, index) => (
          <div
            key={item.image}
            data-gallery-slide
            className="sticky top-0 h-[100svh] w-full"
            style={{ zIndex: index + 1 }}
          >
            <article className="relative h-full w-full overflow-hidden bg-aztec">
              <div data-gallery-image className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-aztec/85 via-aztec/15 to-aztec/25" />

              <div
                data-gallery-copy
                className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[1450px] items-end justify-between gap-6 px-5 pb-10 text-white md:px-10 md:pb-16 lg:px-20"
              >
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-widest text-yellow-green">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-4xl font-medium leading-[1.02] tracking-tight text-white md:text-6xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-white md:text-lg">
                    {item.description}
                  </p>
                </div>
                <p className="hidden shrink-0 text-sm font-semibold tracking-widest text-white/50 md:block">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(galleryImages.length).padStart(2, "0")}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
