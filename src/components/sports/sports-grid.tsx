"use client";

import React, { useState } from "react";
import { Sport } from "@/types/sport";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Search,
  Calendar,
  ChevronRight,
  X,
  Trash2,
  Edit3,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRole } from "@/context/role-context";
import { useLanguage } from "@/context/language-context";

interface SportsGridProps {
  sports: Sport[];
  favoriteUuids: Set<string>;
  onToggleFavorite: (sportUuid: string) => Promise<void>;
  onEditSport?: (sport: Sport) => void;
  onDeleteSport?: (uuid: string) => Promise<void>;
  selectedCategory: string;
}

export function SportsGrid({
  sports,
  favoriteUuids,
  onToggleFavorite,
  onEditSport,
  onDeleteSport,
  selectedCategory,
}: SportsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSportModal, setActiveSportModal] = useState<Sport | null>(null);
  const [togglingMap, setTogglingMap] = useState<Record<string, boolean>>({});
  const { isAdmin } = useRole();
  const { t, isKhmer } = useLanguage();

  // Filter sports by category and search query
  const filteredSports = sports.filter((sport) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      sport.category?.name?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      sport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sport.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleFavoriteClick = async (sportUuid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTogglingMap((prev) => ({ ...prev, [sportUuid]: true }));
    try {
      await onToggleFavorite(sportUuid);
    } finally {
      setTogglingMap((prev) => ({ ...prev, [sportUuid]: false }));
    }
  };

  const getCleanImageUrl = (sport: Sport) => {
    if (sport.imageUrls && sport.imageUrls.length > 0 && sport.imageUrls[0]) {
      return sport.imageUrls[0];
    }
    return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60";
  };

  // Find other sports to allow clicking between cards
  const relatedSports = activeSportModal
    ? sports.filter((s) => s.uuid !== activeSportModal.uuid).slice(0, 6)
    : [];

  return (
    <section id="sports" className="mb-20 font-sans">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FE56] ring-4 ring-[#C6FE56]/20" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#616D54]">
              {t("sports.tag", "National Catalog")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#12150D]">
            {t("sports.title", "Sports & Highlights")}
          </h2>
          <p className="text-xs sm:text-sm text-[#616D54] mt-0.5">
            {t("sports.subtitle", "Click any card to read full details, story, and explore related sports")}
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("sports.searchPlaceholder", "Search sports or athletes...")}
            className="pl-10 pr-10 rounded-full bg-white dark:bg-[#151B10] border-[#E2E6D5] dark:border-[#26331B] text-xs h-10 shadow-xs focus:ring-[#C6FE56] text-[#12150D] dark:text-[#F8F9F3]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#616D54] dark:text-[#A2AF93] hover:text-[#12150D] dark:hover:text-[#C6FE56] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of Sports */}
      {filteredSports.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-[#E2E6D5] dark:border-[#26331B] bg-white dark:bg-[#151B10]">
          <p className="text-[#616D54] dark:text-[#A2AF93] text-sm font-semibold">
            {t("sports.noFound", "No sports found matching your search.")}
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-full border-[#E2E6D5] dark:border-[#26331B] dark:text-[#F8F9F3] dark:hover:bg-[#1E2816]"
            onClick={() => setSearchQuery("")}
          >
            {t("sports.resetFilters", "Reset Filters")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSports.map((sport) => {
            const isFav = favoriteUuids.has(sport.uuid);
            const isToggling = togglingMap[sport.uuid];
            const imageUrl = getCleanImageUrl(sport);

            return (
              <Card
                key={sport.uuid || sport.id}
                onClick={() => setActiveSportModal(sport)}
                className="group overflow-hidden rounded-[2rem] border border-[#E2E6D5] dark:border-[#26331B] hover:border-[#12150D] dark:hover:border-[#C6FE56] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer bg-white dark:bg-[#151B10]"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full h-52 overflow-hidden bg-[#12150D]">
                    <img
                      src={imageUrl}
                      alt={sport.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60";
                      }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#C6FE56] text-[#12150D] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                        {sport.category?.name || "Sport"}
                      </span>
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => handleFavoriteClick(sport.uuid, e)}
                      disabled={isToggling}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                        isFav
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105"
                          : "bg-black/50 text-white hover:bg-black/80 hover:text-rose-400"
                      }`}
                      title={isFav ? "Remove favorite" : "Add to favorites"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          isFav ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Content */}
                  <CardHeader className="p-5 pb-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8E9B7E] mb-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {sport.createdAt
                          ? new Date(sport.createdAt).toLocaleDateString(isKhmer ? "km-KH" : "en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recent update"}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg leading-snug line-clamp-2 text-[#12150D] dark:text-[#F8F9F3] group-hover:text-emerald-700 dark:group-hover:text-[#C6FE56] transition-colors">
                      {sport.name}
                    </h3>
                  </CardHeader>

                  <CardContent className="p-5 pt-0">
                    <p className="text-xs sm:text-sm text-[#616D54] dark:text-[#CBD5BE] line-clamp-3 leading-relaxed font-normal">
                      {sport.description}
                    </p>
                  </CardContent>
                </div>

                <CardFooter className="p-5 pt-0 border-t border-[#EEF2E4] dark:border-[#212C18] mt-2 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#12150D] dark:text-[#F8F9F3] flex items-center group-hover:translate-x-1 transition-transform">
                    {t("sports.viewDetails", "View Details")}
                    <ChevronRight className="w-3.5 h-3.5 ml-1 text-[#616D54] dark:text-[#CBD5BE]" />
                  </span>

                  {/* Admin Controls: ONLY visible if Admin */}
                  {isAdmin && (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {onEditSport && (
                        <button
                          onClick={() => onEditSport(sport)}
                          className="w-7 h-7 rounded-full bg-[#EEF2E4] dark:bg-[#1E2816] hover:bg-[#C6FE56] dark:hover:bg-[#C6FE56] text-[#12150D] dark:text-[#F8F9F3] hover:text-[#12150D] dark:hover:text-[#12150D] flex items-center justify-center transition-all cursor-pointer"
                          title="Admin: Edit Sport"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      )}
                      {onDeleteSport && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${sport.name}"?`)) {
                              onDeleteSport(sport.uuid);
                            }
                          }}
                          className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 flex items-center justify-center transition-all cursor-pointer"
                          title="Admin: Delete Sport"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Rich Sport Detail Reader Modal with Related Cards Switching */}
      {activeSportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] rounded-[2.5rem] p-6 sm:p-9 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveSportModal(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EEF2E4] dark:bg-[#1E2816] flex items-center justify-center text-[#12150D] dark:text-[#F8F9F3] hover:bg-[#12150D] hover:text-[#C6FE56] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-5 pr-10">
              <span className="bg-[#C6FE56] text-[#12150D] text-xs font-black px-3.5 py-1 rounded-full inline-block mb-2">
                {activeSportModal.category?.name || "General"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#12150D] dark:text-[#F8F9F3] leading-tight">
                {activeSportModal.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#8E9B7E] dark:text-[#A2AF93] mt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeSportModal.createdAt
                    ? new Date(activeSportModal.createdAt).toLocaleDateString(isKhmer ? "km-KH" : "en-US")
                    : ""}
                </span>
                <span>•</span>
                <span className="font-mono text-[11px] truncate max-w-xs">
                  ID: {activeSportModal.uuid}
                </span>
              </div>
            </div>

            {/* Photo */}
            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-[#12150D] shadow-md">
              <img
                src={getCleanImageUrl(activeSportModal)}
                alt={activeSportModal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60";
                }}
              />
            </div>

            {/* Full Story */}
            <div className="space-y-4 text-[#12150D]/90 dark:text-[#F8F9F3]/90 leading-relaxed text-sm sm:text-base font-normal">
              <p>{activeSportModal.description}</p>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-5 border-t border-[#EEF2E4] dark:border-[#212C18] flex flex-wrap items-center justify-between gap-3">
              <Button
                variant={favoriteUuids.has(activeSportModal.uuid) ? "destructive" : "default"}
                onClick={() => onToggleFavorite(activeSportModal.uuid)}
                className={`rounded-full px-5 font-bold h-10 text-xs sm:text-sm ${
                  favoriteUuids.has(activeSportModal.uuid)
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D]"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    favoriteUuids.has(activeSportModal.uuid) ? "fill-current" : ""
                  }`}
                />
                {favoriteUuids.has(activeSportModal.uuid)
                  ? t("sports.savedToFav", "Saved to Favorites")
                  : t("sports.addToFav", "Add to Favorites")}
              </Button>

              <Button
                variant="outline"
                onClick={() => setActiveSportModal(null)}
                className="rounded-full border-[#E2E6D5] dark:border-[#26331B] dark:text-[#F8F9F3] dark:hover:bg-[#1E2816] h-10 text-xs font-bold"
              >
                {t("sports.close", "Close")}
              </Button>
            </div>

            {/* "Click Cards Each Other" - Related Cards Switcher */}
            {relatedSports.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#EEF2E4]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#616D54]">
                    {t("sports.related", "Explore Other Sports Cards")}
                  </h4>
                  <span className="text-[11px] text-[#8E9B7E] font-medium">
                    {t("sports.clickSwitch", "Click to switch card")}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {relatedSports.map((rel) => (
                    <div
                      key={rel.uuid}
                      onClick={() => setActiveSportModal(rel)}
                      className="group/rel p-2 rounded-2xl border border-[#E2E6D5] bg-[#F8F9F3] hover:border-[#12150D] cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <div className="w-full h-20 rounded-xl overflow-hidden bg-[#12150D] mb-2">
                        <img
                          src={getCleanImageUrl(rel)}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 block truncate">
                        {rel.category?.name || "Sport"}
                      </span>
                      <p className="text-xs font-bold text-[#12150D] line-clamp-1">
                        {rel.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
