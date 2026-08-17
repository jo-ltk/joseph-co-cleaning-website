"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Clock, Handshake, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

import { careVideo } from "@/lib/care";
import { gsap, safePlay, useGSAP } from "./care-gsap";
import { useCareUi } from "./CareUi";

const features = [
  {
    icon: Clock,
    kicker: "Availability",
    title: "24/7 Support",
    text: "24/7 Staffing Support",
  },
  {
    icon: ShieldCheck,
    kicker: "Professionals",
    title: "Fully Vetted Professionals",
    text: "Qualified Healthcare Professionals",
  },
  {
    icon: Handshake,
    kicker: null,
    title: "Reliable Staffing",
    text: null,
  },
] as const;

export default function CareHero() {
  const { openRequest } = useCareUi();
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            video?.pause();
            gsap.set([".care-hero-eyebrow", ".care-hero-title", ".care-hero-features li", ".care-hero-cta"], {
              autoAlpha: 1,
              y: 0,
            });
            return () => video?.pause();
          }

          safePlay(video);

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(".care-hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.7 }, 0.12)
            .from(".care-hero-title", { autoAlpha: 0, y: 28, duration: 0.9 }, 0.2)
            .from(".care-hero-features li", { autoAlpha: 0, y: 20, duration: 0.65, stagger: 0.1 }, 0.38)
            .from(".care-hero-cta", { autoAlpha: 0, y: 20, duration: 0.7 }, 0.5);

          if (video && !context.conditions?.mobile) {
            gsap.set(video, { scale: 1.12, transformOrigin: "center center" });
            gsap.to(video, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else if (video) {
            gsap.set(video, { scale: 1, yPercent: 0, clearProps: "transform" });
          }
        },
      );

      return () => {
        videoRef.current?.pause();
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="care-hero">
      <div className="care-hero-deco" aria-hidden>
        <span className="care-hero-deco-line care-hero-deco-line--red" />
        <span className="care-hero-deco-line care-hero-deco-line--blue" />
        <span className="care-hero-deco-shape care-hero-deco-shape--one" />
        <span className="care-hero-deco-shape care-hero-deco-shape--two" />
      </div>

      <div className="care-hero-inner">
        <div className="care-hero-copy">
          <p className="care-eyebrow care-hero-eyebrow">Trusted Healthcare Staffing Solutions</p>
          <h1 className="care-hero-title">
            Quality Healthcare
            <br />
            Staffing,
            <br />
            When You Need It.
          </h1>
        </div>

        <div className="care-hero-bottom">
          <ul className="care-hero-features">
            {features.map((item) => (
              <li key={item.title}>
                <span className="care-hero-feature-icon">
                  <item.icon size={18} weight="regular" aria-hidden />
                </span>
                <span>
                  {item.kicker ? <span className="care-hero-kicker">{item.kicker}</span> : null}
                  <span className="care-hero-feature-title">{item.title}</span>
                  {item.text ? <span className="care-hero-feature-text">{item.text}</span> : null}
                </span>
              </li>
            ))}
          </ul>

          <div className="care-hero-cta">
            <p>
              Connecting care homes and healthcare providers with skilled, fully vetted healthcare professionals. Reliable
              staffing support, rapid response and 24/7 availability.
            </p>
            <div className="care-hero-actions">
              <button type="button" className="care-btn care-btn-primary" onClick={openRequest}>
                Find Staff
                <span className="care-btn-hero-icon" aria-hidden>
                  <ArrowRight size={16} weight="bold" />
                </span>
              </button>
              <Link href="/care/apply" className="care-btn care-btn-secondary">
                Join Our Team
                <span className="care-btn-hero-icon" aria-hidden>
                  <ArrowRight size={16} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="care-hero-media" aria-hidden>
        <video
          ref={videoRef}
          poster={careVideo.poster}
          muted
          playsInline
          loop
          preload="auto"
        >
          <source src={careVideo.src} type="video/mp4" />
        </video>
        <div className="care-hero-shade" />
      </div>
    </section>
  );
}
