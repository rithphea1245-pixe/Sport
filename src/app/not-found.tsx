"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Trophy,
  MapPin,
  ArrowLeft,
  Compass,
  Search,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24 font-sans">
      <div className="relative max-w-2xl w-full text-center">
        {/* Ambient Glows */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C6FE56]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-60 h-60 bg-[#16A34A]/15 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Stadium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12150D] text-[#C6FE56] border border-[#2B3520] mb-6 shadow-md animate-bounce">
          <Compass className="w-4 h-4 animate-spin text-[#C6FE56]" />
          <span className="text-xs font-black uppercase tracking-widest">
            404 • Offside! Out of Bounds
          </span>
        </div>

        {/* Giant Number Display */}
        <div className="relative mb-6 select-none">
          <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-[#12150D] dark:text-[#F8F9F3] leading-none drop-shadow-sm">
            4<span className="text-[#C6FE56] inline-block hover:rotate-12 transition-transform">0</span>4
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#12150D]/10 dark:text-white/10 blur-[1px]">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Subtitles & Explanation */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#12150D] dark:text-white tracking-tight mb-3">
          Match Whistle Blown — Page Not Found
        </h2>
        <p className="text-sm sm:text-base text-[#616D54] dark:text-[#A2AF93] max-w-md mx-auto leading-relaxed mb-8">
          The sports article, tournament venue, or tournament pass you are looking for has been moved or doesn’t exist.
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link href="/">
            <Button className="h-12 px-6 rounded-full bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] font-black text-sm shadow-lg shadow-[#C6FE56]/20 transition-all hover:scale-105 cursor-pointer flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>

          <Link href="/#sports">
            <Button
              variant="outline"
              className="h-12 px-6 rounded-full border-[#E2E6D5] dark:border-[#26331B] bg-white dark:bg-[#151B10] hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] text-[#12150D] dark:text-white font-bold text-sm shadow-xs transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-emerald-600 dark:text-[#C6FE56]" />
              Browse Sports
            </Button>
          </Link>

          <Link href="/#events">
            <Button
              variant="outline"
              className="h-12 px-6 rounded-full border-[#E2E6D5] dark:border-[#26331B] bg-white dark:bg-[#151B10] hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] text-[#12150D] dark:text-white font-bold text-sm shadow-xs transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              Explore Arenas
            </Button>
          </Link>
        </div>

        {/* Popular Quick Links Grid */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-[#12150D]/80 backdrop-blur-md border border-[#E2E6D5] dark:border-[#26331B] shadow-sm max-w-lg mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-[#616D54] dark:text-[#8E9B7E] mb-3">
            Quick Shortcuts
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { name: "⚽ Football", href: "/#sports" },
              { name: "🏃 Running", href: "/#sports" },
              { name: "🥊 Boxing", href: "/#sports" },
              { name: "🚴 Cycling", href: "/#sports" },
              { name: "ℹ️ About Platform", href: "/about" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F8F9F3] dark:bg-[#1C2215] hover:bg-[#C6FE56] hover:text-[#12150D] text-[#12150D] dark:text-white border border-[#E2E6D5] dark:border-[#2B3520] transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
