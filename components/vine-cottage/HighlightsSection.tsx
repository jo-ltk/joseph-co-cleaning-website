"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { styles } from "@/components/vine-cottage/PresentationComponents";

type RoomImage = {
  src: string;
  alt: string;
  caption: string;
};

type Room = {
  id: string;
  name: string;
  images: RoomImage[];
};

const rooms: Room[] = [
  {
    id: "living",
    name: "Living room",
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

export default function HighlightsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id ?? "");

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
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="highlights"
      ref={rootRef}
      className={styles.roomTour}
      aria-label="Rooms through Vine Cottage"
    >
      <div className={styles.roomTourIntro}>
        <p className={styles.roomTourEyebrow}>Inside</p>
        <h2 className={styles.roomTourHeading}>Room by room.</h2>
        <p className={styles.roomTourLead}>
          Scroll down through the cottage — each space, full screen.
        </p>
      </div>

      <div className={styles.roomTourRailWrap}>
        <nav className={styles.roomTourRail} aria-label="Rooms">
          {rooms.map((room, index) => (
            <a
              key={room.id}
              href={`#room-${room.id}`}
              className={
                activeRoomId === room.id
                  ? styles.roomTourRailLinkActive
                  : styles.roomTourRailLink
              }
              aria-current={activeRoomId === room.id ? "true" : undefined}
            >
              <span className={styles.roomTourRailNum}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{room.name}</span>
            </a>
          ))}
        </nav>
      </div>

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
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={styles.roomTourImage}
              />
              <div className={styles.roomTourGradient} aria-hidden="true" />

              <div className={styles.roomTourMeta}>
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
    </section>
  );
}
