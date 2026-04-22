"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectCard = {
  title: string;
  image: string;
  alt: string;
  tone: string;
  className: string;
  position: string;
  showPlus?: boolean;
};

const slides: ProjectCard[][] = [
  [
    {
      title: "PurePower",
      image: "/hero-cleaning-home.jpg",
      alt: "Wind and clean energy landscape",
      tone: "bg-[rgba(174,183,188,0.34)]",
      className: "lg:basis-[43%]",
      position: "object-cover object-center",
      showPlus: true,
    },
    {
      title: "EnergyOptix",
      image: "/clean-space-living-room.jpg",
      alt: "Dark infrastructure project preview",
      tone: "bg-[rgba(4,18,20,0.6)]",
      className: "lg:basis-[43%]",
      position: "object-cover object-center",
    },
    {
      title: "SmartSpark",
      image: "/equipment-vacuum-cleaning.jpg",
      alt: "Aerial utility project preview",
      tone: "bg-[rgba(18,38,30,0.3)]",
      className: "lg:basis-[14%]",
      position: "object-cover object-center",
    },
  ],
  [
    {
      title: "EcoGrid",
      image: "/plan-basic-swim.png",
      alt: "Green planning project preview",
      tone: "bg-[rgba(22,35,37,0.18)]",
      className: "lg:basis-[43%]",
      position: "object-cover object-center",
      showPlus: true,
    },
    {
      title: "VoltEdge",
      image: "/coach-conversation.png",
      alt: "Leadership and strategy project preview",
      tone: "bg-[rgba(26,22,18,0.44)]",
      className: "lg:basis-[43%]",
      position: "object-cover object-center",
    },
    {
      title: "BlueCurrent",
      image: "/clean-space-living-room.jpg",
      alt: "Small spotlight project preview",
      tone: "bg-[rgba(8,20,22,0.42)]",
      className: "lg:basis-[14%]",
      position: "object-cover object-right",
    },
  ],
  [
    {
      title: "NovaField",
      image: "/equipment-vacuum-cleaning.jpg",
      alt: "Open field operations preview",
      tone: "bg-[rgba(28,42,24,0.26)]",
      className: "lg:basis-[43%]",
      position: "object-cover object-center",
      showPlus: true,
    },
    {
      title: "CoreStack",
      image: "/hero-cleaning-home.jpg",
      alt: "Operations and delivery preview",
      tone: "bg-[rgba(30,28,18,0.5)]",
      className: "lg:basis-[43%]",
      position: "object-cover object-center",
    },
    {
      title: "FlowWorks",
      image: "/plan-basic-swim.png",
      alt: "Compact project preview",
      tone: "bg-[rgba(18,31,25,0.26)]",
      className: "lg:basis-[14%]",
      position: "object-cover object-center",
    },
  ],
];

export default function RecentProjectsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const previousSlide = () => {
    setActiveSlide((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="bg-white px-4 py-5 text-[#0f1112] md:px-5 md:py-6 xl:px-5 xl:py-5">
      <div className="mx-auto max-w-[1920px]">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-heading text-[2.7rem] font-medium leading-[0.9] tracking-[-0.08em] text-black sm:text-[3.4rem] md:text-[4rem] xl:text-[3.95rem]">
            Recent Projects
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={previousSlide}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-[#f1f1ef] text-black transition-colors duration-300 hover:bg-[#e8e8e5]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m14.5 5-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={nextSlide}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-[#f1f1ef] text-black transition-colors duration-300 hover:bg-[#e8e8e5]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9.5 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-7 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className="min-w-full">
                <div className="flex flex-col gap-[10px] lg:flex-row">
                  {slide.map((project) => (
                    <article
                      key={project.title}
                      className={`group relative min-h-[220px] overflow-hidden rounded-[18px] bg-[#dbe0e2] sm:min-h-[250px] md:min-h-[300px] xl:min-h-[420px] ${project.className}`}
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className={`${project.position} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                      />
                      <div className={`absolute inset-0 ${project.tone}`} />

                      {project.showPlus ? (
                        <div className="absolute left-1/2 top-[26%] -translate-x-1/2 text-[2.2rem] font-extralight leading-none text-white/70 md:text-[2.6rem]">
                          +
                        </div>
                      ) : null}

                      <p className="absolute bottom-4 left-4 font-sans text-[1rem] font-medium tracking-[-0.05em] text-white md:bottom-5 md:left-5 md:text-[1.08rem]">
                        {project.title}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-[2px]">
            <a
              href="#"
              className="inline-flex h-[46px] items-center rounded-full bg-[#152225] px-6 font-sans text-[0.98rem] font-semibold tracking-[-0.04em] text-[#ddff9a]"
            >
              View All
            </a>
            <a
              href="#"
              aria-label="View all projects"
              className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#152225] text-[#ddff9a] transition-transform duration-300 hover:translate-x-[2px]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </div>

          <div className="flex items-center justify-center gap-[6px] md:flex-1">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to project slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-[9px] w-[9px] rounded-full transition-colors duration-300 ${
                  index === activeSlide ? "bg-[#111]" : "bg-[#c9c9c9]"
                }`}
              />
            ))}
          </div>

          <div className="hidden md:block md:w-[140px]" />
        </div>
      </div>
    </section>
  );
}
