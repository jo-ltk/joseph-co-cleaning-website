"use client";

import { RefObject, useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/motion/gsap";
import { useMotion } from "@/lib/motion/useMotion";

/**
 * "Cleaning cracker" — a canvas overlay that makes spray bottles fire off mist, soap
 * bubbles and sparkle fireworks when the section scrolls into view (Diwali-cracker style).
 *
 *  - Enter / re-enter the section → staggered nozzle bursts + rockets that explode into stars
 *  - Fast scrolling while visible → extra bubbles drift up from the bottles
 *  - Click / tap the image → a burst at the pointer
 *
 * Render it as the LAST child of a positioned section: the canvas fills its parent, and
 * emitters are fractions of the `anchorRef` element (the product image), so the effect
 * follows the image at every breakpoint. Disabled under prefers-reduced-motion.
 */

type Emitter = { x: number; y: number; angle: number }; // angle in degrees, 0 = right, -90 = up

type Kind = "mist" | "bubble" | "spark" | "rocket" | "drop" | "ring";

type Particle = {
  kind: Kind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  max: number;
  rot: number;
  vr: number;
  color: string;
  wobble: number;
  gravity: number;
  drag: number;
};

type BurstApi = {
  burst: (x: number, y: number, angle: number, power?: number) => void;
  rocket: (x: number, y: number, targetY: number) => void;
  bubbles: (x: number, y: number, n: number) => void;
};

const COLORS = ["#ffffff", "#ffffff", "#112025", "#4cc3ff", "#ffd24a", "#ff5d7a"];
const SPARK_SHADOW = "rgba(17, 32, 37, 0.45)";
const MAX_PARTICLES = 900;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

export default function SparkleBurst({
  anchorRef,
  emitters,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  emitters: Emitter[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<BurstApi | null>(null);

  // Particle engine — lives for the component's lifetime; the loop only runs while particles exist.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    // New particles always land here and are merged after each frame, so spawning
    // mid-iteration (trails, pops, explosions) never mutates the list being walked.
    let spawn: Particle[] = [];
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    const scale = () => (w < 640 ? 0.55 : 1);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const add = (p: Partial<Particle> & Pick<Particle, "kind" | "x" | "y">) => {
      if (particles.length + spawn.length >= MAX_PARTICLES) return;
      const max = p.max ?? 1;
      spawn.push({
        vx: 0, vy: 0, r: 2, rot: 0, vr: 0, color: "#fff", wobble: Math.random() * 6.28,
        gravity: 0, drag: 1, ...p, life: max, max,
      });
    };

    const spray = (x: number, y: number, angle: number, power = 1) => {
      const k = scale() * power;
      const a = (angle * Math.PI) / 180;
      // Mist cone
      for (let i = 0; i < 46 * k; i++) {
        const t = a + rand(-0.35, 0.35);
        const s = rand(3, 10) * Math.sqrt(power);
        add({ kind: "mist", x, y, vx: Math.cos(t) * s, vy: Math.sin(t) * s, r: rand(0.8, 2.4), max: rand(0.5, 1.1), drag: 0.93, gravity: 0.03, color: Math.random() < 0.5 ? "#ffffff" : "#bfe9ff" });
      }
      // Sparkle fountain
      for (let i = 0; i < 34 * k; i++) {
        const t = a + rand(-0.7, 0.7);
        const s = rand(5, 13) * Math.sqrt(power);
        add({ kind: "spark", x, y, vx: Math.cos(t) * s, vy: Math.sin(t) * s - 2, r: rand(4, 11), max: rand(0.9, 1.8), rot: rand(0, 6.28), vr: rand(-0.2, 0.2), drag: 0.965, gravity: 0.16, color: pick(COLORS) });
      }
      // Soap bubbles
      for (let i = 0; i < 18 * k; i++) {
        const t = a + rand(-0.6, 0.6);
        const s = rand(1.5, 4.5);
        add({ kind: "bubble", x: x + rand(-10, 10), y: y + rand(-10, 10), vx: Math.cos(t) * s, vy: Math.sin(t) * s - rand(0.5, 1.5), r: rand(5, 17), max: rand(1.8, 3.6), drag: 0.985, gravity: -0.025 });
      }
    };

    const rocket = (x: number, y: number, targetY: number) => {
      // Velocity so that it decelerates to ~0 near targetY under gravity g (per frame).
      const g = 0.22;
      const vy = -Math.sqrt(2 * g * Math.max(80, y - targetY));
      add({ kind: "rocket", x, y, vx: rand(-1.2, 1.2), vy, r: 3, max: 4, gravity: g, drag: 1, color: pick(["#ffffff", "#ffd24a", "#4cc3ff"]) });
    };

    const explode = (x: number, y: number) => {
      const k = scale();
      const n = Math.round(64 * k);
      const color = pick(COLORS);
      add({ kind: "ring", x, y, r: 6, max: 0.45, color: "#ffffff" });
      add({ kind: "ring", x, y, r: 3, max: 0.6, color });
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
        const s = rand(6, 11.5);
        add({ kind: "spark", x, y, vx: Math.cos(t) * s, vy: Math.sin(t) * s, r: rand(4, 10), max: rand(1.1, 1.9), rot: rand(0, 6.28), vr: rand(-0.25, 0.25), drag: 0.94, gravity: 0.08, color: Math.random() < 0.6 ? color : "#ffffff" });
      }
      for (let i = 0; i < 14 * k; i++) {
        const t = rand(0, Math.PI * 2);
        const s = rand(1, 4);
        add({ kind: "bubble", x, y, vx: Math.cos(t) * s, vy: Math.sin(t) * s, r: rand(4, 13), max: rand(1.6, 3), drag: 0.97, gravity: -0.02 });
      }
    };

    const pop = (p: Particle) => {
      for (let i = 0; i < 6; i++) {
        const t = (i / 6) * Math.PI * 2;
        add({ kind: "drop", x: p.x + Math.cos(t) * p.r, y: p.y + Math.sin(t) * p.r, vx: Math.cos(t) * 1.8, vy: Math.sin(t) * 1.8, r: 1.3, max: 0.35, drag: 0.9, gravity: 0.1, color: "#ffffff" });
      }
    };

    const drawStar = (p: Particle, alpha: number) => {
      const r = p.r * (0.6 + 0.4 * Math.abs(Math.sin(p.wobble * 3)));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color === "#112025" ? "rgba(255,255,255,0.6)" : SPARK_SHADOW;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const rr = i % 2 === 0 ? r : r * 0.22;
        const t = (i * Math.PI) / 4;
        ctx.lineTo(Math.cos(t) * rr, Math.sin(t) * rr);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawBubble = (p: Particle, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      const g = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.1, p.x, p.y, p.r);
      g.addColorStop(0, "rgba(255,255,255,0.05)");
      g.addColorStop(0.7, "rgba(191,233,255,0.18)");
      g.addColorStop(0.9, "rgba(255,210,240,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0.7)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(17,32,37,0.22)";
      ctx.stroke();
      // Highlight
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.ellipse(p.x - p.r * 0.38, p.y - p.r * 0.4, p.r * 0.22, p.r * 0.12, -0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(3, (now - (last || now)) / 16.667);
      last = now;
      ctx.clearRect(0, 0, w, h);

      particles = particles.concat(spawn);
      spawn = [];
      const next: Particle[] = [];
      for (const p of particles) {
        p.life -= dt / 60;
        p.vx *= Math.pow(p.drag, dt);
        p.vy = p.vy * Math.pow(p.drag, dt) + p.gravity * dt;
        p.wobble += 0.08 * dt;
        p.x += p.vx * dt + (p.kind === "bubble" ? Math.sin(p.wobble) * 0.4 * dt : 0);
        p.y += p.vy * dt;
        p.rot += p.vr * dt;

        if (p.kind === "rocket") {
          // Glittering trail
          if (Math.random() < 0.9) add({ kind: "mist", x: p.x + rand(-1.5, 1.5), y: p.y, vx: rand(-0.4, 0.4), vy: rand(0.5, 1.5), r: rand(0.8, 2), max: rand(0.3, 0.6), drag: 0.95, color: p.color });
          if (p.vy > -1.2) {
            explode(p.x, p.y);
            continue;
          }
        }
        if (p.life <= 0) {
          if (p.kind === "bubble") pop(p);
          continue;
        }

        const t = p.life / p.max;
        switch (p.kind) {
          case "bubble":
            drawBubble(p, Math.min(1, t * 3, (1 - t) * 8));
            break;
          case "spark":
            drawStar(p, Math.min(1, t * 1.6));
            break;
          case "ring": {
            // Cracker "pop": a bright shockwave that expands and fades.
            const radius = p.r + (1 - t) * 90;
            ctx.save();
            ctx.globalAlpha = t;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2 + t * 6;
            ctx.shadowColor = SPARK_SHADOW;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            break;
          }
          default: {
            ctx.globalAlpha = Math.min(1, t * 1.5) * (p.kind === "mist" ? 0.8 : 1);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * (p.kind === "rocket" ? 1 : 0.6 + 0.4 * t), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
        next.push(p);
      }
      particles = next;
      raf = particles.length || spawn.length ? requestAnimationFrame(tick) : 0;
      if (!raf) ctx.clearRect(0, 0, w, h);
    };

    const startLoop = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    // Section-relative coordinates, called by the scroll / click triggers below.
    api.current = {
      burst: (x, y, angle, power = 1) => {
        spray(x, y, angle, power);
        startLoop();
      },
      rocket: (x, y, targetY) => {
        rocket(x, y, targetY);
        startLoop();
      },
      bubbles: (x, y, n) => {
        for (let i = 0; i < n; i++) add({ kind: "bubble", x: x + rand(-30, 30), y, vx: rand(-1, 1), vy: rand(-3, -1.2), r: rand(4, 14), max: rand(1.8, 3.2), drag: 0.99, gravity: -0.02 });
        startLoop();
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      particles = [];
      spawn = [];
      api.current = null;
    };
  }, []);

  // Scroll / click triggers — rebuilt with motion conditions; skipped for reduced motion.
  useMotion(
    (env) => {
      const section = canvasRef.current?.parentElement;
      const anchor = anchorRef.current;
      if (env.reduced || !section || !anchor) return;

      const point = (e: Emitter) => {
        const s = section.getBoundingClientRect();
        const a = anchor.getBoundingClientRect();
        return { x: a.left - s.left + e.x * a.width, y: a.top - s.top + e.y * a.height };
      };
      const headingY = () => section.clientHeight * 0.1;
      const timers: number[] = [];
      const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
      const extra = () => api.current;

      let lastShow = 0;
      const show = () => {
        const now = performance.now();
        if (now - lastShow < 1500) return; // avoid double-firing on quick back-and-forth
        lastShow = now;
        emitters.forEach((e, i) =>
          later(i * 220, () => {
            const p = point(e);
            extra()?.burst(p.x, p.y, e.angle, 1);
            anchor.animate(
              [{ transform: "scale(1)" }, { transform: "scale(1.015) translateY(-4px)" }, { transform: "scale(1)" }],
              { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" },
            );
          }),
        );
        // Crackers: rockets launch from the bottles and burst around the heading.
        emitters.forEach((e, i) =>
          later(420 + i * 240, () => {
            const p = point(e);
            extra()?.rocket(p.x, p.y, headingY() + Math.random() * section.clientHeight * 0.15);
          }),
        );
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: "bottom top",
        onEnter: show,
        onEnterBack: show,
        onUpdate: (self) => {
          // Scrolling through the section shakes loose a few bubbles.
          const v = Math.abs(self.getVelocity());
          if (v > 600 && Math.random() < 0.35) {
            const e = emitters[(Math.random() * emitters.length) | 0];
            const p = point(e);
            extra()?.bubbles(p.x, p.y, Math.min(6, Math.round(v / 600)));
          }
        },
      });

      const onClick = (ev: MouseEvent) => {
        const s = section.getBoundingClientRect();
        extra()?.burst(ev.clientX - s.left, ev.clientY - s.top, -90, 1.2);
      };
      // Listen on the whole section so a tap anywhere on the green band fires a burst.
      section.addEventListener("click", onClick);

      return () => {
        st.kill();
        timers.forEach(clearTimeout);
        section.removeEventListener("click", onClick);
      };
    },
    { dependencies: [emitters] },
  );

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-20" />;
}
