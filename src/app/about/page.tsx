"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Zap,
  Target,
  Users,
  Compass,
  Heart,
  Shield,
  MapPin,
  ArrowRight,
  Flame,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useRole } from "@/context/role-context";
import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { openAuthModal, isLoggedIn } = useRole();
  const { t, isKhmer } = useLanguage();

  const values = [
    {
      icon: Trophy,
      title: isKhmer ? "លើកកម្ពស់អត្តពលិកជាតិ" : "Championing National Athletes",
      description: isKhmer
        ? "ផ្តល់នូវការផ្សព្វផ្សាយ និងការគាំទ្រយ៉ាងទូលំទូលាយដល់អត្តពលិកកម្ពុជាគ្រប់វិញ្ញាសា រួមមានបាល់ទាត់ គុនខ្មែរ ប្រណាំងកង់ ហែលទឹក និងក្បាច់គុនបុរាណ។"
        : "Providing digital visibility and spotlight to Cambodian athletes across football, boxing, cycling, swimming, and regional federations.",
    },
    {
      icon: MapPin,
      title: isKhmer ? "តភ្ជាប់ពហុកីឡដ្ឋាន និងទីលាន" : "Connecting Venues & Stadiums",
      description: isKhmer
        ? "តភ្ជាប់អ្នកគាំទ្រ និងអត្តពលិកជាមួយនឹងកូអរដោនេ GPS ជាក់លាក់ទៅកាន់គ្រប់ពហុកីឡដ្ឋានជាតិ និងទីលានប្រកួតនៅរាជធានីភ្នំពេញ ខេត្តសៀមរាប និងបណ្តាខេត្តនានា។"
        : "Bridging athletes and fans with direct GPS coordinates and directions to community grounds and national arenas in Phnom Penh, Siem Reap, and provinces.",
    },
    {
      icon: Users,
      title: isKhmer ? "សហគមន៍អ្នកគាំទ្រសកម្ម" : "Interactive Fan Community",
      description: isKhmer
        ? "ផ្តល់ឱកាសឱ្យអ្នកស្នេហាកីឡាបញ្ចេញមតិយោបល់ ពិភាក្សាការប្រកួត និងកត់ត្រាទុកនូវកីឡា និងទីលានដែលខ្លួនពេញចិត្ត។"
        : "Giving sports enthusiasts a shared voice through match discussion, event reviews, and personal favorite bookmarking.",
    },
    {
      icon: Zap,
      title: isKhmer ? "បច្ចេកវិទ្យាឌីជីថលទំនើប" : "Real-Time Digital Tech",
      description: isKhmer
        ? "បង្កើតឡើងដោយ Next.js 16 និងប្រព័ន្ធ REST API ដែលមានស្ថិរភាពខ្ពស់ ផ្តល់នូវការទាញយកទិន្នន័យបានរហ័ស និងបទពិសោធន៍រលូននៅលើគ្រប់ទូរស័ព្ទ។"
        : "Built with modern Next.js 16 and a resilient REST API to deliver instant match updates, fast search, and mobile-first performance.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: isKhmer ? "ព្រឹត្តិការណ៍ស៊ីហ្គេមលើកទី៣២ ជាប្រវត្តិសាស្ត្រ" : "The National Sports Awakening",
      description: isKhmer
        ? "កម្ពុជាធ្វើជាម្ចាស់ផ្ទះការប្រកួតកីឡាស៊ីហ្គេមលើកទី៣២ ប្រកបដោយជោគជ័យ និងភាពរស់រវើកនៃស្មារតីកីឡាជាតិ។"
        : "Cambodia hosts the historic 32nd SEA Games, igniting national pride and demand for a centralized sports platform.",
    },
    {
      year: "2024",
      title: isKhmer ? "ការរៀបចំផែនទីទីលាន និងពហុកីឡដ្ឋាន" : "Grassroots Arena Mapping",
      description: isKhmer
        ? "ប្រមូលផ្តុំទិន្នន័យពហុកីឡដ្ឋានខេត្ត សង្វៀនគុនខ្មែរ និងទីលានបាល់ទាត់ទូទាំងប្រទេសចូលក្នុងប្រព័ន្ធទិន្នន័យរួម។"
        : "Mapping provincial stadiums, football grounds, and Kun Khmer boxing rings across Phnom Penh and provinces.",
    },
    {
      year: "2025",
      title: isKhmer ? "ការដាក់ឱ្យដំណើរការប្រព័ន្ធ SportHub" : "SportHub Platform Launch",
      description: isKhmer
        ? "បង្រួបបង្រួមព័ត៌មានកីឡា ពហុកីឡដ្ឋានជាតិ និងសហគមន៍អ្នកគាំទ្រនៅលើវេទិកាឌីជីថលតែមួយ។"
        : "Unifying sports news, stadiums, athlete tournaments, and live fan reviews under one digital umbrella.",
    },
    {
      year: "2026+",
      title: isKhmer ? "ឆ្ពោះទៅកាន់អនាគតកីឡាកម្រិតអន្តរជាតិ" : "National Digital Athletics",
      description: isKhmer
        ? "ពង្រីកការតភ្ជាប់ទៅកាន់ការប្រកួតលំដាប់អន្តរជាតិ ឆ្ពោះទៅកាន់ព្រឹត្តិការណ៍ Asian Youth Games ឆ្នាំ២០៣១។"
        : "Connecting Cambodia to regional leagues ahead of the 2027 SEA Games and 2031 Asian Youth Games.",
    },
  ];

  return (
    <div className="font-sans pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#12150D] text-white pt-20 pb-24 border-b border-[#222919]">
        {/* Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#C6FE56]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#C6FE56]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-[#C6FE56] text-[#12150D] text-xs font-black px-4 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
              {isKhmer ? "អំពី SportHub កម្ពុជា" : "About SportHub Cambodia"}
            </span>
            <span className="text-xs text-[#8E9B7E] font-medium">
              Est. 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            {isKhmer
              ? "លើកកម្ពស់អត្តពលកម្មជាតិ "
              : "Empowering National Athletics, "}
            <span className="text-[#C6FE56]">
              {isKhmer
                ? "និងបំផុសស្មារតីជើងឯកជំនាន់ក្រោយ"
                : "Inspiring Future Champions"}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#C8D1BE] max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            {isKhmer
              ? "SportHub គឺជាប្រព័ន្ធកីឡាឌីជីថលឈានមុខគេរបស់កម្ពុជា ដែលឧទ្ទិសដល់ការផ្សព្វផ្សាយព័ត៌មានកីឡាជាតិ ការតភ្ជាប់ពហុកីឡដ្ឋាន និងការផ្តល់ជូននូវវេទិកាពិភាក្សាដ៏រស់រវើកសម្រាប់អ្នកគាំទ្រ។"
              : "SportHub is Cambodia's digital athletics ecosystem — dedicated to archiving national sports stories, pinpointing tournament arenas, and giving fans an interactive community platform."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/#sports">
              <Button className="bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] font-black rounded-full px-7 h-12 text-sm shadow-lg shadow-[#C6FE56]/20 transition-all hover:scale-[1.02]">
                <Trophy className="w-4 h-4 mr-2" />
                {isKhmer ? "ស្វែងរកកីឡាជាតិ" : "Explore Sports Hub"}
              </Button>
            </Link>

            <Link href="/#events">
              <Button
                variant="outline"
                className="border-[#2B3520] bg-[#1C2215] hover:bg-[#252E1B] text-white font-bold rounded-full px-6 h-12 text-sm"
              >
                <MapPin className="w-4 h-4 mr-2 text-[#C6FE56]" />
                {isKhmer ? "មើលពហុកីឡដ្ឋាន" : "View Tournament Venues"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#616D54] dark:text-[#A2AF93]">
            {isKhmer ? "គោលការណ៍ស្នូលរបស់យើង" : "Core Values"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#12150D] dark:text-[#F8F9F3] tracking-tight mt-1">
            {isKhmer
              ? "សសរស្តម្ភទាំងបួននៃឧត្តមភាព"
              : "Four Pillars of Excellence"}
          </h2>
          <p className="text-sm text-[#616D54] dark:text-[#CBD5BE] mt-2">
            {isKhmer
              ? "ការប្តេជ្ញាចិត្តរបស់យើងដើម្បីអភិវឌ្ឍកីឡាកម្ពុជាទៅកាន់កម្រិតស្តង់ដារអន្តរជាតិ"
              : "Our commitment to advancing Cambodian athletics with integrity, inclusion, and modern technology."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <Card
              key={i}
              className="rounded-3xl border border-[#E2E6D5] dark:border-[#26331B] bg-white dark:bg-[#151B10] p-6 hover:border-[#12150D] dark:hover:border-[#C6FE56] transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2E4] dark:bg-[#1E2816] flex items-center justify-center text-[#12150D] dark:text-[#F8F9F3] mb-5">
                  <v.icon className="w-6 h-6 text-emerald-700 dark:text-[#C6FE56]" />
                </div>
                <h3 className="text-lg font-black text-[#12150D] dark:text-[#F8F9F3] mb-2 leading-snug">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#616D54] dark:text-[#CBD5BE] leading-relaxed">
                  {v.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-[#12150D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6FE56]">
              {isKhmer ? "ដំណើរបេសកកម្ម" : "Our Journey"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
              {isKhmer
                ? "ដំណើរវិវត្តន៍នៃកីឡាជាតិកម្ពុជា"
                : "The Evolution of Cambodian Sports"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#192213] border border-[#2B381A] hover:border-[#C6FE56] transition-all"
              >
                <span className="text-2xl font-black text-[#C6FE56] block mb-2">
                  {m.year}
                </span>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-[#A8B799] leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== OUR MENTOR ======================== */}
      <section className="pt-20 pb-28 bg-[#F8F9F3] dark:bg-[#0D1009] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#C6FE56]/10 dark:bg-[#C6FE56]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#16A34A]/10 dark:bg-[#16A34A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12150D] dark:text-[#F8F9F3] tracking-tight mb-2 sm:mb-3">
              {isKhmer ? "គ្រូបង្ហាត់" : "Our "}
              <span className="text-[#16A34A] dark:text-[#C6FE56]">
                {isKhmer ? "" : "Mentor"}
              </span>
            </h2>

            {/* Decorative scissors dashed line */}
            <div className="flex items-center justify-center gap-1 my-3 sm:my-4">
              <div className="w-8 sm:w-16 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
              <div className="w-2 h-2 rounded-full bg-[#12150D] dark:bg-[#F8F9F3]" />
              <div className="w-5 sm:w-8 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#616D54] dark:text-[#8E9B7E] mx-1 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
              <div className="w-5 sm:w-8 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
              <div className="w-2 h-2 rounded-full bg-[#12150D] dark:bg-[#F8F9F3]" />
              <div className="w-8 sm:w-16 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
            </div>

            <p className="text-xs sm:text-sm text-[#616D54] dark:text-[#A2AF93] font-medium max-w-md mx-auto">
              {isKhmer
                ? "ត្រូវបានណែនាំដោយអ្នកដឹកនាំឧស្សាហកម្ម ដែលបំផុសគំនិតប្រឆាំងនឹងការរីកចម្រើន"
                : "Guided by industry leaders who inspire excellence and innovation."}
            </p>
          </div>

          {/* Mentor Card – Matching Image 3 Exactly */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] mt-16 sm:mt-20">
              {/* ── Top Avatar with Double Lime Ring ── */}
              <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-20">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[2.5px] border-dashed border-[#C6FE56] p-1.5 bg-[#F8F9F3] dark:bg-[#0D1009] flex items-center justify-center">
                  <div className="w-full h-full rounded-full border-[3px] border-[#C6FE56] overflow-hidden bg-[#EEF2E4] dark:bg-[#1C2215]">
                    <img
                      src="/team/mentor.jpg"
                      alt="Mentor Srorng Sokcheat"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* ── Top Corner Lime Dots ── */}
              <span className="absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-[#C6FE56] border-2 border-[#12150D] dark:border-[#CBD5BE] z-10 -translate-x-1/2 -translate-y-1/2" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#C6FE56] border-2 border-[#12150D] dark:border-[#CBD5BE] z-10 translate-x-1/2 -translate-y-1/2" />

              {/* ── Bottom Corner Solid Dark Dots ── */}
              <span className="absolute bottom-0 left-0 w-3.5 h-3.5 rounded-full bg-[#12150D] dark:bg-[#F8F9F3] z-10 -translate-x-1/2 translate-y-1/2" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#12150D] dark:bg-[#F8F9F3] z-10 translate-x-1/2 translate-y-1/2" />

              {/* ── Side Connector Tabs (2 pills on each side like Image 3) ── */}
              <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
                <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
              </span>
              <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
                <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
              </span>

              {/* ── Card Body (Image 3 Soft Green Background + Dashed Border) ── */}
              <div className="bg-[#EEF9E4] dark:bg-[#151D12] border-2 border-dashed border-[#12150D] dark:border-[#CBD5BE] rounded-3xl pt-20 sm:pt-24 pb-7 px-5 text-center shadow-lg flex flex-col justify-between min-h-[360px] sm:min-h-[380px]">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#12150D] dark:text-[#F8F9F3] mb-1.5">
                    Srorng Sokcheat
                  </h3>
                  <span className="inline-block px-5 py-1.5 rounded-full text-xs font-black bg-[#C6FE56] text-[#12150D] mb-4 shadow-xs">
                    {isKhmer ? "គ្រូបង្ហាត់" : "Mentor"}
                  </span>
                  <p className="text-xs sm:text-sm italic font-medium text-[#4B5E43] dark:text-[#CBD5BE] leading-relaxed px-2">
                    &ldquo;At the end of the day, it&apos;s night&rdquo;
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-2 flex items-center justify-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#12150D] dark:bg-[#F8F9F3] flex items-center justify-center text-white dark:text-[#12150D] hover:scale-110 transition-transform shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== MEET OUR MEMBERS ======================== */}
      <section className="pt-20 pb-28 bg-[#F8F9F3] dark:bg-[#0D1009] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-[#C6FE56]/10 dark:bg-[#C6FE56]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-[#16A34A]/10 dark:bg-[#16A34A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12150D] dark:text-[#F8F9F3] tracking-tight mb-2 sm:mb-3">
              {isKhmer ? "ជួបជាមួយ" : "Meet Our "}
              <span className="text-[#16A34A] dark:text-[#C6FE56]">
                {isKhmer ? "សមាជិកក្រុម" : "Members"}
              </span>
            </h2>

            {/* Decorative scissors dashed line */}
            <div className="flex items-center justify-center gap-1 my-3 sm:my-4">
              <div className="w-8 sm:w-16 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
              <div className="w-2 h-2 rounded-full bg-[#12150D] dark:bg-[#F8F9F3]" />
              <div className="w-5 sm:w-8 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#616D54] dark:text-[#8E9B7E] mx-1 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
              <div className="w-5 sm:w-8 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
              <div className="w-2 h-2 rounded-full bg-[#12150D] dark:bg-[#F8F9F3]" />
              <div className="w-8 sm:w-16 h-px border-t-2 border-dashed border-[#CBD5BE] dark:border-[#2B3520]" />
            </div>

            <p className="text-xs sm:text-sm text-[#616D54] dark:text-[#A2AF93] font-medium max-w-md mx-auto">
              {isKhmer
                ? "មនុស្សដែលស្រឡាញ់ ដែលជំរុញ SportHub ឆ្ពោះទៅមុខ"
                : "The passionate people driving SportHub forward."}
            </p>
          </div>

          {/* 6 Members Grid – All in Image 3 Green Card Style with Unique Relatable Quotes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 sm:gap-y-28 justify-items-center">
            {[
              {
                name: "Puthy Lyhong",
                role: isKhmer ? "អ្នកអភិវឌ្ឍន៍ Front-End" : "FrontEnd Developer",
                quote: isKhmer
                  ? '"អ្នកអាចពន្យារពេលបាន ប៉ុន្តែពេលវេលាមិនអាចពន្យារ"'
                  : '"You may delay, but time will not."',
                avatar: "/team/member2.jpg",
              },
              {
                name: "Kao Sengheang",
                role: isKhmer ? "អ្នកអភិវឌ្ថាន៍ Front-End" : "FrontEnd Developer",
                quote: isKhmer
                  ? '"ត្រឹមតែពីព្រោះអ្នកមិនបោះបង់ មិនមែនន័យថាអ្នកនឹងជោគជ័យ"'
                  : '"Just because you don\'t give up doesn\'t mean you will make it"',
                avatar: "/team/member3.jpg",
              },
              {
                name: "Hor kimcheng",
                role: isKhmer ? "អ្នកអភិវឌ្ឍន៍ Front-End" : "FrontEnd Developer",
                quote: isKhmer
                  ? '"ការរចនាល្អ គឺជាមិនត្រឹមតែមើលទៅស្អាតប៉ុណ្ណោះ ប៉ុន្តែដំណើរការបានល្អ"'
                  : '"Good design is not just about looking good but working well"',
                avatar: "/team/member5.jpg",
              },
              {
                name: "Dy Chhean",
                role: isKhmer ? "អ្នកអភិវឌ្ឍន៍ Front-End" : "FrontEnd Developer",
                quote: isKhmer
                  ? '"ប្រសិនបើអ្នកមានអារម្មណ៍ធ្លាក់ចិត្ត ចូរផ្ទុចបេះដូងឡើងវិញ"'
                  : '"If you are feeling disheartened, set your heart ablaze"',
                avatar: "/team/member1.jpg",
              },
              {
                name: "Borey Sothearith",
                role: isKhmer ? "អ្នកអភិវឌ្ឍន៍ Front-End" : "FrontEnd Developer",
                quote: isKhmer
                  ? '"ជំហានតូចៗរៀងរាល់ថ្ងៃ នាំទៅដល់លទ្ធផលដ៏អស្ចារ្យ"'
                  : '"Small steps every day lead to big results."',
                avatar: "/team/member4.jpg",
              },
              {
                name: "Eam Sambath",
                role: isKhmer ? "អ្នកអភិវឌ្ឍន៍ Front-End" : "FrontEnd Developer",
                quote: isKhmer
                  ? '"ភាពជោគជ័យគឺជាលទ្ធផលនៃការត្រៀមខ្លួនល្អ ឱកាស និងការខំប្រឹង"'
                  : '"Success is where preparation and opportunity meet"',
                avatar: "/team/member6.jpg",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="relative w-full max-w-[280px] sm:max-w-[310px] mt-16 sm:mt-20 flex flex-col justify-between"
              >
                {/* ── Top Avatar with Double Lime Ring ── */}
                <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[2.5px] border-dashed border-[#C6FE56] p-1.5 bg-[#F8F9F3] dark:bg-[#0D1009] flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-[3px] border-[#C6FE56] overflow-hidden bg-[#EEF2E4] dark:bg-[#1C2215]">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Top Corner Lime Dots ── */}
                <span className="absolute top-0 left-0 w-3.5 h-3.5 rounded-full bg-[#C6FE56] border-2 border-[#12150D] dark:border-[#CBD5BE] z-10 -translate-x-1/2 -translate-y-1/2" />
                <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#C6FE56] border-2 border-[#12150D] dark:border-[#CBD5BE] z-10 translate-x-1/2 -translate-y-1/2" />

                {/* ── Bottom Corner Solid Dark Dots ── */}
                <span className="absolute bottom-0 left-0 w-3.5 h-3.5 rounded-full bg-[#12150D] dark:bg-[#F8F9F3] z-10 -translate-x-1/2 translate-y-1/2" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#12150D] dark:bg-[#F8F9F3] z-10 translate-x-1/2 translate-y-1/2" />

                {/* ── Side Connector Tabs (2 pills on each side like Image 3) ── */}
                <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                  <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
                  <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
                </span>
                <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                  <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
                  <span className="w-2.5 h-6 rounded-full bg-[#CBD5BE] dark:bg-[#2B3520]" />
                </span>

                {/* ── Card Body (Image 3 Soft Green Background + Dashed Border) ── */}
                <div className="bg-[#EEF9E4] dark:bg-[#151D12] border-2 border-dashed border-[#12150D] dark:border-[#CBD5BE] rounded-3xl pt-20 sm:pt-24 pb-7 px-5 text-center shadow-md flex-1 flex flex-col justify-between min-h-[360px] sm:min-h-[380px]">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#12150D] dark:text-[#F8F9F3] mb-1.5 leading-snug">
                      {member.name}
                    </h3>
                    <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-black mb-3 shadow-xs bg-[#C6FE56] text-[#12150D]">
                      {member.role}
                    </span>
                    <p className="text-xs italic font-medium text-[#4B5E43] dark:text-[#CBD5BE] leading-relaxed px-1 min-h-[44px] flex items-center justify-center">
                      {member.quote}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="mt-5 pt-2 flex items-center justify-center gap-3">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#12150D] dark:bg-[#F8F9F3] flex items-center justify-center text-white dark:text-[#12150D] hover:scale-110 transition-transform shadow-xs"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xs"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://t.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xs"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-10 sm:p-14 rounded-[2.5rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-black text-[#12150D] dark:text-[#F8F9F3] tracking-tight mb-4">
            {isKhmer
              ? "ត្រៀមខ្លួនរួចរាល់ហើយឬនៅ ក្នុងការគាំទ្រកីឡាជាតិ?"
              : "Ready to Explore National Matches & Venues?"}
          </h2>
          <p className="text-sm sm:text-base text-[#616D54] dark:text-[#CBD5BE] max-w-xl mx-auto mb-8">
            {isKhmer
              ? "ចូលរួមជាមួយអ្នកគាំទ្រកីឡារាប់ពាន់នាក់នៅទូទាំងប្រទេស ដើម្បីទទួលបានព័ត៌មាន និងទីតាំងប្រកួតច្បាស់លាស់។"
              : "Join thousands of Cambodian sports fans staying informed with live fixtures, stadium coordinates, and community reviews."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/#sports">
              <Button className="bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D] font-extrabold rounded-full px-8 h-12 text-sm shadow-md">
                {isKhmer ? "ចូលទៅកាន់កាតាឡុកកីឡា" : "Browse Sports Catalog"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            {!isLoggedIn && (
              <Button
                variant="outline"
                onClick={() => openAuthModal("register")}
                className="border-[#E2E6D5] dark:border-[#26331B] dark:text-[#F8F9F3] dark:hover:bg-[#1E2816] rounded-full px-7 h-12 text-sm font-bold"
              >
                {isKhmer ? "បង្កើតគណនីឥតគិតថ្លៃ" : "Create Free Account"}
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
