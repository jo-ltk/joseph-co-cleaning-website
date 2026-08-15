"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "@phosphor-icons/react/dist/ssr";

import { careVideo } from "@/lib/care";
import { gsap, useGSAP } from "./care-gsap";

export default function CareVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            videoRef.current?.pause();
            return;
          }

          gsap.fromTo(
            mediaRef.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );

          gsap.from(".care-video-copy", {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[var(--cc-navy)]">
      <div ref={mediaRef} className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-[120%] w-full object-cover"
          poster={careVideo.poster}
          muted
          playsInline
          loop
          preload="metadata"
          controls={false}
        >
          <source src={careVideo.src} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-[var(--cc-navy)]/55" />
      <div className="care-video-copy relative z-10 flex h-full flex-col items-center justify-center px-5 text-center md:px-10 lg:px-20">
        <h2 className="max-w-3xl text-2xl font-medium leading-[1.1] tracking-tight text-white md:text-4xl">
          Care That Starts With the Right People.
        </h2>
        <button
          type="button"
          onClick={toggle}
          className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <Pause size={22} weight="fill" /> : <Play size={22} weight="fill" className="ml-0.5" />}
        </button>
      </div>
    </section>
  );
}
