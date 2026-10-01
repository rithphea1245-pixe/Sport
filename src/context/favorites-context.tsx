"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Sport, SportFavorite } from "@/types/sport";
import { getFavorites, addFavorite, deleteFavorite, getSports } from "@/lib/sport-api";

interface FavoritesContextType {
  favorites: SportFavorite[];
  sports: Sport[];
  favoriteUuids: Set<string>;
  favoritesCount: number;
  isFavoritesOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;
  toggleFavorite: (sportUuid: string) => Promise<void>;
  isFavorited: (sportUuid: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<SportFavorite[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load favorites & sports on mount
  const refreshFavorites = async () => {
    try {
      const [favsData, sportsData] = await Promise.allSettled([
        getFavorites(),
        getSports(),
      ]);

      if (favsData.status === "fulfilled") {
        setFavorites(favsData.value);
        localStorage.setItem("sporthub_favorites_cache", JSON.stringify(favsData.value));
      }
      if (sportsData.status === "fulfilled") {
        setSports(sportsData.value);
      }
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  useEffect(() => {
    // Restore from localStorage first for instant UI
    const cached = localStorage.getItem("sporthub_favorites_cache");
    if (cached) {
      try {
        setFavorites(JSON.parse(cached));
      } catch {
        // ignore
      }
    }
    refreshFavorites().then(() => setHasLoaded(true));
  }, []);

  // Compute set of favorited UUIDs
  const favoriteUuids = useMemo(() => {
    const set = new Set<string>();
    favorites.forEach((fav) => {
      if (fav.sportUuid) set.add(fav.sportUuid);
      if (fav.uuid) set.add(fav.uuid);
    });
    return set;
  }, [favorites]);

  const isFavorited = (sportUuid: string) => favoriteUuids.has(sportUuid);

  // Toggle favorite with optimistic UI update and API call
  const toggleFavorite = async (sportUuid: string): Promise<void> => {
    const isCurrentlyFav = favoriteUuids.has(sportUuid);

    if (isCurrentlyFav) {
      // Remove
      const favItem = favorites.find(
        (f) => f.sportUuid === sportUuid || f.uuid === sportUuid
      );
      const nextFavs = favorites.filter(
        (f) => f.sportUuid !== sportUuid && f.uuid !== sportUuid
      );
      setFavorites(nextFavs);
      localStorage.setItem("sporthub_favorites_cache", JSON.stringify(nextFavs));

      if (favItem && favItem.id) {
        try {
          await deleteFavorite(String(favItem.id));
        } catch {
          refreshFavorites();
        }
      }
    } else {
      // Add
      const tempId = `temp-${Date.now()}`;
      const tempFav: SportFavorite = {
        id: tempId,
        sportUuid,
        isDeleted: false,
        isFavorite: true,
      };
      const nextFavs = [tempFav, ...favorites];
      setFavorites(nextFavs);
      localStorage.setItem("sporthub_favorites_cache", JSON.stringify(nextFavs));

      try {
        const created = await addFavorite({ sportUuid });
        setFavorites((prev) =>
          prev.map((f) => (f.id === tempId ? created : f))
        );
      } catch (err) {
        console.error("Failed to add favorite on API:", err);
      }
    }
  };

  const openFavorites = () => setIsFavoritesOpen(true);
  const closeFavorites = () => setIsFavoritesOpen(false);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        sports,
        favoriteUuids,
        favoritesCount: favoriteUuids.size,
        isFavoritesOpen,
        openFavorites,
        closeFavorites,
        toggleFavorite,
        isFavorited,
        refreshFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
