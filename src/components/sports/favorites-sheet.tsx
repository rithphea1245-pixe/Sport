"use client";

import React from "react";
import { SportFavorite, Sport } from "@/types/sport";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, X, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

interface FavoritesSheetProps {
  isOpen?: boolean;
  onClose?: () => void;
  favorites?: SportFavorite[];
  sports?: Sport[];
  onRemoveFavorite?: (sportUuid: string) => Promise<any>;
}

export function FavoritesSheet(props: FavoritesSheetProps) {
  const context = useFavorites();
  const { isKhmer } = useLanguage();

  const isOpen = props.isOpen !== undefined ? props.isOpen : context.isFavoritesOpen;
  const onClose = props.onClose || context.closeFavorites;
  const favorites = props.favorites || context.favorites;
  const sports = props.sports || context.sports;
  const onRemoveFavorite = props.onRemoveFavorite || context.toggleFavorite;

  if (!isOpen) return null;

  // Match sports that are favorited
  const favoriteSports = sports.filter((s) =>
    favorites.some((f) => f.sportUuid === s.uuid || f.uuid === s.uuid)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-white dark:bg-[#12150D] border border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EEF2E4] dark:border-[#222919]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-500">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-[#12150D] dark:text-white flex items-center gap-2">
                <span>{isKhmer ? "កីឡាពេញចិត្តរបស់ខ្ញុំ" : "My Saved Favorites"}</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#C6FE56] text-[#12150D]">
                  {favoriteSports.length}
                </span>
              </h3>
              <p className="text-xs text-[#8E9B7E] font-medium">
                {isKhmer
                  ? `បានរក្សាទុក ${favoriteSports.length} ប្រភេទកីឡាក្នុងបញ្ជីផ្ទាល់ខ្លួន`
                  : `${favoriteSports.length} sports saved to your personal list`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#EEF2E4] dark:bg-[#1C2215] flex items-center justify-center text-[#12150D] dark:text-white hover:bg-[#12150D] hover:text-[#C6FE56] cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto py-5 space-y-3 pr-1">
          {favoriteSports.length === 0 ? (
            <div className="text-center py-14 px-4 bg-[#F8F9F3] dark:bg-[#161C10] rounded-3xl border border-[#E2E6D5] dark:border-[#26331B]">
              <Heart className="w-12 h-12 mx-auto text-[#8E9B7E]/40 mb-3" />
              <p className="font-extrabold text-[#12150D] dark:text-white text-base">
                {isKhmer ? "មិនទាន់មានកីឡាពេញចិត្តនៅឡើយទេ" : "No favorites saved yet"}
              </p>
              <p className="text-xs text-[#616D54] dark:text-[#A2AF93] mt-1.5 max-w-xs mx-auto">
                {isKhmer
                  ? "ចុចលើរូបបេះដូងលើកាតកីឡាណាមួយ ដើម្បីរក្សាទុកក្នុងបញ្ជីពេញចិត្តរបស់អ្នក!"
                  : "Click the heart button on any sport card to save your favorite tournament highlights!"}
              </p>
            </div>
          ) : (
            favoriteSports.map((sport) => (
              <div
                key={sport.uuid}
                className="p-3.5 rounded-2xl bg-[#F8F9F3] dark:bg-[#171E12] border border-[#E2E6D5] dark:border-[#263519] flex items-center gap-3.5 justify-between hover:border-[#C6FE56] transition-all group"
              >
                <div className="flex items-center gap-3.5 overflow-hidden flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-[#12150D]">
                    <img
                      src={
                        sport.imageUrls?.[0] ||
                        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60"
                      }
                      alt={sport.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="overflow-hidden flex-1 min-w-0">
                    <span className="text-[10px] px-2 py-0.5 bg-[#C6FE56] text-[#12150D] font-extrabold rounded-full inline-block mb-1">
                      {sport.category?.name || "Sport"}
                    </span>
                    <h4 className="text-sm font-bold truncate text-[#12150D] dark:text-white">
                      {sport.name}
                    </h4>
                    <p className="text-xs text-[#616D54] dark:text-[#A2AF93] truncate">
                      {sport.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onRemoveFavorite(sport.uuid)}
                    className="text-[#8E9B7E] hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title={isKhmer ? "ដកចេញពីបញ្ជីពេញចិត្ត" : "Remove from favorites"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#EEF2E4] dark:border-[#222919] flex items-center justify-between">
          <span className="text-xs text-[#8E9B7E]">
            {isKhmer ? "ធ្វើសមកាលកម្មដោយស្វ័យប្រវត្តិ" : "Auto-synced with API"}
          </span>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full border-[#E2E6D5] dark:border-[#2B3520] dark:bg-[#1C2215] dark:text-white font-bold text-xs h-9 px-5 cursor-pointer"
          >
            {isKhmer ? "បិទ" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  );
}
