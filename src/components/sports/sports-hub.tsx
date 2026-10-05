"use client";

import React, { useEffect, useState } from "react";
import { Sport, SportCategory, SportEvent, SportFavorite } from "@/types/sport";
import {
  getSports,
  getSportCategories,
  getEvents,
  getFavorites,
  addFavorite,
  deleteFavorite,
  deleteSport,
  deleteEvent,
} from "@/lib/sport-api";
import { HeroSection } from "@/components/sports/hero-section";
import { SpringPassBanner } from "@/components/sports/spring-pass-banner";
import { CategoryTabs } from "@/components/sports/category-tabs";
import { SportsGrid } from "@/components/sports/sports-grid";
import { EventsGrid } from "@/components/sports/events-grid";
import { CreateSportModal } from "@/components/sports/create-sport-modal";
import { EditSportModal } from "@/components/sports/edit-sport-modal";
import { EditEventModal } from "@/components/sports/edit-event-modal";
import { Loader2, RefreshCw, Shield, Sparkles, UserCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/context/role-context";
import { useFavorites } from "@/context/favorites-context";
import Link from "next/link";

export function SportsHub() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [categories, setCategories] = useState<SportCategory[]>([]);
  const [events, setEvents] = useState<SportEvent[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [sportToEdit, setSportToEdit] = useState<Sport | null>(null);
  const [eventToEdit, setEventToEdit] = useState<SportEvent | null>(null);

  const { isAdmin, role, setRole, user } = useRole();
  const {
    favorites,
    favoriteUuids,
    favoritesCount,
    openFavorites,
    toggleFavorite,
    refreshFavorites,
  } = useFavorites();

  const loadAllData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [sportsData, catData, eventsData] = await Promise.allSettled([
        getSports(),
        getSportCategories(),
        getEvents(),
      ]);

      if (sportsData.status === "fulfilled") setSports(sportsData.value);
      if (catData.status === "fulfilled") setCategories(catData.value);
      if (eventsData.status === "fulfilled") setEvents(eventsData.value);
      refreshFavorites();
    } catch (err) {
      console.error("Failed to load sports data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Delete Sport (Admin)
  const handleDeleteSport = async (uuid: string) => {
    try {
      await deleteSport(uuid);
      setSports((prev) => prev.filter((s) => s.uuid !== uuid));
    } catch {
      alert("Failed to delete sport item from API");
    }
  };

  // Delete Event (Admin)
  const handleDeleteEvent = async (uuid: string) => {
    try {
      await deleteEvent(uuid);
      setEvents((prev) => prev.filter((e) => e.uuid !== uuid));
    } catch {
      alert("Failed to delete event from API");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-24">
        <div className="w-14 h-14 rounded-2xl bg-[#C6FE56] flex items-center justify-center text-[#12150D] shadow-lg shadow-[#C6FE56]/20 mb-4 animate-bounce">
          <Loader2 className="w-7 h-7 animate-spin" />
        </div>
        <h3 className="text-xl font-black text-[#12150D] dark:text-[#F8F9F3]">Connecting to SportHub API...</h3>
        <p className="text-sm text-[#616D54] dark:text-[#CBD5BE] mt-1">
          Loading live sports, categories, stadiums, and community updates
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Admin Quick Action Bar (ONLY visible if logged-in Admin) */}
      {isAdmin && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 sm:px-6 mb-6 rounded-2xl sm:rounded-full bg-[#12150D] text-white border border-[#2B3520] shadow-md font-sans">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FE56] ring-4 ring-[#C6FE56]/20 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white">
              Administrator: <span className="text-[#C6FE56]">{user?.username}</span> • CRUD Controls Active
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/dashboard">
              <Button
                size="sm"
                className="rounded-full h-8 px-3.5 text-xs font-bold bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Dashboard
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadAllData(true)}
              disabled={refreshing}
              className="rounded-full h-7 px-3 text-xs font-bold text-white hover:bg-[#1C2215] hover:text-[#C6FE56]"
            >
              <RefreshCw
                className={`w-3 h-3 mr-1.5 ${refreshing ? "animate-spin" : ""}`}
              />
              Sync API
            </Button>
            <Button
              size="sm"
              onClick={() => setRole("user")}
              className="rounded-full h-7 px-3 text-xs font-bold bg-[#1C2215] hover:bg-[#252E1B] text-[#CBD5BE]"
            >
              View as Fan
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection
        sportsCount={sports.length}
        eventsCount={events.length}
        categoriesCount={categories.length}
        favoritesCount={favoritesCount}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenFavorites={openFavorites}
      />

      {/* Spring I/O Inspired Season Tournament Passes */}
      <SpringPassBanner />

      {/* Category Pills Filter */}
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Sports Grid */}
      <SportsGrid
        sports={sports}
        favoriteUuids={favoriteUuids}
        onToggleFavorite={toggleFavorite}
        onEditSport={(sport) => setSportToEdit(sport)}
        onDeleteSport={handleDeleteSport}
        selectedCategory={selectedCategory}
      />

      {/* Arenas & Events Grid with Comments */}
      <EventsGrid
        events={events}
        selectedCategory={selectedCategory}
        onEditEvent={(event) => setEventToEdit(event)}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* Create Sport / Event / Category Modal */}
      <CreateSportModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        categories={categories}
        onSportCreated={() => loadAllData(true)}
        onEventCreated={() => loadAllData(true)}
        onCategoryCreated={() => loadAllData(true)}
      />

      {/* Edit Sport Modal (Admin) */}
      <EditSportModal
        sport={sportToEdit}
        isOpen={Boolean(sportToEdit)}
        onClose={() => setSportToEdit(null)}
        categories={categories}
        onSportUpdated={() => loadAllData(true)}
      />

      {/* Edit Event Modal (Admin) */}
      <EditEventModal
        event={eventToEdit}
        isOpen={Boolean(eventToEdit)}
        onClose={() => setEventToEdit(null)}
        categories={categories}
        onEventUpdated={() => loadAllData(true)}
      />
    </div>
  );
}
