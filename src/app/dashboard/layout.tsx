"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/shadcn-space/blocks/sidebar-01/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Sun,
  Moon,
  ArrowLeft,
  Lock,
  LogIn,
  UserPlus,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useRole } from "@/context/role-context";
import { useTheme } from "@/context/theme-context";
import { useLanguage } from "@/context/language-context";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isAdmin, openAuthModal, login, setRole } = useRole();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, isKhmer, t } = useLanguage();

  // 1. Mandatory Admin Authentication Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1009] text-white flex flex-col font-sans">
        {/* Top Minimal Bar */}
        <header className="h-16 border-b border-[#222919] px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img src="/sporty-logo.png" alt="Sporty" className="h-9 w-auto object-contain" />
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full border-[#2B3520] bg-[#161C10] hover:bg-[#202917] text-white text-xs font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              {isKhmer ? "ត្រឡប់ទៅគេហទំព័រដើម" : "Return to Public Website"}
            </Button>
          </Link>
        </header>

        {/* Centered Authentication Required Card */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md w-full bg-[#12150D] border border-[#2B3520] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
            {/* Ambient Volt Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#C6FE56]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#16A34A]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Shield / Lock Icon */}
            <div className="w-18 h-18 rounded-3xl bg-[#1C2215] border border-[#2B3520] flex items-center justify-center mx-auto mb-6 text-[#C6FE56] shadow-md relative group">
              <Shield className="w-9 h-9" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>

            <Badge className="bg-[#1C2215] text-[#C6FE56] border border-[#2B3520] px-3.5 py-1 text-xs uppercase tracking-wider font-extrabold rounded-full mb-3 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C6FE56] animate-pulse" />
              {isKhmer ? "តំបន់រដ្ឋបាលការពារ" : "Protected Admin Area"}
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {isKhmer ? "ទាមទារការចូលគណនី Admin" : "Admin Sign In Required"}
            </h1>

            <p className="text-xs sm:text-sm text-[#A2AF93] leading-relaxed mb-8">
              {isKhmer
                ? "ផ្ទាំងគ្រប់គ្រង SportHub Admin ត្រូវបានការពារ។ លោកអ្នកត្រូវតែចូលគណនី ឬចុះឈ្មោះជា Administrator ដើម្បីមើលស្ថិតិ និងគ្រប់គ្រងទិន្នន័យកីឡា។"
                : "The SportHub Management Console is restricted. You must log in or register with Administrator credentials to access analytics, venue management, and CRUD controls."}
            </p>

            <div className="space-y-3">
              {/* Sign In Button */}
              <Button
                onClick={() => openAuthModal("login")}
                className="w-full h-12 rounded-full bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] font-black text-sm shadow-lg shadow-[#C6FE56]/20 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                {isKhmer ? "ចូលគណនីជា Admin" : "Sign In as Administrator"}
              </Button>

              {/* Register Button */}
              <Button
                onClick={() => openAuthModal("register")}
                variant="outline"
                className="w-full h-12 rounded-full border-[#2B3520] bg-[#1C2215] hover:bg-[#252E1B] text-white font-bold text-sm transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {isKhmer ? "ចុះឈ្មោះគណនី Admin ថ្មី" : "Register Admin Account"}
              </Button>

              {/* Instant 1-Click Demo Login */}
              <button
                type="button"
                onClick={() => {
                  login("Admin_Master", "password123", "admin");
                  setRole("admin");
                }}
                className="w-full py-2.5 text-xs font-bold text-[#8E9B7E] hover:text-[#C6FE56] transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <Zap className="w-3.5 h-3.5 text-[#C6FE56]" />
                {isKhmer ? "⚡ ចូលសាកល្បងរហ័ស (1-Click Demo Admin)" : "⚡ One-Click Demo Admin Access"}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard Layout (Self-contained: No public navbar/footer clashes)
  return (
    <section className="bg-[#F8F9F3] dark:bg-[#0D1009] text-[#12150D] dark:text-[#F8F9F3] min-h-screen transition-colors duration-200 font-sans">
      <SidebarProvider>
        <AppSidebar />
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 bg-[#F8F9F3] dark:bg-[#0D1009] transition-colors">
          {/* Symmetrical Top Admin Header */}
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#E2E6D5] dark:border-[#222919] bg-white/95 dark:bg-[#12150D]/95 backdrop-blur-md px-4 sm:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="cursor-pointer text-[#12150D] dark:text-white hover:text-emerald-700" />
              <div className="h-5 w-px bg-[#E2E6D5] dark:bg-[#2B3520] hidden sm:block" />
              <Badge className="bg-[#C6FE56] text-[#12150D] font-black text-xs border-0 px-3 py-1 shadow-sm">
                <Shield className="w-3.5 h-3.5 mr-1" />
                {isKhmer ? "ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល" : "Admin Operations"}
              </Badge>
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#8E9B7E] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#C6FE56] animate-pulse" />
                {isKhmer ? "ប្រព័ន្ធ API ដំណើរការធម្មតា" : "Live API Connected"}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Language Switcher with Real Flags */}
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "km" : "en")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] text-xs font-bold text-[#12150D] dark:text-white hover:border-[#C6FE56] transition-all cursor-pointer group"
                title={language === "en" ? "ប្តូរទៅជាភាសាខ្មែរ (ទង់ជាតិកម្ពុជា)" : "Switch to English (UK Flag)"}
                aria-label="Switch Language"
              >
                <div className="w-5 h-3.5 overflow-hidden rounded-[2.5px] border border-black/15 dark:border-white/20 shrink-0 shadow-2xs flex items-center justify-center bg-black/5">
                  <img
                    src={language === "km" ? "/flags/kh.svg" : "/flags/gb.svg"}
                    alt={language === "km" ? "Cambodia Flag" : "United Kingdom Flag"}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <span className={isKhmer ? "font-battambang font-bold" : "font-bold"}>
                  {language === "km" ? "ខ្មែរ" : "EN"}
                </span>
              </button>

              {/* Theme Switcher */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] flex items-center justify-center text-[#12150D] dark:text-white hover:border-[#C6FE56] transition-all cursor-pointer"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-[#12150D]" />
                )}
              </button>

              {/* Active Admin Profile */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#E2E6D5] dark:border-[#2B3520]">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#C6FE56]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black text-xs">
                    {user?.username?.[0] || "A"}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <span className="block text-xs font-black text-[#12150D] dark:text-white leading-tight truncate max-w-[100px]">
                    {user?.username || "Administrator"}
                  </span>
                  <span className="block text-[10px] font-bold text-[#C6FE56] uppercase leading-tight">
                    Super Admin
                  </span>
                </div>
              </div>

              {/* Back to Public Website */}
              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-full border-[#E2E6D5] dark:border-[#2B3520] bg-white dark:bg-[#1C2215] hover:bg-[#EEF2E4] dark:hover:bg-[#252E1B] text-[#12150D] dark:text-white font-bold text-xs h-9 px-3.5 shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span className="hidden sm:inline">{isKhmer ? "គេហទំព័រដើម" : "Public Website"}</span>
                </Button>
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
}
