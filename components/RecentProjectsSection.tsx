"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "./ui/Button";
import ScrollReveal from "./ScrollReveal";

type Project = { title: string; image: string; alt: string };

const projects: Project[] = [
  { title: "The Heights Penthouse", image: "/images/projects/recent-project-1.png", alt: "Luxury penthouse living room with skyline view" },
  { title: "Regency Corporate Hub", image: "/images/projects/recent-project-2.png", alt: "Modern glass office building interior" },
  { title: "Luxe Retail Plaza", image: "/images/projects/recent-project-3.png", alt: "High-end shopping mall atrium" },
  { title: "Azure Marina Villas", image: "/images/projects/recent-project-4.png", alt: "Waterfront luxury villa exterior" },
  { title: "Global Tech Campus", image: "/images/unsplash/photo-1518770660439-4636190af475.jpg", alt: "Minimalist tech office lobby" },
  { title: "Skyview Residences", image: "/images/unsplash/photo-1506744038136-46273834b3fb.jpg", alt: "Modern apartment balcony view" },
  { title: "Beacon Health Center", image: "/images/unsplash/photo-1473341304170-971dccb5ac1e.jpg", alt: "Sterile medical facility hallway" },
  { title: "Grand Horizon Hotel", image: "/images/unsplash/photo-1516321318423-f06f85e504b3.jpg", alt: "Luxury hotel lobby with marble floors" },
  { title: "Nature Retreat Spa", image: "/images/unsplash/photo-1441974231531-c6227db76b6e.jpg", alt: "Serene spa interior" },
  { title: "Summit Executive Suites", image: "/images/unsplash/photo-1466611653911-95081537e5b7.jpg", alt: "High-floor executive office" },
  { title: "Elite Fitness Club", image: "/images/unsplash/photo-1489515217757-5fd1be406fef.jpg", alt: "High-end gym interior" },
  { title: "Legacy Library Hall", image: "/images/unsplash/photo-1505764706515-aa95265c5abc.jpg", alt: "Polished historic library" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Horizontal track with arrow paging, mouse drag-to-scroll, and a progress readout. */
function useGalleryTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const progress = max > 0 ? track.scrollLeft / max : 0;
    if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.06, progress)})`;
    const s = step();
    if (s) setActive(Math.min(projects.length - 1, Math.round(track.scrollLeft / s)));
  }, [step]);

  const page = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // Mouse drag-to-scroll (touch already scrolls natively).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = track.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        track.style.scrollSnapType = "none";
        track.style.cursor = "grabbing";
      }
      if (moved) track.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = "";
      if (moved) {
        const s = step();
        track.scrollTo({ left: s ? Math.round(track.scrollLeft / s) * s : track.scrollLeft, behavior: "smooth" });
        setTimeout(() => (track.style.scrollSnapType = ""), 500);
      }
    };
    // Swallow the click that ends a drag so cards don't navigate.
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    track.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    track.addEventListener("click", click, true);
    onScroll();
    return () => {
      track.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      track.removeEventListener("click", click, true);
    };
  }, [onScroll, step]);

  return { trackRef, barRef, active, onScroll, page };
}

function ArrowButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  const Icon = dir === 1 ? CaretRight : CaretLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Next projects" : "Previous projects"}
      className="flex h-12 w-12 items-center justify-center border border-aztec/15 text-aztec transition-colors duration-300 hover:border-aztec hover:bg-aztec hover:text-yellow-green md:h-14 md:w-14"
    >
      <Icon size={20} weight="bold" aria-hidden />
    </button>
  );
}

export default function RecentProjectsSection() {
  const { trackRef, barRef, active, onScroll, page } = useGalleryTrack();

  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 text-aztec md:pb-28 md:pt-24">
      {/* Header */}
      <div className="px-5 md:px-10 lg:px-20">
        <div className="mx-auto mb-12 grid max-w-[1450px] gap-8 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <span
              data-reveal
              className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-pine-green"
            >
              <span className="h-px w-10 bg-pine-green" aria-hidden />
              Portfolio Highlights
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="max-w-3xl text-3xl leading-[1.05] tracking-tight text-aztec md:text-5xl lg:text-6xl"
            >
              Signature Results, Global Standards
            </ScrollReveal>
          </div>
          <p
            data-reveal
            data-reveal-delay="0.15"
            className="max-w-sm border-t border-pine-green/30 pt-5 text-base leading-relaxed text-xanadu md:text-lg lg:col-span-4 lg:justify-self-end"
          >
            Explore our portfolio of high-end penthouses, corporate headquarters, and luxury estates maintained to the Joseph.co standard.
          </p>
        </div>
      </div>

      {/* Track: starts at the content edge, bleeds off the right of the viewport */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        data-reveal-group
        className="flex cursor-grab snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-6 pl-5 pr-5 scroll-pl-5 [scrollbar-width:none] md:gap-6 md:pl-10 md:scroll-pl-10 lg:pl-20 lg:scroll-pl-20 xl:pl-[max(5rem,calc((100vw-1450px)/2))] xl:scroll-pl-[max(5rem,calc((100vw-1450px)/2))] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <Link
            key={project.title}
            href="/gallery"
            data-card
            data-reveal-item
            draggable={false}
            aria-label={`View ${project.title}`}
            className={`group relative block w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[400px] ${index % 2 === 1 ? "md:mt-14" : ""}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#d9d9d2]">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                draggable={false}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 400px"
                className={`object-cover transition-transform duration-[1.2s] ${ease} group-hover:scale-[1.07]`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aztec/85 via-aztec/10 to-transparent" />

              <span className="absolute left-5 top-5 font-sans text-[11px] font-bold tracking-[.2em] text-white/85">
                {pad(index + 1)}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="mb-4 text-xl font-medium leading-tight tracking-tight text-white md:text-2xl">
                  {project.title}
                </h3>
                <span
                  className={`inline-flex translate-y-2 items-center gap-2 bg-yellow-green px-3.5 py-2 font-sans text-[11px] font-bold uppercase tracking-[.16em] text-aztec opacity-0 transition-all duration-500 ${ease} group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
                >
                  View project
                  <ArrowUpRight size={14} weight="bold" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Controls */}
      <div className="px-5 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1450px] flex-wrap items-center gap-6 md:gap-10">
          <span className="font-sans text-sm font-bold tabular-nums tracking-[.2em] text-aztec">
            {pad(active + 1)} <span className="text-aztec/30">/ {pad(projects.length)}</span>
          </span>
          <div className="relative h-px min-w-[120px] flex-1 bg-aztec/10">
            <span
              ref={barRef}
              className="absolute inset-y-[-1px] left-0 w-full origin-left bg-pine-green transition-transform duration-300"
              style={{ transform: "scaleX(0.06)" }}
              aria-hidden
            />
          </div>
          <div className="flex gap-2">
            <ArrowButton dir={-1} onClick={() => page(-1)} />
            <ArrowButton dir={1} onClick={() => page(1)} />
          </div>
          <ButtonLink href="/gallery" variant="primary" className="!h-12 !px-7 md:!h-14">
            View All
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
