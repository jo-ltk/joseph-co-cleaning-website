"use client";

import Image from "next/image";
import {
  Coffee,
  Fire,
  type Icon,
  TreeEvergreen,
} from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";

import { styles } from "@/components/vine-cottage/PresentationComponents";

gsap.registerPlugin(ScrollToPlugin);

type LifestyleMoment = {
  id: string;
  name: string;
  shortName: string;
  icon: Icon;
  src: string;
  alt: string;
  caption: string;
};

const moments: LifestyleMoment[] = [
  {
    id: "morning",
    name: "Morning coffee",
    shortName: "Morning",
    icon: Coffee,
    src: "/images/vine-cottage/lifestyle-morning.png",
    alt: "Morning coffee by the window at Vine Cottage",
    caption: "Slow start by the window",
  },
  {
    id: "fireplace",
    name: "Fireplace evenings",
    shortName: "Evening",
    icon: Fire,
    src: "/images/vine-cottage/lifestyle-fire.png",
    alt: "Fireplace evening at Vine Cottage",
    caption: "Warm light, long talks",
  },
  {
    id: "garden",
    name: "Golden-hour garden",
    shortName: "Garden",
    icon: TreeEvergreen,
    src: "/images/vine-cottage/lifestyle-garden.png",
    alt: "Golden-hour garden at Vine Cottage",
    caption: "Orchard air at dusk",
  },
];

function scrollToMoment(momentId: string, animated: boolean) {
  const target = document.getElementById(`lifestyle-${momentId}`);
  if (!target) return;

  if (!animated) {
    target.scrollIntoView({ behavior: "auto", block: "start" });
    return;
  }

  gsap.to(window, {
    duration: 1.05,
    ease: "power3.inOut",
    scrollTo: { y: target, offsetY: 0, autoKill: true },
  });
}

export default function LifestyleSection() {
  const rootRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState(moments[0]?.id ?? "");
  const [navMode, setNavMode] = useState<"static" | "pinned" | "end">("static");
  const [navHeight, setNavHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-lifestyle-panel]"),
    );
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const nextId = visible?.target.getAttribute("data-lifestyle-id");
        if (nextId) setActiveId(nextId);
      },
      {
        root: null,
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-18% 0px -18% 0px",
      },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = rootRef.current;
    const sentinel = sentinelRef.current;
    const nav = navRef.current;
    if (!section || !sentinel || !nav) return;

    let frame = 0;

    const update = () => {
      const height = nav.offsetHeight;
      setNavHeight(height);

      const sectionRect = section.getBoundingClientRect();
      const sentinelTop = sentinel.getBoundingClientRect().top;

      if (sentinelTop > 0) {
        setNavMode("static");
      } else if (sectionRect.bottom <= height) {
        setNavMode("end");
      } else {
        setNavMode("pinned");
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  useEffect(() => {
    const container = navScrollRef.current;
    const activeLink = container?.querySelector<HTMLElement>(
      `[data-lifestyle-nav="${activeId}"]`,
    );
    if (!container || !activeLink) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const delta =
      linkRect.left -
      containerRect.left -
      containerRect.width / 2 +
      linkRect.width / 2;

    container.scrollBy({
      left: delta,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, reduceMotion]);

  const handleNav = (event: MouseEvent<HTMLAnchorElement>, momentId: string) => {
    event.preventDefault();
    setActiveId(momentId);
    scrollToMoment(momentId, !reduceMotion);
  };

  const navClassName =
    navMode === "pinned"
      ? styles.roomMiniNavPinned
      : navMode === "end"
        ? styles.roomMiniNavEnd
        : styles.roomMiniNav;

  const renderPills = (scrollRef?: RefObject<HTMLDivElement | null>) => (
    <div className={styles.roomMiniNavInner} ref={scrollRef}>
      {moments.map((moment, index) => {
        const isActive = activeId === moment.id;
        const Icon = moment.icon;

        return (
          <motion.a
            key={moment.id}
            href={`#lifestyle-${moment.id}`}
            data-lifestyle-nav={moment.id}
            className={
              isActive ? styles.roomMiniNavLinkActive : styles.roomMiniNavLink
            }
            aria-current={isActive ? "true" : undefined}
            title={moment.name}
            onClick={(event) => handleNav(event, moment.id)}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }
            }
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <span className={styles.roomMiniNavNum}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.roomMiniNavIcon} aria-hidden="true">
              <Icon size={14} weight="light" />
            </span>
            <span className={styles.roomMiniNavLabel}>{moment.shortName}</span>
          </motion.a>
        );
      })}
    </div>
  );

  return (
    <section
      id="experience"
      ref={rootRef}
      className={styles.roomTour}
      aria-label="A weekend imagined at Vine Cottage"
    >
      <header className={styles.roomTourIntro} data-reveal-group>
        <p className={styles.roomTourEyebrow} data-reveal-item>
          Lifestyle
        </p>
        <h2 className={styles.roomTourHeading} data-heading-reveal>
          A weekend, imagined.
        </h2>
        <p className={styles.roomTourLead} data-body-reveal>
          Morning light, hearthside evenings, and orchard air at dusk.
        </p>
      </header>

      <div ref={sentinelRef} className={styles.roomMiniNavSentinel} aria-hidden="true" />
      {(navMode === "pinned" || navMode === "end") && (
        <div style={{ height: navHeight }} aria-hidden="true" />
      )}

      <nav ref={navRef} className={navClassName} aria-label="Weekend moments">
        {renderPills(navScrollRef)}
      </nav>

      <div className={styles.roomTourTrack}>
        {moments.map((moment, index) => (
          <article
            key={moment.id}
            id={`lifestyle-${moment.id}`}
            data-lifestyle-panel
            data-lifestyle-id={moment.id}
            className={styles.roomTourPanel}
            aria-label={moment.name}
          >
            <div className={styles.roomTourMedia}>
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                priority={index === 0}
                quality={95}
                sizes="100vw"
                className={styles.roomTourImage}
                data-image-parallax="5"
              />
              <div className={styles.roomTourGradient} aria-hidden="true" />
            </div>

            <div className={styles.roomTourMeta}>
              <p className={styles.roomTourNumber}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className={styles.roomTourCopy}>
                <h3 className={styles.roomTourName}>{moment.name}</h3>
                <p className={styles.roomTourCaption}>{moment.caption}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
