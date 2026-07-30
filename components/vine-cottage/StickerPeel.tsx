"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface StickerPeelProps {
  imageSrc: string;
  alt?: string;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  /** Pixel width; when omitted, fills the parent stage. */
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?: "center" | { x: number; y: number };
  peelDirection?: number;
  className?: string;
  /** Aztec-tinted shadow for Vine Cottage theme. */
  shadowColor?: string;
  /** Paper backing revealed under the peel. */
  backingColor?: string;
  lightingColor?: string;
  draggable?: boolean;
  /** When false, keeps shadow/lighting but disables peel + flap layers. */
  enablePeel?: boolean;
}

interface CSSVars extends CSSProperties {
  "--sticker-rotate"?: string;
  "--sticker-p"?: string;
  "--sticker-peelback-hover"?: string;
  "--sticker-peelback-active"?: string;
  "--sticker-peel-easing"?: string;
  "--sticker-peel-hover-easing"?: string;
  "--sticker-width"?: string;
  "--sticker-shadow-opacity"?: number;
  "--sticker-lighting-constant"?: number;
  "--peel-direction"?: string;
  "--sticker-start"?: string;
  "--sticker-end"?: string;
}

export default function StickerPeel({
  imageSrc,
  alt = "",
  rotate = 1.5,
  peelBackHoverPct = 14,
  peelBackActivePct = 26,
  peelEasing = "power3.out",
  peelHoverEasing = "power2.out",
  width,
  shadowIntensity = 0.45,
  lightingIntensity = 0.08,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
  shadowColor = "#112025",
  backingColor = "#dce8c8",
  lightingColor = "#f6f6f6",
  draggable = true,
  enablePeel = true,
}: StickerPeelProps) {
  const reactId = useId().replace(/:/g, "");
  const filterIds = useMemo(
    () => ({
      pointLight: `fp-pointLight-${reactId}`,
      pointLightFlipped: `fp-pointLightFlipped-${reactId}`,
      dropShadow: `fp-dropShadow-${reactId}`,
      expandAndFill: `fp-expandAndFill-${reactId}`,
    }),
    [reactId],
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);

  const [measuredWidth, setMeasuredWidth] = useState(width ?? 720);
  const [reduceMotion, setReduceMotion] = useState(false);

  const defaultPadding = 10;
  const stickerWidth = width ?? measuredWidth;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (width != null) {
      setMeasuredWidth(width);
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const next = Math.max(280, Math.floor(stage.clientWidth));
      setMeasuredWidth(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [width]);

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    if (initialPosition === "center") return;

    if (
      typeof initialPosition === "object" &&
      initialPosition.x !== undefined &&
      initialPosition.y !== undefined
    ) {
      gsap.set(target, { x: initialPosition.x, y: initialPosition.y });
    }
  }, [initialPosition]);

  useEffect(() => {
    const target = dragTargetRef.current;
    const stage = stageRef.current;
    if (!target || !stage || !draggable || reduceMotion) return;

    const instances = Draggable.create(target, {
      type: "x,y",
      bounds: stage,
      inertia: false,
      onDrag(this: Draggable) {
        const rot = gsap.utils.clamp(-10, 10, this.deltaX * 0.28);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: "power1.out" });
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.7, ease: "power2.out" });
      },
    });

    draggableInstanceRef.current = instances[0];

    const handleResize = () => {
      const instance = draggableInstanceRef.current;
      if (!instance) return;
      instance.update();

      const currentX = gsap.getProperty(target, "x") as number;
      const currentY = gsap.getProperty(target, "y") as number;
      const boundsRect = stage.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const maxX = Math.max(0, boundsRect.width - targetRect.width);
      const maxY = Math.max(0, boundsRect.height - targetRect.height);
      const newX = Math.max(0, Math.min(currentX, maxX));
      const newY = Math.max(0, Math.min(currentY, maxY));

      if (newX !== currentX || newY !== currentY) {
        gsap.to(target, {
          x: newX,
          y: newY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      draggableInstanceRef.current?.kill();
      draggableInstanceRef.current = null;
    };
  }, [draggable, reduceMotion, stickerWidth]);

  useEffect(() => {
    if (reduceMotion) return;

    const updateLight = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      if (pointLightRef.current) {
        gsap.set(pointLightRef.current, { attr: { x, y } });
      }

      const normalizedAngle = Math.abs(peelDirection % 360);
      if (pointLightFlippedRef.current) {
        if (normalizedAngle !== 180) {
          gsap.set(pointLightFlippedRef.current, {
            attr: { x, y: rect.height - y },
          });
        } else {
          gsap.set(pointLightFlippedRef.current, {
            attr: { x: -1000, y: -1000 },
          });
        }
      }
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", updateLight);
    return () => container.removeEventListener("mousemove", updateLight);
  }, [peelDirection, reduceMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduceMotion) return;

    const handleTouchStart = () => container.classList.add("touch-active");
    const handleTouchEnd = () => container.classList.remove("touch-active");

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [reduceMotion]);

  const cssVars: CSSVars = useMemo(
    () => ({
      "--sticker-rotate": `${rotate}deg`,
      "--sticker-p": `${defaultPadding}px`,
      "--sticker-peelback-hover": `${peelBackHoverPct}%`,
      "--sticker-peelback-active": `${peelBackActivePct}%`,
      "--sticker-peel-easing": peelEasing,
      "--sticker-peel-hover-easing": peelHoverEasing,
      "--sticker-width": `${stickerWidth}px`,
      "--sticker-shadow-opacity": shadowIntensity,
      "--sticker-lighting-constant": lightingIntensity,
      "--peel-direction": `${peelDirection}deg`,
      "--sticker-start": `calc(-1 * ${defaultPadding}px)`,
      "--sticker-end": `calc(100% + ${defaultPadding}px)`,
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      stickerWidth,
      shadowIntensity,
      lightingIntensity,
      peelDirection,
    ],
  );

  const stickerMainStyle: CSSProperties = {
    clipPath: enablePeel
      ? "polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end))"
      : undefined,
    transition:
      enablePeel && !reduceMotion
        ? "clip-path 0.55s var(--sticker-peel-hover-easing)"
        : undefined,
    filter: `url(#${filterIds.dropShadow})`,
    willChange:
      enablePeel && !reduceMotion ? "clip-path, transform" : undefined,
  };

  const flapStyle: CSSProperties = {
    clipPath:
      "polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-start) var(--sticker-start))",
    top: "calc(-100% - var(--sticker-p) - var(--sticker-p))",
    transform: "scaleY(-1)",
    transition: reduceMotion ? undefined : "all 0.55s var(--sticker-peel-hover-easing)",
    willChange: reduceMotion ? undefined : "clip-path, transform",
  };

  const imageStyle: CSSProperties = {
    transform: `rotate(calc(${rotate}deg - ${peelDirection}deg))`,
    width: `${stickerWidth}px`,
    maxWidth: "100%",
    height: "auto",
    display: "block",
  };

  const shadowImageStyle: CSSProperties = {
    ...imageStyle,
    filter: `url(#${filterIds.expandAndFill})`,
  };

  const peelActive = enablePeel && !reduceMotion;

  const peelStyles = peelActive
    ? `
    .sticker-peel-${reactId}:hover .sticker-main,
    .sticker-peel-${reactId}.touch-active .sticker-main {
      clip-path: polygon(var(--sticker-start) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;
    }
    .sticker-peel-${reactId}:hover .sticker-flap,
    .sticker-peel-${reactId}.touch-active .sticker-flap {
      clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-start) var(--sticker-peelback-hover)) !important;
      top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px) !important;
    }
    .sticker-peel-${reactId}:active .sticker-main {
      clip-path: polygon(var(--sticker-start) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;
    }
    .sticker-peel-${reactId}:active .sticker-flap {
      clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-start) var(--sticker-peelback-active)) !important;
      top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px) !important;
    }
  `
    : "";

  return (
    <div ref={stageRef} className={`relative w-full ${className}`}>
      <div
        ref={dragTargetRef}
        className={`relative mx-auto w-fit max-w-full transform-gpu ${
          draggable && !reduceMotion
            ? "cursor-grab active:cursor-grabbing"
            : "cursor-default"
        }`}
        style={cssVars}
      >
        <style dangerouslySetInnerHTML={{ __html: peelStyles }} />

        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id={filterIds.pointLight}>
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feSpecularLighting
                result="spec"
                in="blur"
                specularExponent="100"
                specularConstant={lightingIntensity}
                lightingColor={lightingColor}
              >
                <fePointLight
                  ref={pointLightRef}
                  x="100"
                  y="100"
                  z="300"
                />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceGraphic" result="lit" />
              <feComposite in="lit" in2="SourceAlpha" operator="in" />
            </filter>

            <filter id={filterIds.pointLightFlipped}>
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feSpecularLighting
                result="spec"
                in="blur"
                specularExponent="100"
                specularConstant={lightingIntensity * 6}
                lightingColor={lightingColor}
              >
                <fePointLight
                  ref={pointLightFlippedRef}
                  x="100"
                  y="100"
                  z="300"
                />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceGraphic" result="lit" />
              <feComposite in="lit" in2="SourceAlpha" operator="in" />
            </filter>

            <filter id={filterIds.dropShadow}>
              <feDropShadow
                dx="1"
                dy="6"
                stdDeviation={4 * shadowIntensity}
                floodColor={shadowColor}
                floodOpacity={shadowIntensity}
              />
            </filter>

            <filter id={filterIds.expandAndFill}>
              <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
              <feFlood floodColor={backingColor} result="flood" />
              <feComposite operator="in" in="flood" in2="shape" />
            </filter>
          </defs>
        </svg>

        <div
          ref={containerRef}
          className={`sticker-peel-${reactId} relative select-none touch-none sm:touch-auto`}
          style={{
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
            WebkitTapHighlightColor: "transparent",
            transform: `rotate(${peelDirection}deg)`,
            transformOrigin: "center",
          }}
        >
          <div className="sticker-main" style={stickerMainStyle}>
            <div style={{ filter: `url(#${filterIds.pointLight})` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={alt}
                className="block"
                style={imageStyle}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {enablePeel ? (
            <>
              <div
                className="pointer-events-none absolute left-1 top-3 h-full w-full opacity-35"
                style={{ filter: "brightness(0) blur(10px)" }}
                aria-hidden="true"
              >
                <div className="sticker-flap" style={flapStyle}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt=""
                    className="block"
                    style={shadowImageStyle}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>

              <div
                className="sticker-flap absolute left-0 h-full w-full"
                style={flapStyle}
                aria-hidden="true"
              >
                <div style={{ filter: `url(#${filterIds.pointLightFlipped})` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt=""
                    className="block"
                    style={shadowImageStyle}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
