"use client";

import React from "react";
import { Ticket, MapPin, Calendar, ArrowRight, Sparkles, Trophy, Flame, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export function SpringPassBanner() {
  const { t, isKhmer } = useLanguage();

  const passes = [
    {
      id: "pass-1",
      badge: isKhmer ? "ការប្រកួតពានរង្វាន់ជាតិ" : "National League Championship",
      badgeColor: "bg-[#C6FE56] text-[#12150D]",
      title: isKhmer ? "វគ្គផ្តាច់ព្រ័ត្រលីគកំពូលកម្ពុជា ២០២៦" : "Cambodian Premier League Finals 2026",
      date: isKhmer ? "១៤ - ១៥ មេសា · ២០២៦" : "Apr · 14 - 15 · 2026",
      city: isKhmer ? "រាជធានីភ្នំពេញ" : "Phnom Penh",
      venue: isKhmer ? "ពហុកីឡដ្ឋានជាតិមរតកតេជោ" : "Morodok Techo National Stadium",
      type: isKhmer ? "ការប្រកួត ២ ថ្ងៃពេញ" : "2-Day Tournament Pass",
      status: isKhmer ? "បើកឱ្យចូលរួម" : "Official Match Fixture",
      targetAnchor: "#events",
    },
    {
      id: "pass-2",
      badge: isKhmer ? "ខ្សែក្រវាត់ពិភពលោក" : "Kun Khmer World Championship",
      badgeColor: "bg-emerald-400 text-[#12150D]",
      title: isKhmer ? "សង្វៀនគុនខ្មែរជើងឯកពិភពលោក" : "Kun Khmer International Title Bout",
      date: isKhmer ? "០២ - ០៤ ឧសភា · ២០២៦" : "May · 02 - 04 · 2026",
      city: isKhmer ? "រាជធានីភ្នំពេញ" : "Phnom Penh",
      venue: isKhmer ? "ពហុកីឡដ្ឋានជាតិអូឡាំពិក" : "Olympic National Indoor Arena",
      type: isKhmer ? "សំបុត្រ VIP & ជួរមុខ" : "Ringside & General Pass",
      status: isKhmer ? "កាលវិភាគផ្លូវការ" : "Confirmed Schedule",
      targetAnchor: "#events",
    },
    {
      id: "pass-3",
      badge: isKhmer ? "អត្តពលកម្មបេតិកភណ្ឌ" : "Heritage Athletics Circuit",
      badgeColor: "bg-amber-400 text-[#12150D]",
      title: isKhmer ? "ម៉ារ៉ាតុងអន្តរជាតិអង្គរវត្ត ២០២៦" : "Angkor Wat Heritage International Marathon",
      date: isKhmer ? "១៨ - ២០ មិថុនា · ២០២៦" : "Jun · 18 - 20 · 2026",
      city: isKhmer ? "ខេត្តសៀមរាប" : "Siem Reap Heritage",
      venue: isKhmer ? "បរិវេណប្រាសាទអង្គរវត្ត" : "Angkor Historical Circuit",
      type: isKhmer ? "ការចុះឈ្មោះអន្តរជាតិ" : "International Registration",
      status: isKhmer ? "រដូវកាលទី ២៩" : "29th Edition",
      targetAnchor: "#sports",
    },
  ];

  return (
    <section className="mb-14 font-sans">
      {/* Inspired by Spring I/O 2026 header section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#12150D] text-white p-8 sm:p-10 border border-[#26331B] shadow-2xl">
        {/* Glow Effects & Grid Pattern */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6FE56]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#C6FE56]/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#C6FE56 1px, transparent 1px), linear-gradient(90deg, #C6FE56 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#222B19] mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FE56] ring-4 ring-[#C6FE56]/20 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-[#C6FE56]">
              {t("pass.tag", "CAMBODIA 2026 • NATIONAL ATHLETICS SEASON")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#1C2515] border border-[#2B381A] text-[#C6FE56] text-xs font-bold px-3 py-1 rounded-full">
              {t("pass.pillEdition", "2026 Season Edition")}
            </span>
            <span className="bg-[#1C2515] border border-[#2B381A] text-[#A6B494] text-xs font-medium px-3 py-1 rounded-full">
              {t("pass.pillLive", "Live API Synchronized")}
            </span>
          </div>
        </div>

        {/* Big Spring I/O Style Statement */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white mb-3">
            {isKhmer
              ? "កន្លែងដែលអត្តពលិក និងអ្នកគាំទ្រជួបជុំគ្នា"
              : "Where Cambodian Athletes & Fans Connect"}
          </h2>
          <p className="text-sm sm:text-base text-[#C2CEB7] leading-relaxed">
            {t(
              "pass.desc",
              "Experience world-class football, Kun Khmer championship duels, and martial arts live across national arenas."
            )}
          </p>
        </div>

        {/* Three Spring I/O Style Pass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-[#192213] border border-[#2A371B] hover:border-[#C6FE56] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-2xs ${pass.badgeColor}`}
                  >
                    {pass.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8E9D7C]">
                    {pass.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white group-hover:text-[#C6FE56] transition-colors leading-snug mb-3">
                  {pass.title}
                </h3>

                {/* Details Pill Info */}
                <div className="space-y-2 text-xs text-[#A8B799] mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C6FE56] shrink-0" />
                    <span className="font-semibold text-white">{pass.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{pass.venue}, {pass.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5 text-[#C6FE56] shrink-0" />
                    <span>{pass.type}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <a href={pass.targetAnchor} className="w-full mt-2">
                <Button className="w-full bg-[#243019] hover:bg-[#C6FE56] text-[#E0EBD4] hover:text-[#12150D] text-xs font-extrabold rounded-2xl h-10 transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <span>{t("pass.cta", "View Season Schedule")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
