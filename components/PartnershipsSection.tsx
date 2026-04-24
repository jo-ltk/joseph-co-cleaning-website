"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";

import ScrollReveal from "./ScrollReveal";

const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Stripe", slug: "stripe" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Uber", slug: "uber" },
  { name: "AT&T", slug: "atandt" },
  { name: "Google", slug: "google" },
  { name: "Meta", slug: "meta" },
  { name: "3M", slug: "3m" },
  { name: "Slack", slug: "slack" },
  { name: "Shopify", slug: "shopify" },
];

const scatterY = [0, -14, 6, -8, 10, -4, 8, -12, 2, -6];
const floatDurations = [4.2, 3.6, 4.8, 3.9, 4.5, 3.4, 4.1, 3.7, 4.6, 3.8];
const shimmerDelays = [0, 1.5, 3, 0.8, 2.2, 4, 1, 3.5, 2.8, 0.5];
const springCfg = { stiffness: 220, damping: 22 };

function TiltCard({ brand, index }: { brand: typeof brands[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [14, -14]), springCfg);
  const rotY = useSpring(useTransform(mx, [0, 1], [-14, 14]), springCfg);

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() { mx.set(0.5); my.set(0.5); }

  return (
    <div className="p-float-wrap" style={{ transform: `translateY(${scatterY[index]}px)`, animation: `pFloat ${floatDurations[index]}s ease-in-out ${-index * 0.6}s infinite` }}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800, transformStyle: "preserve-3d" as const }}
        initial={{ opacity: 0, scale: 0.75, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.07, type: "spring", stiffness: 120 }} className="p-tilt-card">
        <div className="p-shimmer" style={{ animationDelay: `${shimmerDelays[index]}s` }} />
        <div className="p-card-inner">
          <div className="p-icon-ring">
            <img src={`https://cdn.simpleicons.org/${brand.slug}/112025`} alt={brand.name} className="p-icon" loading="lazy" />
          </div>
          <span className="p-name">{brand.name}</span>
        </div>
        <div className="p-glow" />
      </motion.div>
    </div>
  );
}

export default function PartnershipsSection() {
  return (
    <section className="p-section">
      <div className="mx-auto max-w-[1450px] px-5 md:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-pine-green font-semibold uppercase tracking-widest text-sm mb-4 block">
              Our Partners
            </motion.span>
            <ScrollReveal
              as="h2"
              enableBlur={true}
              blurStrength={8}
              containerClassName="p-heading text-2xl md:text-4xl leading-[1.1] text-aztec"
            >
              Trusted by Industry Leaders
            </ScrollReveal>
          </div>
          <motion.p
  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
  className="text-xanadu text-lg max-w-sm leading-relaxed"
>
  We are proud to serve leading brands and organizations who demand nothing less than excellence.
</motion.p>
        </div>
      </div>

      <div className="p-scroll p-desktop-only">
        <div className="p-row">
          {brands.map((b, i) => (<TiltCard key={b.slug} brand={b} index={i} />))}
        </div>
      </div>

      <div className="pm-wrap pm-mobile-only">
        <div className="pm-fade pm-fade--l" />
        <div className="pm-fade pm-fade--r" />
        <div className="pm-track">
          {[...brands, ...brands].map((b, i) => (
            <motion.div key={`m-${b.slug}-${i}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }} className="pm-pill">
              <img src={`https://cdn.simpleicons.org/${b.slug}/112025`} alt={b.name} className="pm-pill-icon" loading="lazy" />
              <span className="pm-pill-name">{b.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .p-section { background: var(--color-wild-sand); padding: 96px 0; overflow: hidden; }
        .p-heading { margin: 0; }
        .p-scroll { width: 100%; overflow-x: auto; overflow-y: visible; padding: 30px 0 40px; -ms-overflow-style: none; scrollbar-width: none; }
        .p-scroll::-webkit-scrollbar { display: none; }
        .p-row { display: flex; align-items: center; justify-content: center; gap: clamp(14px, 2vw, 24px); padding: 0 clamp(20px, 4vw, 60px); min-width: max-content; }
        :global(.p-float-wrap) { flex-shrink: 0; }
        :global(.p-tilt-card) { position: relative; display: flex; align-items: center; justify-content: center; width: clamp(120px, 14vw, 160px); aspect-ratio: 1 / 1.05; background: #fff; border-radius: 18px; border: 1px solid rgba(17,32,37,0.06); box-shadow: 0 4px 20px rgba(17,32,37,0.04); cursor: default; overflow: hidden; transition: box-shadow 0.4s ease, border-color 0.4s ease; }
        :global(.p-tilt-card:hover) { box-shadow: 0 16px 48px rgba(17,32,37,0.10), 0 0 0 1px rgba(17,32,37,0.08); border-color: rgba(17,32,37,0.12); }
        :global(.p-shimmer) { position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.7) 55%, transparent 70%); transform: translateX(-120%); animation: pShimmer 5s ease-in-out infinite; pointer-events: none; z-index: 2; }
        :global(.p-card-inner) { display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 1; }
        :global(.p-icon-ring) { width: 52px; height: 52px; border-radius: 50%; background: var(--color-wild-sand); display: flex; align-items: center; justify-content: center; transition: background 0.4s ease, transform 0.4s ease; }
        :global(.p-tilt-card:hover .p-icon-ring) { background: rgba(199,233,147,0.25); transform: scale(1.08); }
        :global(.p-icon) { width: 24px; height: 24px; object-fit: contain; filter: grayscale(100%); opacity: 0.5; transition: all 0.4s ease; }
        :global(.p-tilt-card:hover .p-icon) { filter: grayscale(0%); opacity: 1; }
        :global(.p-name) { font-family: var(--font-inter), sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-aztec); opacity: 0.4; transition: opacity 0.4s ease; }
        :global(.p-tilt-card:hover .p-name) { opacity: 1; }
        :global(.p-glow) { position: absolute; inset: -1px; border-radius: 18px; background: radial-gradient(circle at 50% 50%, rgba(199,233,147,0.15), transparent 70%); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; z-index: 0; }
        :global(.p-tilt-card:hover .p-glow) { opacity: 1; }
        @keyframes pFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pShimmer { 0%, 75%, 100% { transform: translateX(-120%); } 25% { transform: translateX(120%); } }
        .pm-mobile-only { display: none; }
        .pm-wrap { position: relative; width: 100%; overflow: hidden; padding: 8px 0; }
        .pm-fade { position: absolute; top: 0; bottom: 0; width: 40px; z-index: 2; pointer-events: none; }
        .pm-fade--l { left: 0; background: linear-gradient(to right, var(--color-wild-sand), transparent); }
        .pm-fade--r { right: 0; background: linear-gradient(to left, var(--color-wild-sand), transparent); }
        .pm-track { display: flex; gap: 12px; width: max-content; animation: pmScroll 22s linear infinite; will-change: transform; }
        :global(.pm-pill) { flex-shrink: 0; display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #fff; border-radius: 40px; border: 1px solid rgba(17,32,37,0.07); box-shadow: 0 2px 8px rgba(17,32,37,0.04); }
        :global(.pm-pill-icon) { width: 20px; height: 20px; object-fit: contain; opacity: 0.6; }
        :global(.pm-pill-name) { font-family: var(--font-inter), sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-aztec); white-space: nowrap; opacity: 0.55; }
        @keyframes pmScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (max-width: 768px) { .p-desktop-only { display: none; } .pm-mobile-only { display: block; } }
        @media (prefers-reduced-motion: reduce) { :global(.p-float-wrap), :global(.p-shimmer) { animation: none !important; } .pm-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; padding: 0 1rem; gap: 10px; } }
      `}</style>
    </section>
  );
}
