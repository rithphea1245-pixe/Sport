"use client";

import React, { useState, useRef } from "react";
import { Radio, Zap, Activity, Compass, ShieldCheck, Flame } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function HeroFloating3DCard() {
  const { isKhmer } = useLanguage();
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  const [tilt1, setTilt1] = useState({ rx: -5, ry: 10, glareX: 50, glareY: 50 });
  const [tilt2, setTilt2] = useState({ rx: 6, ry: -8, glareX: 50, glareY: 50 });

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card1Ref.current) return;
    const rect = card1Ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setTilt1({
      rx: -py * 15,
      ry: px * 18,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave1 = () => {
    setTilt1({ rx: -5, ry: 10, glareX: 50, glareY: 50 });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card2Ref.current) return;
    const rect = card2Ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setTilt2({
      rx: -py * 14,
      ry: px * 16,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave2 = () => {
    setTilt2({ rx: 6, ry: -8, glareX: 50, glareY: 50 });
  };

  return (
    <>
      {/* 3D Floating Card 1: Top Right Radar Card */}
      <div
        ref={card1Ref}
        onMouseMove={handleMouseMove1}
        onMouseLeave={handleMouseLeave1}
        style={{
          transform: `perspective(900px) rotateX(${tilt1.rx}deg) rotateY(${tilt1.ry}deg) translateZ(25px)`,
          transition: "transform 0.15s ease-out",
        }}
        className="absolute top-1 sm:top-2 right-1 sm:right-4 lg:right-4 z-20 w-44 sm:w-56 lg:w-60 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#1C2215]/90 backdrop-blur-xl border border-[#C6FE56]/40 shadow-2xl shadow-black/60 cursor-pointer select-none group"
      >
        {/* Specular glare */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${tilt1.glareX}% ${tilt1.glareY}%, rgba(198, 254, 86, 0.5) 0%, transparent 60%)`,
          }}
        />

        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FE56] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#C6FE56]" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-wider">
              {isKhmer ? "ការផ្សាយផ្ទាល់" : "LIVE RADAR"}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#C6FE56] text-[#12150D]">
            2026 CPL
          </span>
        </div>

        <p className="text-[11px] sm:text-xs font-extrabold text-[#F8F9F3] truncate">
          {isKhmer ? "ពហុកីឡដ្ឋានជាតិអូឡាំពិក" : "National Olympic Stadium"}
        </p>
        <p className="text-[9px] sm:text-[10px] text-[#8E9B7E] flex items-center gap-1 mt-0.5 truncate">
          <Compass className="w-3 h-3 text-[#C6FE56] shrink-0" />
          Phnom Penh • 11.57° N, 104.92° E
        </p>

        {/* Mini Radar Activity Wave */}
        <div className="mt-2 sm:mt-2.5 pt-1.5 sm:pt-2 border-t border-[#2B3520] flex items-center justify-between text-[9px] sm:text-[10px] text-[#C6FE56] font-mono">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-[#C6FE56] animate-pulse" />
            LIVE FEED
          </span>
          <span className="text-[#8E9B7E]">100% ONLINE</span>
        </div>
      </div>

      {/* 3D Floating Card 2: Bottom Left Tournament Stat Card */}
      <div
        ref={card2Ref}
        onMouseMove={handleMouseMove2}
        onMouseLeave={handleMouseLeave2}
        style={{
          transform: `perspective(900px) rotateX(${tilt2.rx}deg) rotateY(${tilt2.ry}deg) translateZ(30px)`,
          transition: "transform 0.15s ease-out",
        }}
        className="absolute bottom-1 sm:bottom-2 left-1 sm:left-4 z-20 w-48 sm:w-56 lg:w-64 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#12150D]/95 backdrop-blur-xl border border-[#2B3520] hover:border-[#C6FE56]/50 shadow-2xl shadow-black/80 cursor-pointer select-none group"
      >
        {/* Specular glare */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-35 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${tilt2.glareX}% ${tilt2.glareY}%, rgba(198, 254, 86, 0.4) 0%, transparent 60%)`,
          }}
        />

        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-[#8E9B7E] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            {isKhmer ? "គុនខ្មែរ ជើងឯកពិភពលោក" : "Kun Khmer World Bout"}
          </span>
          <span className="text-[10px] font-mono font-bold text-[#C6FE56]">
            ROUND 5
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 mt-1">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
              98.7%
            </div>
            <div className="text-[10px] text-[#8E9B7E] font-medium">
              {isKhmer ? "កម្រិតសកម្មភាពអ្នកទស្សនា" : "Fan Excitement Index"}
            </div>
          </div>

          {/* Mini dynamic animated visualizer equalizer bars */}
          <div className="flex items-end gap-1 h-7 pb-1">
            <span className="w-1.5 bg-[#C6FE56] rounded-full animate-[bounce_1.1s_infinite] h-4" />
            <span className="w-1.5 bg-[#C6FE56] rounded-full animate-[bounce_0.8s_infinite] h-6" />
            <span className="w-1.5 bg-[#C6FE56] rounded-full animate-[bounce_1.3s_infinite] h-3" />
            <span className="w-1.5 bg-[#C6FE56] rounded-full animate-[bounce_0.9s_infinite] h-7" />
            <span className="w-1.5 bg-[#C6FE56] rounded-full animate-[bounce_1.2s_infinite] h-5" />
          </div>
        </div>
      </div>
    </>
  );
}
