"use client";

import React, { useEffect, useState } from "react";
import { Sport, SportEvent, SportCategory } from "@/types/sport";
import {
  getSports,
  getEvents,
  getSportCategories,
  deleteSport,
  deleteEvent,
} from "@/lib/sport-api";
import {
  Trophy,
  Calendar,
  Layers,
  PlusCircle,
  Trash2,
  Edit3,
  Search,
  Shield,
  Loader2,
  Navigation,
  Activity,
  CheckCircle2,
  Sparkles,
  MapPin,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreateSportModal } from "@/components/sports/create-sport-modal";
import { EditSportModal } from "@/components/sports/edit-sport-modal";
import { EditEventModal } from "@/components/sports/edit-event-modal";
import { useLanguage } from "@/context/language-context";
import { DashboardAnalyticsGraph } from "@/components/dashboard/dashboard-analytics-graph";
import Link from "next/link";

export default function PageDashboard() {
  const { t, isKhmer } = useLanguage();
  const [sports, setSports] = useState<Sport[]>([]);
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [categories, setCategories] = useState<SportCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Tabs: 'sports' | 'events' | 'categories'
  const [activeTab, setActiveTab] = useState<"sports" | "events" | "categories">("sports");

  // Search
  const [sportsSearch, setSportsSearch] = useState("");
  const [eventsSearch, setEventsSearch] = useState("");

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [sportToEdit, setSportToEdit] = useState<Sport | null>(null);
  const [eventToEdit, setEventToEdit] = useState<SportEvent | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, e, c] = await Promise.all([
        getSports(),
        getEvents(),
        getSportCategories(),
      ]);
      setSports(s);
      setEvents(e);
      setCategories(c);
    } catch (err) {
      console.error("Dashboard failed to load:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteSport = async (uuid: string, name: string) => {
    if (!confirm(isKhmer ? `តើអ្នកប្រាកដជាចង់លុបកីឡា "${name}" ឬ?` : `Are you sure you want to delete sport "${name}"?`)) return;
    try {
      await deleteSport(uuid);
      setSports((prev) => prev.filter((s) => s.uuid !== uuid));
    } catch {
      alert("Failed to delete sport");
    }
  };

  const handleDeleteEvent = async (uuid: string, name: string) => {
    if (!confirm(isKhmer ? `តើអ្នកប្រាកដជាចង់លុបទីលាន "${name}" ឬ?` : `Are you sure you want to delete venue "${name}"?`)) return;
    try {
      await deleteEvent(uuid);
      setEvents((prev) => prev.filter((e) => e.uuid !== uuid));
    } catch {
      alert("Failed to delete venue");
    }
  };

  const filteredSports = sports.filter(
    (s) =>
      s.name.toLowerCase().includes(sportsSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(sportsSearch.toLowerCase()) ||
      (s.category?.name && s.category.name.toLowerCase().includes(sportsSearch.toLowerCase()))
  );

  const filteredEvents = events.filter(
    (e) =>
      e.name.toLowerCase().includes(eventsSearch.toLowerCase()) ||
      e.locationName.toLowerCase().includes(eventsSearch.toLowerCase()) ||
      e.description.toLowerCase().includes(eventsSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#12150D] dark:text-[#C6FE56] mb-4" />
        <h3 className="text-xl font-black text-[#12150D] dark:text-white">
          {isKhmer ? "កំពុងទាញយកទិន្នន័យរដ្ឋបាល..." : "Loading Admin Console..."}
        </h3>
        <p className="text-xs text-[#8E9B7E] mt-1">Connecting to live API backend...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Top Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-[2.5rem] bg-[#12150D] text-white shadow-2xl border border-[#222919]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6FE56]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className="bg-[#C6FE56] text-[#12150D] font-black border-0 text-xs px-3 py-1">
                <Shield className="w-3.5 h-3.5 mr-1" />
                {isKhmer ? "ផ្ទាំងគ្រប់គ្រងទិន្នន័យពេញលេញ (CRUD)" : "Full CRUD Operations Console"}
              </Badge>
              <span className="text-xs text-[#8E9B7E] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C6FE56] animate-pulse" />
                REST API v1
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              SportHub <span className="text-[#C6FE56]">{isKhmer ? "ប្រព័ន្ធគ្រប់គ្រងកីឡា" : "Management Console"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#A2AF93] mt-1.5 leading-relaxed">
              {isKhmer
                ? "គ្រប់គ្រងអត្ថបទកីឡាជាតិ ពហុកីឡដ្ឋាន ការប្រកួតពានរង្វាន់ និងចំណាត់ថ្នាក់ប្រភេទកីឡាដោយផ្ទាល់ជាមួយ API។"
                : "Manage live athletics news, arena coordinates, categories, and fan interactions directly with backend database."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] font-black rounded-full px-6 h-12 shadow-lg shadow-[#C6FE56]/20 transition-all hover:scale-105 cursor-pointer text-xs sm:text-sm"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              {isKhmer ? "+ បង្កើតមាតិកាថ្មី" : "+ New Content (POST)"}
            </Button>
          </div>
        </div>
      </div>

      {/* Symmetrical 4-Card Equal KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Sports */}
        <div
          onClick={() => setActiveTab("sports")}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            activeTab === "sports"
              ? "bg-white dark:bg-[#151B10] border-[#C6FE56] ring-2 ring-[#C6FE56]/20 scale-[1.01]"
              : "bg-white dark:bg-[#151B10] border-[#E2E6D5] dark:border-[#26331B] hover:border-[#C6FE56]"
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "កីឡាសរុប" : "Total Sports"}
            </div>
            <div className="text-3xl font-black text-[#12150D] dark:text-white mt-1">
              {sports.length}
            </div>
            <span className="text-[11px] text-emerald-700 dark:text-[#C6FE56] font-bold">
              {isKhmer ? "បានធ្វើសមកាលកម្ម" : "Active & Live"}
            </span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-[#12150D] text-[#C6FE56] flex items-center justify-center font-black shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Venues */}
        <div
          onClick={() => setActiveTab("events")}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            activeTab === "events"
              ? "bg-white dark:bg-[#151B10] border-[#C6FE56] ring-2 ring-[#C6FE56]/20 scale-[1.01]"
              : "bg-white dark:bg-[#151B10] border-[#E2E6D5] dark:border-[#26331B] hover:border-[#C6FE56]"
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "ពហុកីឡដ្ឋាន" : "Venues & Arenas"}
            </div>
            <div className="text-3xl font-black text-[#12150D] dark:text-white mt-1">
              {events.length}
            </div>
            <span className="text-[11px] text-[#8E9B7E] font-medium">
              GPS Verified
            </span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Disciplines */}
        <div
          onClick={() => setActiveTab("categories")}
          className={`p-6 rounded-[2rem] border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            activeTab === "categories"
              ? "bg-white dark:bg-[#151B10] border-[#C6FE56] ring-2 ring-[#C6FE56]/20 scale-[1.01]"
              : "bg-white dark:bg-[#151B10] border-[#E2E6D5] dark:border-[#26331B] hover:border-[#C6FE56]"
          }`}
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "ប្រភេទកីឡា" : "Disciplines"}
            </div>
            <div className="text-3xl font-black text-[#12150D] dark:text-white mt-1">
              {categories.length}
            </div>
            <span className="text-[11px] text-[#8E9B7E] font-medium">
              Federation Hubs
            </span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-[#1C2215] text-[#C6FE56] flex items-center justify-center font-black shrink-0 border border-[#2B3520]">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: API Status */}
        <div className="p-6 rounded-[2rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "ស្ថានភាពប្រព័ន្ធ" : "API Connectivity"}
            </div>
            <div className="text-3xl font-black text-emerald-700 dark:text-[#C6FE56] mt-1">
              100%
            </div>
            <span className="text-[11px] text-[#8E9B7E] font-medium flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#C6FE56]" />
              Response &lt; 90ms
            </span>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-[#1C2515] text-emerald-700 dark:text-[#C6FE56] flex items-center justify-center font-black shrink-0 border border-emerald-200 dark:border-[#2C3B1D]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Interactive Analytics & Activity Graphs */}
      <DashboardAnalyticsGraph />

      {/* Symmetrical Section Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs max-w-xl">
        <button
          onClick={() => setActiveTab("sports")}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-xs font-black transition-all cursor-pointer text-center ${
            activeTab === "sports"
              ? "bg-[#12150D] text-[#C6FE56] shadow-sm"
              : "text-[#616D54] dark:text-[#8E9B7E] hover:text-[#12150D] dark:hover:text-white"
          }`}
        >
          {isKhmer ? "⚽ អត្ថបទកីឡា" : "⚽ Sports Records"} ({sports.length})
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-xs font-black transition-all cursor-pointer text-center ${
            activeTab === "events"
              ? "bg-[#12150D] text-[#C6FE56] shadow-sm"
              : "text-[#616D54] dark:text-[#8E9B7E] hover:text-[#12150D] dark:hover:text-white"
          }`}
        >
          {isKhmer ? "🏟️ ពហុកីឡដ្ឋាន" : "🏟️ Arenas & Venues"} ({events.length})
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-xs font-black transition-all cursor-pointer text-center ${
            activeTab === "categories"
              ? "bg-[#12150D] text-[#C6FE56] shadow-sm"
              : "text-[#616D54] dark:text-[#8E9B7E] hover:text-[#12150D] dark:hover:text-white"
          }`}
        >
          {isKhmer ? "🏅 ប្រភេទកីឡា" : "🏅 Disciplines"} ({categories.length})
        </button>
      </div>

      {/* TAB 1: Sports Table */}
      {activeTab === "sports" && (
        <div id="sports-table" className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#12150D] dark:text-white">
                {isKhmer ? "បញ្ជីអត្ថបទកីឡា" : "Sports Articles & Highlights"} ({filteredSports.length})
              </h2>
              <p className="text-xs text-[#616D54] dark:text-[#8E9B7E]">
                {isKhmer ? "កែប្រែព័ត៌មាន (PATCH) ឬលុបទិន្នន័យ (DELETE)" : "Edit articles with PATCH or remove records with DELETE"}
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
              <Input
                value={sportsSearch}
                onChange={(e) => setSportsSearch(e.target.value)}
                placeholder={isKhmer ? "ស្វែងរកអត្ថបទកីឡា..." : "Search sport records..."}
                className="pl-10 rounded-full border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-xs h-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EEF2E4] dark:border-[#222919] text-[#616D54] dark:text-[#8E9B7E] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Item / Image</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Created</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2E4] dark:divide-[#222919]">
                {filteredSports.map((sport) => (
                  <tr key={sport.uuid} className="hover:bg-[#F8F9F3]/60 dark:hover:bg-[#1C2215]/50 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#12150D] shrink-0 border border-[#E2E6D5] dark:border-[#26331B]">
                          <img
                            src={
                              sport.imageUrls?.[0] ||
                              "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60"
                            }
                            alt={sport.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-md">
                          <div className="font-bold text-[#12150D] dark:text-white line-clamp-1">
                            {sport.name}
                          </div>
                          <div className="text-xs text-[#8E9B7E] line-clamp-1">
                            {sport.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="bg-[#C6FE56] text-[#12150D] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                        {sport.category?.name || "Football"}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#616D54] dark:text-[#8E9B7E] text-xs">
                      {sport.createdAt
                        ? new Date(sport.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSportToEdit(sport)}
                          className="h-8 px-2.5 rounded-lg hover:bg-[#EEF2E4] dark:hover:bg-[#252E1B] text-[#12150D] dark:text-white font-bold text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" />
                          {isKhmer ? "កែប្រែ" : "Edit"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteSport(sport.uuid, sport.name)}
                          className="h-8 px-2.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 font-bold text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Venues Table */}
      {activeTab === "events" && (
        <div id="events-table" className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#12150D] dark:text-white">
                {isKhmer ? "បញ្ជីពហុកីឡដ្ឋាន និងទីលាន" : "Arenas & Venues Management"} ({filteredEvents.length})
              </h2>
              <p className="text-xs text-[#616D54] dark:text-[#8E9B7E]">
                {isKhmer ? "គ្រប់គ្រងកូអរដោនេ GPS ទីតាំង និងព័ត៌មានលម្អិត" : "Manage stadiums, coordinates, and Google Maps pins"}
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
              <Input
                value={eventsSearch}
                onChange={(e) => setEventsSearch(e.target.value)}
                placeholder={isKhmer ? "ស្វែងរកពហុកីឡដ្ឋាន..." : "Search stadiums, locations..."}
                className="pl-10 rounded-full border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-xs h-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EEF2E4] dark:border-[#222919] text-[#616D54] dark:text-[#8E9B7E] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Stadium / Arena</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">GPS Coordinates</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2E4] dark:divide-[#222919]">
                {filteredEvents.map((ev) => (
                  <tr key={ev.uuid} className="hover:bg-[#F8F9F3]/60 dark:hover:bg-[#1C2215]/50 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#12150D] shrink-0 border border-[#E2E6D5] dark:border-[#26331B]">
                          <img
                            src={
                              ev.imageUrls?.[0] ||
                              "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=60"
                            }
                            alt={ev.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-md">
                          <div className="font-bold text-[#12150D] dark:text-white line-clamp-1">
                            {ev.name}
                          </div>
                          <div className="text-xs text-[#8E9B7E] line-clamp-1">
                            {ev.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#12150D] dark:text-white">
                      {ev.locationName}
                    </td>
                    <td className="py-3.5 px-3 text-[#616D54] dark:text-[#8E9B7E] text-xs">
                      <a
                        href={`https://www.google.com/maps?q=${ev.latitude},${ev.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-emerald-700 dark:text-[#C6FE56] hover:underline"
                      >
                        <Navigation className="w-3 h-3" />
                        {Number(ev.latitude).toFixed(3)}, {Number(ev.longitude).toFixed(3)}
                      </a>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEventToEdit(ev)}
                          className="h-8 px-2.5 rounded-lg hover:bg-[#EEF2E4] dark:hover:bg-[#252E1B] text-[#12150D] dark:text-white font-bold text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" />
                          {isKhmer ? "កែប្រែ" : "Edit"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteEvent(ev.uuid, ev.name)}
                          className="h-8 px-2.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 font-bold text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Disciplines & Categories */}
      {activeTab === "categories" && (
        <div id="categories-section" className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#12150D] dark:text-white">
                {isKhmer ? "ចំណាត់ថ្នាក់ប្រភេទកីឡា" : "Sport Disciplines & Federations"} ({categories.length})
              </h2>
              <p className="text-xs text-[#616D54] dark:text-[#8E9B7E]">
                {isKhmer ? "ប្រភេទកីឡាដែលគាំទ្រដោយសហព័ន្ធកីឡាជាតិកម្ពុជា" : "Registered discipline categories in backend database"}
              </p>
            </div>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] font-bold text-xs rounded-full px-4 h-9 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
              {isKhmer ? "+ បន្ថែមប្រភេទកីឡា" : "+ Add Discipline"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={cat.uuid || cat.id || idx}
                className="p-5 rounded-2xl bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] flex items-center justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-sm text-[#12150D] dark:text-white">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-[#8E9B7E] mt-0.5">
                    {cat.description || "Official Discipline Category"}
                  </p>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateSportModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        categories={categories}
        onSportCreated={loadData}
        onEventCreated={loadData}
        onCategoryCreated={loadData}
      />

      <EditSportModal
        sport={sportToEdit}
        isOpen={Boolean(sportToEdit)}
        onClose={() => setSportToEdit(null)}
        categories={categories}
        onSportUpdated={loadData}
      />

      <EditEventModal
        event={eventToEdit}
        isOpen={Boolean(eventToEdit)}
        onClose={() => setEventToEdit(null)}
        onEventUpdated={loadData}
      />
    </div>
  );
}
