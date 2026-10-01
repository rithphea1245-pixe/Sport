"use client";

import React, { useState } from "react";
import { Trophy, Calendar, Flame, PlusCircle, Heart, Shield, LogIn, Sparkles, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/context/role-context";
import { useLanguage } from "@/context/language-context";
import { Hero3DCanvas } from "@/components/sports/hero-3d-canvas";
import { HeroTextBackground } from "@/components/sports/hero-text-background";
import { HeroFloating3DCard } from "@/components/sports/hero-floating-3d-card";
import { HeroAnimeTitle } from "@/components/sports/hero-anime-title";
import { HeroAnimeCounter } from "@/components/sports/hero-anime-counter";

interface HeroSectionProps {
  sportsCount: number;
  eventsCount: number;
  categoriesCount: number;
  favoritesCount: number;
  onOpenCreate: () => void;
  onOpenFavorites: () => void;
}

export function HeroSection({
  sportsCount,
  eventsCount,
  categoriesCount,
  favoritesCount,
  onOpenCreate,
  onOpenFavorites,
}: HeroSectionProps) {
  const { isAdmin, isLoggedIn, user, openAuthModal } = useRole();
  const { t, isKhmer } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleContainerMouseMove}
      className="relative overflow-hidden rounded-[2.5rem] bg-[#12150D] text-[#F8F9F3] p-6 sm:p-10 lg:p-14 mb-12 shadow-2xl border border-[#222919] font-sans group"
    >
      {/* Dynamic Animated Kinetic Text & Marquee Background */}
      <HeroTextBackground />

      {/* Dynamic Cursor Spotlight Following User Mouse */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(198, 254, 86, 0.12), transparent 75%)`,
        }}
      />

      {/* Main Grid: Left Column Text & Actions, Right Column Interactive 3D Canvas */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column (Content & Stats) */}
        <div className="lg:col-span-7">
          {/* Role Status Tag */}
          <div className="inline-flex items-center gap-2 mb-4 flex-wrap">
            {isAdmin ? (
              <a href="/dashboard">
                <Badge className="bg-[#C6FE56] text-[#12150D] hover:bg-[#A5DE32] border-0 px-4 py-1.5 text-xs uppercase tracking-wider font-extrabold rounded-full shadow-md shadow-[#C6FE56]/20 cursor-pointer hover:scale-105 transition-transform flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  {t("hero.adminBadge", "Admin Mode • Full CRUD Controls")} → Dashboard
                </Badge>
              </a>
            ) : (
              <Badge className="bg-[#1C2215] text-[#C6FE56] border border-[#2B3520] px-4 py-1.5 text-xs uppercase tracking-wider font-bold rounded-full shadow-sm">
                <Flame className="w-3.5 h-3.5 mr-1 text-[#C6FE56] animate-pulse" />
                {isLoggedIn ? `${isKhmer ? "សូមស្វាគមន៍" : "Welcome"}, ${user?.username}` : t("hero.badge", "Official Sports Arena & Fan Hub")}
              </Badge>
            )}
            <span className="text-xs text-[#8E9B7E] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C6FE56] animate-ping" />
              {t("hero.sync", "Live API Synchronized")}
            </span>
          </div>

          {/* Anime.js Staggered & Morphing Title */}
          <HeroAnimeTitle />

          <p className="text-base sm:text-lg text-[#C8D1BE] mb-8 leading-relaxed font-normal max-w-2xl">
            {isAdmin
              ? t("hero.adminDesc", "Welcome to the Admin Portal. You have permission to create, edit, delete sports records, manage tournament stadiums, and moderate fan match discussions.")
              : t("hero.desc", "Explore national athletics news, breaking tournament stories, match arenas, and engage in fan discussions. Save your favorite teams and matches with one click.")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a href="#sports">
              <Button className="bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] text-[15px] sm:text-[16px] font-black rounded-full px-6 h-12 shadow-lg shadow-[#C6FE56]/20 transition-all hover:scale-[1.02] cursor-pointer">
                <Trophy className="w-4 h-4 mr-2" />
                {t("hero.browseSports", "Browse Sports")}
              </Button>
            </a>

            <a href="#events">
              <Button
                variant="outline"
                className="border-[#2B3520] bg-[#1C2215] hover:bg-[#252E1B] text-[#F8F9F3] text-[15px] sm:text-[16px] font-bold rounded-full px-6 h-12 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 mr-2 text-[#C6FE56]" />
                {t("hero.venues", "Venues & Arenas")}
              </Button>
            </a>

            {/* User Favorites CTA */}
            <Button
              onClick={onOpenFavorites}
              variant="outline"
              className="border-[#2B3520] bg-[#1C2215] hover:bg-[#252E1B] text-[#F8F9F3] text-[15px] sm:text-[16px] font-bold rounded-full px-5 h-12 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Heart className="w-4 h-4 mr-2 text-rose-500 fill-rose-500" />
              {t("hero.favorites", "Favorites")} ({favoritesCount})
            </Button>

            {/* If NOT Logged in: Quick Sign In Button */}
            {!isLoggedIn && (
              <Button
                onClick={() => openAuthModal("login")}
                className="bg-white dark:bg-[#1E2716] hover:bg-[#EEF2E4] dark:hover:bg-[#28351D] text-[#12150D] dark:text-[#C6FE56] border border-[#E2E6D5] dark:border-[#2C3B1D] text-[15px] sm:text-[16px] font-black rounded-full px-6 h-12 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <LogIn className="w-4 h-4 mr-2 text-emerald-700 dark:text-[#C6FE56]" />
                {t("hero.signIn", "Sign In")}
              </Button>
            )}

            {/* Admin Controls */}
            {isAdmin && (
              <>
                <Button
                  onClick={onOpenCreate}
                  className="bg-white dark:bg-[#1E2716] hover:bg-[#EEF2E4] dark:hover:bg-[#28351D] text-[#12150D] dark:text-[#C6FE56] border border-[#E2E6D5] dark:border-[#2C3B1D] text-[15px] sm:text-[16px] font-black rounded-full px-6 h-12 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 mr-2 text-emerald-600 dark:text-[#C6FE56]" />
                  {t("hero.createContent", "+ Create Content")}
                </Button>

                <a href="/dashboard">
                  <Button
                    className="bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] text-[15px] sm:text-[16px] font-black rounded-full px-6 h-12 shadow-md shadow-[#C6FE56]/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </a>
              </>
            )}
          </div>

          {/* Anime.js Interpolated Live Counters */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 pt-6 border-t border-[#222919] max-w-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                <HeroAnimeCounter value={sportsCount} />
              </div>
              <div className="text-xs sm:text-sm text-[#8E9B7E] font-medium">{t("hero.stats.sports", "Sports & Items")}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#C6FE56]">
                <HeroAnimeCounter value={eventsCount} />
              </div>
              <div className="text-xs sm:text-sm text-[#8E9B7E] font-medium">{t("hero.stats.events", "Stadiums")}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                <HeroAnimeCounter value={categoriesCount} />
              </div>
              <div className="text-xs sm:text-sm text-[#8E9B7E] font-medium">{t("hero.stats.categories", "Disciplines")}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-rose-400">
                <HeroAnimeCounter value={favoritesCount} />
              </div>
              <div className="text-xs sm:text-sm text-[#8E9B7E] font-medium">{t("hero.stats.favorites", "Favorites")}</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Sports Hologram & 3D Tilt HUD Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
          {/* Subtle 3D Depth Rings */}
          <div className="absolute inset-0 rounded-full border border-[#C6FE56]/15 scale-95 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-[#C6FE56]/10 scale-110 pointer-events-none animate-pulse" />

          {/* 3D Holographic Canvas */}
          <div className="w-full relative z-10">
            <Hero3DCanvas />
          </div>

          {/* 3D Floating Interactive HUD Cards with Tilt Physics */}
          <HeroFloating3DCard />
        </div>
      </div>
    </div>
  );
}
