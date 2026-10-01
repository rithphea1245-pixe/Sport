"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";

export function HeroTextBackground() {
  const { isKhmer } = useLanguage();

  const tickerItems1 = [
    "CAMBODIAN PREMIER LEAGUE 2026",
    "KUN KHMER WORLD GRAND PRIX",
    "ANGKOR HERITAGE HALF MARATHON",
    "NATIONAL OLYMPIC ARENA",
    "REAL-TIME MATCH BROADCAST",
    "PHNOM PENH STADIUM COMPLEX",
  ];

  const tickerItems2 = [
    "LIVE API SYNCHRONIZED",
    "CHAMPIONSHIP MEDALS",
    "FAN DISCUSSION ARENAS",
    "SIEM REAP MULTI-SPORT CENTER",
    "OFFICIAL TOURNAMENT PASS",
    "ELITE ATHLETE PROFILES",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Giant Kinetic Typographic Watermark in Background */}
      <div className="absolute -top-6 -left-10 text-[110px] sm:text-[160px] lg:text-[210px] font-black uppercase tracking-tighter leading-none opacity-20 text-transparent font-sans whitespace-nowrap [text-stroke:1.5px_#C6FE56] [-webkit-text-stroke:1.5px_#C6FE56]">
        SPORTS HUB
      </div>

      <div className="absolute -bottom-10 -right-10 text-[100px] sm:text-[140px] lg:text-[180px] font-black uppercase tracking-tighter leading-none opacity-15 text-transparent font-sans whitespace-nowrap [text-stroke:1.5px_#C6FE56] [-webkit-text-stroke:1.5px_#C6FE56]">
        {isKhmer ? "កីឡាជាតិ ២០២៦" : "ARENA 2026"}
      </div>

      {/* Futuristic Kinetic Marquee Ribbon 1 (Top Left to Right) */}
      <div className="absolute top-1/4 -left-10 -right-10 transform -rotate-1 opacity-25">
        <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-black tracking-widest text-[#C6FE56] uppercase">
          {[...tickerItems1, ...tickerItems1].map((text, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FE56]" />
            </span>
          ))}
        </div>
      </div>

      {/* Futuristic Kinetic Marquee Ribbon 2 (Bottom Right to Left) */}
      <div className="absolute bottom-1/4 -left-10 -right-10 transform rotate-1 opacity-20">
        <div className="flex w-max animate-marquee-reverse space-x-8 text-xs sm:text-sm font-black tracking-widest text-[#F8F9F3] uppercase">
          {[...tickerItems2, ...tickerItems2].map((text, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FE56]" />
            </span>
          ))}
        </div>
      </div>

      {/* Ambient Radial Neon Pulses */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#C6FE56]/12 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-20 left-1/4 w-[380px] h-[380px] rounded-full bg-[#C6FE56]/8 blur-[100px]" />

      {/* Subtle Digital Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#C6FE56 1px, transparent 1px), linear-gradient(90deg, #C6FE56 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
