"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "@phosphor-icons/react/dist/ssr";

import type { InstagramMediaItem } from "@/types/instagram";

type Props = {
  item: InstagramMediaItem;
  featured?: boolean;
  index?: number;
};

export default function LatestUpdatesCard({ item, featured = false, index = 0 }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const label = item.captionExcerpt ?? (item.isVideo ? "Watch highlight" : "View highlight");

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.36),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={featured ? "col-span-2 row-span-2" : undefined}
    >
      <a
        href={item.permalink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_18px_50px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-green ${
          featured
            ? "min-h-[320px] aspect-[4/5] md:min-h-[420px] md:aspect-auto"
            : "aspect-[4/5]"
        }`}
      >
        <Image
          src={item.thumbnailUrl}
          alt=""
          fill
          unoptimized
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5 transition-opacity duration-300 group-hover:from-black/80" />

        {item.isVideo && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md md:left-4 md:top-4 md:px-3 md:py-1.5 md:text-xs">
            <Play size={14} weight="fill" aria-hidden />
            Video
          </span>
        )}

        {item.captionExcerpt && (
          <p
            className="absolute inset-x-0 bottom-0 z-10 line-clamp-2 px-3 pb-3 text-xs font-medium leading-snug text-white/95 sm:px-4 sm:pb-4 sm:text-sm md:line-clamp-3"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {item.captionExcerpt}
          </p>
        )}

        {item.isVideo && (
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14">
              <Play size={26} weight="fill" />
            </span>
          </span>
        )}
      </a>
    </motion.article>
  );
}
