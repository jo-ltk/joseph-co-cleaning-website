"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("mousemove", handleGlobalMouseMove);
    }

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl cursor-col-resize select-none border border-aztec/10"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="After"
          fill
          className="object-cover"
          draggable={false}
        />
        {afterLabel && (
          <div className="absolute top-4 right-4 bg-aztec/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium tracking-wide z-10">
            {afterLabel}
          </div>
        )}
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before"
          fill
          className="object-cover"
          draggable={false}
        />
        {beforeLabel && (
          <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-md text-aztec px-3 py-1 rounded-full text-sm font-medium tracking-wide z-10">
            {beforeLabel}
          </div>
        )}
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Anchor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 flex items-center justify-center">
          
          {/* Animated Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.6],
              opacity: [0.4, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute w-12 h-12 rounded-full bg-white"
          />

          {/* Main Handle Circle */}
          <div className="w-14 h-14 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.16)] border border-aztec/5 flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 pointer-events-auto">
            <div className="flex items-center gap-1 text-aztec">
              <CaretLeft size={20} weight="bold" className="translate-x-0.5" />
              <CaretRight size={20} weight="bold" className="-translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Drag Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs uppercase tracking-[0.2em] font-bold pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Drag to compare
      </div>
    </div>
  );
}
