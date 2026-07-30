"use client";

import Image from "next/image";
import {
  Bathtub,
  Bed,
  CaretLeft,
  CaretRight,
  Couch,
  CookingPot,
  Door,
  FlowerLotus,
  ForkKnife,
  type Icon,
  Plant,
  Shower,
  Tree,
  Warehouse,
  X,
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

type RoomImage = {
  src: string;
  alt: string;
  caption: string;
};

type Room = {
  id: string;
  name: string;
  shortName: string;
  icon: Icon;
  images: RoomImage[];
};

const rooms: Room[] = [
  {
    id: "living",
    name: "Living room",
    shortName: "Living",
    icon: Couch,
    images: [
      {
        src: "/images/vine-cottage/living-room-01.png",
        alt: "Living room at Vine Cottage with soft seating and warm natural light",
        caption: "Soft light, deep seating — the cottage gathers here.",
      },
      {
        src: "/images/vine-cottage/living-room-02.png",
        alt: "Living room at Vine Cottage with fireplace and countryside calm",
        caption: "Quiet evenings by the hearth, made for lingering.",
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    shortName: "Kitchen",
    icon: CookingPot,
    images: [
      {
        src: "/images/vine-cottage/kitchen-01.png",
        alt: "Kitchen at Vine Cottage with warm timber and soft light",
        caption: "Long lunches. Slow breakfasts. Shared evenings.",
      },
      {
        src: "/images/vine-cottage/kitchen-02.png",
        alt: "Kitchen and dining space at Vine Cottage",
        caption: "The heart of the house — made for gathering.",
      },
    ],
  },
  {
    id: "dining-playroom",
    name: "Dining room / Playroom",
    shortName: "Dining",
    icon: ForkKnife,
    images: [
      {
        src: "/images/vine-cottage/dining-playroom-01.png",
        alt: "Dining room and playroom at Vine Cottage",
        caption: "Meals, games, and easy days under one roof.",
      },
    ],
  },
  {
    id: "hallway-dining",
    name: "Hallway / Dining room",
    shortName: "Hallway",
    icon: Door,
    images: [
      {
        src: "/images/vine-cottage/hallway-dining-01.png",
        alt: "Hallway and dining room at Vine Cottage",
        caption: "Passage into the quieter rooms of the house.",
      },
    ],
  },
  {
    id: "bedroom-1",
    name: "Bedroom 1",
    shortName: "Bed 1",
    icon: Bed,
    images: [
      {
        src: "/images/vine-cottage/bedroom-01.png",
        alt: "Bedroom 1 at Vine Cottage",
        caption: "Quiet mornings and soft, heritage light.",
      },
    ],
  },
  {
    id: "bedroom-2",
    name: "Bedroom 2",
    shortName: "Bed 2",
    icon: Bed,
    images: [
      {
        src: "/images/vine-cottage/bedroom-02.png",
        alt: "Bedroom 2 at Vine Cottage",
        caption: "Rest made for longer countryside stays.",
      },
    ],
  },
  {
    id: "bedroom-3",
    name: "Bedroom 3",
    shortName: "Bed 3",
    icon: Bed,
    images: [
      {
        src: "/images/vine-cottage/bedroom-03.png",
        alt: "Bedroom 3 at Vine Cottage",
        caption: "Calm, considered sleeping spaces.",
      },
    ],
  },
  {
    id: "bedroom-4",
    name: "Bedroom 4",
    shortName: "Bed 4",
    icon: Bed,
    images: [
      {
        src: "/images/vine-cottage/bedroom-04.png",
        alt: "Bedroom 4 at Vine Cottage",
        caption: "Another quiet corner for longer stays.",
      },
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    shortName: "Bath",
    icon: Bathtub,
    images: [
      {
        src: "/images/vine-cottage/gallery/vine-cottage-03.png",
        alt: "Spa-inspired bathroom with freestanding tub",
        caption: "Calm, considered bathing after countryside walks.",
      },
    ],
  },
  {
    id: "shower-room",
    name: "Shower room",
    shortName: "Shower",
    icon: Shower,
    images: [
      {
        src: "/images/vine-cottage/shower-room-01.png",
        alt: "Shower room at Vine Cottage",
        caption: "Fresh, simple, ready after a day outdoors.",
      },
    ],
  },
  {
    id: "front-garden",
    name: "Front Garden",
    shortName: "Front",
    icon: Plant,
    images: [
      {
        src: "/images/vine-cottage/front-garden-01.png",
        alt: "Front garden at Vine Cottage",
        caption: "First impression — green, quiet, and welcoming.",
      },
    ],
  },
  {
    id: "orchard",
    name: "Orchard",
    shortName: "Orchard",
    icon: Tree,
    images: [
      {
        src: "/images/vine-cottage/orchard-01.png",
        alt: "Orchard at Vine Cottage",
        caption: "Seasonal shade and fruit among the trees.",
      },
    ],
  },
  {
    id: "rear-garden",
    name: "Rear Garden",
    shortName: "Rear",
    icon: Plant,
    images: [
      {
        src: "/images/vine-cottage/rear-garden-01.png",
        alt: "Rear garden at Vine Cottage",
        caption: "Lawn, light, and space to linger outdoors.",
      },
    ],
  },
  {
    id: "barn",
    name: "Barn",
    shortName: "Barn",
    icon: Warehouse,
    images: [
      {
        src: "/images/vine-cottage/barn-01.png",
        alt: "Barn at Vine Cottage",
        caption: "Character outbuildings with countryside purpose.",
      },
    ],
  },
  {
    id: "wellness",
    name: "Wellness",
    shortName: "Wellness",
    icon: FlowerLotus,
    images: [
      {
        src: "/images/vine-cottage/gallery/vine-cottage-sauna-hot-tub.png",
        alt: "Sauna and hot tub wellness space at Vine Cottage",
        caption: "Heat, stillness, and the garden beyond.",
      },
    ],
  },
];

type FlatSlide = {
  roomId: string;
  roomName: string;
  roomIndex: number;
  imageIndex: number;
  imageCount: number;
  src: string;
  alt: string;
  caption: string;
};

const slides: FlatSlide[] = rooms.flatMap((room, roomIndex) =>
  room.images.map((image, imageIndex) => ({
    roomId: room.id,
    roomName: room.name,
    roomIndex,
    imageIndex,
    imageCount: room.images.length,
    src: image.src,
    alt: image.alt,
    caption: image.caption,
  })),
);

function scrollPageToRoom(roomId: string, animated: boolean) {
  const target = document.getElementById(`room-${roomId}`);
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

export default function HighlightsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerImageRef = useRef<HTMLDivElement>(null);
  const viewerMetaRef = useRef<HTMLDivElement>(null);
  const isFirstViewerOpen = useRef(true);

  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id ?? "");
  const [navMode, setNavMode] = useState<"static" | "pinned" | "end">("static");
  const [navHeight, setNavHeight] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerRoomId, setViewerRoomId] = useState(rooms[0]?.id ?? "");
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const viewerRoom = rooms.find((room) => room.id === viewerRoomId) ?? rooms[0];
  const viewerImage = viewerRoom?.images[viewerImageIndex] ?? viewerRoom?.images[0];
  const viewerRoomIndex = rooms.findIndex((room) => room.id === viewerRoomId);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-room-panel]"),
    );
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const nextId = visible?.target.getAttribute("data-room-id");
        if (nextId) setActiveRoomId(nextId);
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
      `[data-room-nav="${activeRoomId}"]`,
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
  }, [activeRoomId, reduceMotion]);

  useEffect(() => {
    if (!viewerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [viewerOpen]);

  useEffect(() => {
    if (!viewerOpen || !viewerRef.current) return;

    const overlay = viewerRef.current;
    const imageWrap = viewerImageRef.current;
    const meta = viewerMetaRef.current;

    if (reduceMotion) {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(imageWrap, { scale: 1, opacity: 1 });
      gsap.set(meta, { y: 0, opacity: 1 });
      isFirstViewerOpen.current = false;
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (isFirstViewerOpen.current) {
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(imageWrap, { scale: 1.14, opacity: 0.35 });
      gsap.set(meta, { y: -18, opacity: 0 });

      tl.to(overlay, { autoAlpha: 1, duration: 0.45 })
        .to(imageWrap, { scale: 1, opacity: 1, duration: 1.15 }, 0.05)
        .to(meta, { y: 0, opacity: 1, duration: 0.7 }, 0.35);

      isFirstViewerOpen.current = false;
    } else {
      tl.fromTo(
        imageWrap,
        { scale: 1.08, opacity: 0.25 },
        { scale: 1, opacity: 1, duration: 0.85 },
      ).fromTo(
        meta,
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.15,
      );
    }

    return () => {
      tl.kill();
    };
  }, [viewerOpen, viewerRoomId, viewerImageIndex, reduceMotion]);

  const closeViewer = () => {
    const finish = () => {
      setViewerOpen(false);
      isFirstViewerOpen.current = true;
      scrollPageToRoom(viewerRoomId, false);
    };

    if (reduceMotion || !viewerRef.current) {
      finish();
      return;
    }

    gsap.to(viewerRef.current, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: finish,
    });
  };

  const showRoomInViewer = (roomId: string) => {
    if (roomId === viewerRoomId) return;
    setActiveRoomId(roomId);
    setViewerRoomId(roomId);
    setViewerImageIndex(0);
    window.history.replaceState(null, "", `#room-${roomId}`);
  };

  const stepViewer = (direction: 1 | -1) => {
    if (!viewerRoom) return;

    const nextImage = viewerImageIndex + direction;
    if (nextImage >= 0 && nextImage < viewerRoom.images.length) {
      setViewerImageIndex(nextImage);
      return;
    }

    const nextRoomIndex =
      (viewerRoomIndex + direction + rooms.length) % rooms.length;
    const nextRoom = rooms[nextRoomIndex];
    if (!nextRoom) return;

    setActiveRoomId(nextRoom.id);
    setViewerRoomId(nextRoom.id);
    setViewerImageIndex(
      direction === 1 ? 0 : Math.max(0, nextRoom.images.length - 1),
    );
    window.history.replaceState(null, "", `#room-${nextRoom.id}`);
  };

  useEffect(() => {
    if (!viewerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepViewer(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepViewer(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerOpen, viewerRoomId, viewerImageIndex]);

  const openViewer = (roomId: string) => {
    setActiveRoomId(roomId);
    setViewerRoomId(roomId);
    setViewerImageIndex(0);
    setViewerOpen(true);
    isFirstViewerOpen.current = true;
    window.history.replaceState(null, "", `#room-${roomId}`);
    scrollPageToRoom(roomId, !reduceMotion);
  };

  const handleRoomNav = (event: MouseEvent<HTMLAnchorElement>, roomId: string) => {
    event.preventDefault();
    if (viewerOpen) {
      showRoomInViewer(roomId);
      return;
    }
    openViewer(roomId);
  };

  const navClassName =
    navMode === "pinned"
      ? styles.roomMiniNavPinned
      : navMode === "end"
        ? styles.roomMiniNavEnd
        : styles.roomMiniNav;

  const renderRoomPills = (
    scrollRef?: RefObject<HTMLDivElement | null>,
  ) => (
    <div className={styles.roomMiniNavInner} ref={scrollRef}>
      {rooms.map((room, index) => {
        const isActive = (viewerOpen ? viewerRoomId : activeRoomId) === room.id;
        const Icon = room.icon;

        return (
          <motion.a
            key={room.id}
            href={`#room-${room.id}`}
            data-room-nav={room.id}
            className={
              isActive ? styles.roomMiniNavLinkActive : styles.roomMiniNavLink
            }
            aria-current={isActive ? "true" : undefined}
            title={room.name}
            onClick={(event) => handleRoomNav(event, room.id)}
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
            <span className={styles.roomMiniNavLabel}>{room.shortName}</span>
          </motion.a>
        );
      })}
    </div>
  );

  return (
    <section
      id="highlights"
      ref={rootRef}
      className={styles.roomTour}
      aria-label="Rooms through Vine Cottage"
    >
      <header className={styles.roomTourIntro} data-reveal-group>
        <p className={styles.roomTourEyebrow} data-reveal-item>
          Inside the cottage
        </p>
        <h2 className={styles.roomTourHeading} data-heading-reveal>
          Explore Every Space
        </h2>
        <p className={styles.roomTourLead} data-body-reveal>
          Discover each thoughtfully restored room of Vine Cottage.
        </p>
      </header>

      <div ref={sentinelRef} className={styles.roomMiniNavSentinel} aria-hidden="true" />
      {(navMode === "pinned" || navMode === "end") && (
        <div style={{ height: navHeight }} aria-hidden="true" />
      )}

      <nav ref={navRef} className={navClassName} aria-label="Explore rooms">
        {renderRoomPills(navScrollRef)}
      </nav>

      <div className={styles.roomTourTrack}>
        {slides.map((slide, index) => {
          const isFirstOfRoom = slide.imageIndex === 0;
          const roomNumber = String(slide.roomIndex + 1).padStart(2, "0");

          return (
            <article
              key={`${slide.src}-${index}`}
              id={isFirstOfRoom ? `room-${slide.roomId}` : undefined}
              data-room-panel
              data-room-id={slide.roomId}
              className={styles.roomTourPanel}
              aria-label={`${slide.roomName}${
                slide.imageCount > 1
                  ? `, view ${slide.imageIndex + 1} of ${slide.imageCount}`
                  : ""
              }`}
            >
              <div className={styles.roomTourMedia}>
                <button
                  type="button"
                  className={styles.roomTourOpenBtn}
                  aria-label={`View ${slide.roomName} fullscreen`}
                  onClick={() => openViewer(slide.roomId)}
                />
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  quality={95}
                  sizes="100vw"
                  className={styles.roomTourImage}
                  data-room-image
                  data-image-parallax="5"
                />
                <div className={styles.roomTourGradient} aria-hidden="true" />
              </div>

              <div className={styles.roomTourMeta} data-room-meta>
                <p className={styles.roomTourNumber}>{roomNumber}</p>
                <div className={styles.roomTourCopy}>
                  <h3 className={styles.roomTourName}>{slide.roomName}</h3>
                  <p className={styles.roomTourCaption}>{slide.caption}</p>
                </div>
                {slide.imageCount > 1 ? (
                  <p className={styles.roomTourShot} aria-hidden="true">
                    {slide.imageIndex + 1}
                    <span>/</span>
                    {slide.imageCount}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {viewerOpen && viewerRoom && viewerImage ? (
        <div
          ref={viewerRef}
          className={styles.roomViewer}
          role="dialog"
          aria-modal="true"
          aria-label={`${viewerRoom.name} fullscreen`}
        >
          <button
            type="button"
            className={styles.roomViewerClose}
            aria-label="Close fullscreen view"
            onClick={closeViewer}
          >
            <X size={22} weight="light" />
          </button>

          <button
            type="button"
            className={styles.roomViewerPrev}
            aria-label="Previous space"
            onClick={() => stepViewer(-1)}
          >
            <CaretLeft size={22} weight="light" />
          </button>
          <button
            type="button"
            className={styles.roomViewerNext}
            aria-label="Next space"
            onClick={() => stepViewer(1)}
          >
            <CaretRight size={22} weight="light" />
          </button>

          <div ref={viewerImageRef} className={styles.roomViewerImageWrap}>
            <Image
              key={`${viewerRoom.id}-${viewerImageIndex}`}
              src={viewerImage.src}
              alt={viewerImage.alt}
              fill
              priority
              quality={95}
              sizes="100vw"
              className={styles.roomViewerImage}
            />
          </div>

          <div ref={viewerMetaRef} className={styles.roomViewerMeta}>
            <p className={styles.roomViewerNumber}>
              {String(viewerRoomIndex + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className={styles.roomViewerName}>{viewerRoom.name}</h3>
              <p className={styles.roomViewerCaption}>{viewerImage.caption}</p>
            </div>
            {viewerRoom.images.length > 1 ? (
              <p className={styles.roomViewerShot}>
                {viewerImageIndex + 1}
                <span>/</span>
                {viewerRoom.images.length}
              </p>
            ) : null}
          </div>

          <nav className={styles.roomViewerNav} aria-label="Explore rooms">
            {renderRoomPills()}
          </nav>
        </div>
      ) : null}
    </section>
  );
}
