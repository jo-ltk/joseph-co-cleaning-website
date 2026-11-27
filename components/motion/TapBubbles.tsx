"use client";

import { useEffect, useRef } from "react";

/**
 * Soap bubbles that float up wherever the visitor taps / clicks (or drags a finger).
 * A fixed, click-through canvas — it never blocks taps. Skipped for reduced motion, and
 * for areas that already run their own burst effect (`[data-own-burst]`).
 */

type Bubble = {
  x: number; y: number; vx: number; vy: number; r: number;
  life: number; max: number; wobble: number;
};
type Drop = { x: number; y: number; vx: number; vy: number; life: number };

const MAX_BUBBLES = 140;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function TapBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let bubbles: Bubble[] = [];
    let drops: Drop[] = [];
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const emit = (x: number, y: number, n: number) => {
      const k = w < 640 ? 0.8 : 1;
      for (let i = 0; i < n * k && bubbles.length < MAX_BUBBLES; i++) {
        const a = rand(-Math.PI * 0.95, -Math.PI * 0.05); // upward fan
        const s = rand(0.8, 3.4);
        bubbles.push({
          x: x + rand(-8, 8), y: y + rand(-8, 8),
          vx: Math.cos(a) * s, vy: Math.sin(a) * s - rand(0.4, 1.2),
          r: rand(5, 18), life: 0, max: rand(1.8, 3.4), wobble: rand(0, 6.28),
        });
      }
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const drawBubble = (b: Bubble, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
      g.addColorStop(0, "rgba(255,255,255,0.08)");
      g.addColorStop(0.7, "rgba(191,233,255,0.22)");
      g.addColorStop(0.9, "rgba(255,210,240,0.38)");
      g.addColorStop(1, "rgba(255,255,255,0.75)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(120,160,190,0.45)";
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.ellipse(b.x - b.r * 0.38, b.y - b.r * 0.4, b.r * 0.22, b.r * 0.12, -0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    function tick(now: number) {
      const dt = Math.min(3, (now - (last || now)) / 16.667);
      last = now;
      ctx!.clearRect(0, 0, w, h);

      const keep: Bubble[] = [];
      for (const b of bubbles) {
        b.life += dt / 60;
        b.wobble += 0.08 * dt;
        b.vx *= Math.pow(0.985, dt);
        b.vy = b.vy * Math.pow(0.985, dt) - 0.02 * dt;
        b.x += b.vx * dt + Math.sin(b.wobble) * 0.45 * dt;
        b.y += b.vy * dt;
        if (b.life >= b.max || b.y < -b.r) {
          for (let i = 0; i < 6; i++) {
            const t = (i / 6) * Math.PI * 2;
            drops.push({ x: b.x + Math.cos(t) * b.r, y: b.y + Math.sin(t) * b.r, vx: Math.cos(t) * 1.8, vy: Math.sin(t) * 1.8, life: 1 });
          }
          continue;
        }
        const t = b.life / b.max;
        drawBubble(b, Math.min(1, t * 8, (1 - t) * 3));
        keep.push(b);
      }
      bubbles = keep;

      const keepDrops: Drop[] = [];
      for (const d of drops) {
        d.life -= dt * 0.08;
        if (d.life <= 0) continue;
        d.vx *= 0.9; d.vy = d.vy * 0.9 + 0.1 * dt;
        d.x += d.vx * dt; d.y += d.vy * dt;
        ctx!.globalAlpha = d.life * 0.8;
        ctx!.fillStyle = "#ffffff";
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
        keepDrops.push(d);
      }
      ctx!.globalAlpha = 1;
      drops = keepDrops;

      raf = bubbles.length || drops.length ? requestAnimationFrame(tick) : 0;
      if (!raf) ctx!.clearRect(0, 0, w, h);
    }

    let pressed = false;
    let lastTrail = 0;
    const skip = (e: PointerEvent) =>
      e.target instanceof Element && e.target.closest("[data-own-burst]");

    const onDown = (e: PointerEvent) => {
      if (skip(e)) return;
      pressed = true;
      emit(e.clientX, e.clientY, 9);
    };
    const onMove = (e: PointerEvent) => {
      if (!pressed || skip(e)) return;
      const now = performance.now();
      if (now - lastTrail < 90) return;
      lastTrail = now;
      emit(e.clientX, e.clientY, 2);
    };
    const onUp = () => {
      pressed = false;
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[25] h-full w-full" />;
}
