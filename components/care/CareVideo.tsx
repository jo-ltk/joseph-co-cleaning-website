"use client";

import { useRef } from "react";

import { careVideo } from "@/lib/care";
import { gsap, safePlay, ScrollTrigger, useGSAP } from "./care-gsap";

export default function CareVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const video = videoRef.current;
          if (context.conditions?.reduce) {
            video?.pause();
            gsap.set(".care-cinematic-copy", { autoAlpha: 1, y: 0 });
            return () => video?.pause();
          }

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => safePlay(video),
            onEnterBack: () => safePlay(video),
            onLeave: () => video?.pause(),
            onLeaveBack: () => video?.pause(),
          });

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

          gsap.from(".care-cinematic-copy", {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          });
        },
      );

      return () => {
        videoRef.current?.pause();
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="care-cinematic">
      <div className="care-cinematic-frame">
        <div ref={mediaRef} className="care-cinematic-media">
          <video
            ref={videoRef}
            className="care-cinematic-video"
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
        <h2 className="care-cinematic-copy">
          Care That Starts
          <br />
          With the Right
          <br />
          People.
        </h2>
      </div>
    </section>
  );
}
