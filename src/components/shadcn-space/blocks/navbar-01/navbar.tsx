"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Heart,
  LayoutDashboard,
  Shield,
  User,
  LogOut,
  ChevronRight,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRole } from "@/context/role-context";
import { useTheme } from "@/context/theme-context";
import { useLanguage } from "@/context/language-context";
import { useFavorites } from "@/context/favorites-context";

/**
 * Width (px) at which the full inline nav appears and the burger drawer hides.
 *
 * It must match Tailwind's `xl` breakpoint, because the CSS uses `xl:flex` /
 * `xl:hidden`. At 768px (iPad portrait) the logo + 4 nav links + action
 * buttons need ~778px as a guest and ~914px when an admin link is added,
 * which overflows a 768px viewport. So phones AND tablets share the same
 * drawer layout, and only genuinely wide screens get the inline nav.
 */
const DESKTOP_NAV_MIN = 1280;

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    role,
    setRole,
    isAdmin,
    user,
    isLoggedIn,
    logout,
    openAuthModal,
  } = useRole();
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t, isKhmer } = useLanguage();
  const { favoritesCount, openFavorites } = useFavorites();
  const pathName = usePathname();

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 20);
  }, []);

  // Close the drawer when we grow past the breakpoint where the inline
  // nav appears (see `DESKTOP_NAV_MIN` below).
  const handleResize = useCallback(() => {
    if (window.innerWidth >= DESKTOP_NAV_MIN) setIsOpen(false);
  }, []);

  // Lock background scroll while the drawer is open, and close on Escape.
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Close the drawer whenever navigation happens.
  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  if (
    pathName === "/product-in-group" ||
    pathName === "/contact-in-gp" ||
    pathName?.startsWith("/dashboard")
  ) {
    return null;
  }

  const navigationItems = [
    { title: t("nav.home", "Home"), href: "/" },
    { title: t("nav.sports", "Sports"), href: "/#sports" },
    { title: t("nav.venues", "Venues"), href: "/#events" },
    { title: t("nav.about", "About"), href: "/about" },
  ];

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isKhmer ? "font-battambang" : "font-sans")}>
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 xl:px-6 py-3">
        <nav
          className={cn(
            "w-full flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 xl:px-6 h-16 rounded-full transition-all duration-300",
            sticky
              ? "bg-white/95 dark:bg-[#12150D]/95 backdrop-blur-xl border border-[#E2E6D5] dark:border-[#2B3520] shadow-md dark:shadow-xl text-[#12150D] dark:text-[#F8F9F3]"
              : "bg-white dark:bg-[#12150D] border border-[#E2E6D5] dark:border-[#222919] shadow-sm dark:shadow-lg text-[#12150D] dark:text-[#F8F9F3]"
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-95 transition-opacity">
            <Logo size="sm" />
          </Link>

{/* Clean, Minimal Nav: Home, Sports, Venues, About */}
          <div className="hidden xl:flex items-center gap-1.5">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathName === "/"
                  : item.href.startsWith("/#")
                    ? false
                    : pathName === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm font-semibold rounded-full transition-all tracking-normal whitespace-nowrap",
                    isActive
                      ? "bg-[#C6FE56] text-[#12150D] font-bold shadow-xs"
                      : "text-[#26311A] hover:text-[#12150D] hover:bg-[#EEF2E4] dark:text-white dark:hover:text-[#12150D] dark:hover:bg-[#C6FE56]"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}

            {/* Admin Console shortcut (active when in admin role) */}
            {isAdmin && (
              <Link
                href="/dashboard"
                className={cn(
                  "px-3 py-1.5 text-sm font-bold rounded-full transition-all tracking-normal whitespace-nowrap flex items-center gap-1.5",
                  pathName.startsWith("/dashboard")
                    ? "bg-[#C6FE56] text-[#12150D] shadow-xs"
                    : "text-[#16A34A] dark:text-[#C6FE56] bg-[#EEF2E4] dark:bg-[#1C2215] border border-[#D5DEC5] dark:border-[#2B3520] hover:bg-[#C6FE56] hover:text-[#12150D]"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{t("nav.adminConsole", "Admin Console")}</span>
              </Link>
            )}
          </div>

          {/* Right Action: Language + Theme Toggle + Favorites + Auth/Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Khmer / English Language Switcher with Real Flags
                Hidden below sm (still available in the drawer) so the bar
                keeps an even rhythm on narrow phones. */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex h-9 sm:h-10 w-9 sm:w-auto sm:min-w-10 xl:px-3 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shadow-2xs group shrink-0"
              title={isKhmer ? "Switch to English (UK Flag)" : "ប្តូរទៅជាភាសាខ្មែរ (ទង់ជាតិកម្ពុជា)"}
              aria-label="Switch Language"
            >
              <div className="w-5 h-3.5 overflow-hidden rounded-[2.5px] border border-black/15 dark:border-white/20 shrink-0 shadow-2xs flex items-center justify-center bg-black/5">
                <img
                  src={isKhmer ? "/flags/kh.svg" : "/flags/gb.svg"}
                  alt={isKhmer ? "Cambodia Flag" : "United Kingdom Flag"}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <span className={cn(isKhmer ? "font-battambang font-bold" : "font-bold", "hidden xl:inline")}>
                {isKhmer ? "ខ្មែរ" : "EN"}
              </span>
            </button>

            {/* Dark Mode / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center justify-center transition-colors cursor-pointer shadow-2xs shrink-0"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark and Light Mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-500 dark:text-[#C6FE56] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#616D54] dark:text-[#CBD5BE] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Favorites Button with Live Count Badge */}
            <button
              onClick={openFavorites}
              className="relative h-9 w-9 sm:h-10 sm:w-10 xl:w-auto xl:px-3 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shadow-2xs group shrink-0"
              title={isKhmer ? "កីឡាពេញចិត្ត" : "My Saved Favorites"}
              aria-label="View Favorites"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  favoritesCount > 0 ? "text-rose-500 fill-rose-500" : "text-[#616D54] dark:text-[#CBD5BE]"
                )}
              />
              <span className="hidden xl:inline font-semibold">
                {isKhmer ? "ពេញចិត្ត" : "Favorites"}
              </span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 xl:static xl:ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#C6FE56] text-[#12150D] leading-none shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Auth Buttons or User Avatar — below xl these live in the drawer,
                so the bar keeps an even rhythm instead of overflowing. */}
            {!isLoggedIn ? (
              <div className="hidden xl:flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => openAuthModal("login")}
                  className="inline-flex rounded-full px-3.5 h-10 text-xs font-bold text-[#12150D] dark:text-[#E5EAD9] hover:text-[#12150D] hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1" />
                  {t("nav.signIn", "Sign In")}
                </Button>

                <Button
                  onClick={() => openAuthModal("register")}
                  className="inline-flex rounded-full px-3.5 h-10 text-xs font-black bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] shadow-md shadow-[#C6FE56]/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  {t("nav.register", "Register")}
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-9 sm:h-10 flex items-center gap-2 pl-1.5 pr-2.5 xl:pr-3 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] transition-colors cursor-pointer outline-none shrink-0">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-6 h-6 rounded-full object-cover border border-[#C6FE56]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                      }}
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black text-xs uppercase">
                      {user?.username?.[0] || "U"}
                    </div>
                  )}
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-[#12150D] dark:text-white max-w-[90px] truncate leading-tight">
                      {user?.username}
                    </span>
                    <span className="text-[10px] font-bold text-[#16A34A] dark:text-[#C6FE56] uppercase leading-tight">
                      {isAdmin ? "Admin" : "Fan"}
                    </span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-white dark:bg-[#12150D] border border-[#E2E6D5] dark:border-[#2B3520] text-[#12150D] dark:text-white p-2.5 rounded-2xl shadow-2xl font-sans"
                >
                  <div className="p-2 border-b border-[#E2E6D5] dark:border-[#222919] mb-1.5 flex items-center gap-2.5">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#C6FE56] shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black text-sm uppercase shrink-0">
                        {user?.username?.[0] || "U"}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-xs font-black text-[#12150D] dark:text-white truncate">
                        {user?.username}
                      </p>
                      <p className="text-[10px] text-[#16A34A] dark:text-[#C6FE56] font-bold uppercase truncate">
                        {isAdmin ? "Administrator" : "Fan Member"}
                      </p>
                      <p className="text-[10px] text-[#616D54] dark:text-[#8E9B7E] truncate">
                        {user?.email || `${user?.username}@sport.com`}
                      </p>
                    </div>
                  </div>

                  {/* Admin Console: ONLY visible for logged-in Admin */}
                  {isAdmin && (
                    <DropdownMenuItem className="p-0">
                      <Link
                        href="/dashboard"
                        className="w-full cursor-pointer text-xs font-bold p-2 hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] rounded-xl text-[#16A34A] dark:text-[#C6FE56] flex items-center"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        {t("nav.adminConsole", "Admin Console")}
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {/* My Favorites */}
                  <DropdownMenuItem
                    onClick={openFavorites}
                    className="cursor-pointer p-2 text-xs font-bold rounded-xl hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] text-[#12150D] dark:text-[#CBD5BE] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Heart className={cn("w-3.5 h-3.5 mr-2", favoritesCount > 0 ? "text-rose-500 fill-rose-500" : "text-[#616D54] dark:text-[#8E9B7E]")} />
                      {isKhmer ? "កីឡាពេញចិត្ត" : "My Favorites"}
                    </div>
                    {favoritesCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#C6FE56] text-[#12150D]">
                        {favoritesCount}
                      </span>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer p-2 text-xs font-bold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    {t("nav.signOut", "Sign Out")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Burger Menu */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors shrink-0 shadow-2xs"
            >
              <span
                className={cn(
                  "block h-0.5 w-[18px] sm:w-5 rounded-full bg-[#12150D] dark:bg-white transition-all duration-300",
                  isOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-[18px] sm:w-5 rounded-full bg-[#12150D] dark:bg-white transition-all duration-300",
                  isOpen && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-[18px] sm:w-5 rounded-full bg-[#12150D] dark:bg-white transition-all duration-300",
                  isOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* ================= MOBILE SLIDE-IN DRAWER ================= */}
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={cn(
          "xl:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer panel */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "xl:hidden fixed top-0 right-0 z-[70] h-[100dvh] w-[86vw] max-w-[360px] flex flex-col",
          "bg-white dark:bg-[#12150D] border-l border-[#E2E6D5] dark:border-[#2B3520]",
          "shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[#E2E6D5] dark:border-[#222919] shrink-0">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 min-w-0">
            <Logo size="sm" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 shrink-0 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] flex items-center justify-center cursor-pointer transition-colors hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
          {/* Primary navigation list */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathName === "/"
                  : item.href.startsWith("/#")
                    ? false
                    : pathName === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-2 w-full px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[48px]",
                    isActive
                      ? "bg-[#C6FE56] text-[#12150D] font-bold"
                      : "text-[#12150D] dark:text-white hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215]"
                  )}
                >
                  <span className="truncate">{item.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
                </Link>
              );
            })}

            {/* Admin Console: only for logged-in admin */}
            {isAdmin && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between gap-2 w-full px-3.5 py-3 rounded-xl text-sm font-bold text-[#16A34A] dark:text-[#C6FE56] bg-[#EEF2E4] dark:bg-[#1C2215] border border-[#D5DEC5] dark:border-[#2B3520] transition-colors hover:bg-[#C6FE56] hover:text-[#12150D] min-h-[48px]"
              >
                <span className="flex items-center gap-2 truncate">
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  {t("nav.adminConsole", "Admin Console")}
                </span>
                <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
              </Link>
            )}
          </nav>

          {/* Favorites */}
          <div className="pt-3 border-t border-[#E2E6D5] dark:border-[#222919]">
            <button
              onClick={() => {
                setIsOpen(false);
                openFavorites();
              }}
              className="flex items-center justify-between gap-2 w-full px-3.5 py-3 rounded-xl text-sm font-semibold text-[#12150D] dark:text-white hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] transition-colors min-h-[48px]"
            >
              <span className="flex items-center gap-2 truncate">
                <Heart
                  className={cn(
                    "w-4 h-4 shrink-0",
                    favoritesCount > 0 ? "text-rose-500 fill-rose-500" : "text-[#616D54] dark:text-[#CBD5BE]"
                  )}
                />
                {isKhmer ? "កីឡាពេញចិត្ត" : "My Favorites"}
              </span>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#C6FE56] text-[#12150D] shrink-0">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Theme + Language */}
          <div className="pt-3 border-t border-[#E2E6D5] dark:border-[#222919] grid grid-cols-2 gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark and light mode"
              className="h-11 px-2 rounded-xl bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] text-xs font-bold text-[#12150D] dark:text-[#E5EAD9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:border-[#16A34A] dark:hover:border-[#C6FE56]"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-500 dark:text-[#C6FE56] shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-[#616D54] dark:text-[#CBD5BE] shrink-0" />
              )}
              <span className="truncate">{isDark ? "Light" : "Dark"}</span>
            </button>
            <button
              onClick={toggleLanguage}
              aria-label="Switch language"
              className="h-11 px-2 rounded-xl bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] text-xs font-bold text-[#12150D] dark:text-[#E5EAD9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:border-[#16A34A] dark:hover:border-[#C6FE56]"
            >
              <div className="w-5 h-3.5 overflow-hidden rounded-[2.5px] border border-black/15 dark:border-white/20 shrink-0">
                <img
                  src={isKhmer ? "/flags/kh.svg" : "/flags/gb.svg"}
                  alt={isKhmer ? "Cambodia Flag" : "United Kingdom Flag"}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={cn("truncate", isKhmer && "font-battambang font-bold")}>
                {isKhmer ? "ភាសាខ្មែរ" : "English"}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer footer: auth actions, pinned to the bottom */}
        <div className="shrink-0 border-t border-[#E2E6D5] dark:border-[#222919] p-4">
          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  openAuthModal("login");
                }}
                className="h-11 justify-center rounded-xl text-xs font-bold bg-[#F8F9F3] dark:bg-[#1C2215] text-[#12150D] dark:text-white border border-[#E2E6D5] dark:border-[#2B3520] hover:bg-[#EEF2E4] dark:hover:bg-[#252E1B]"
              >
                <LogIn className="w-3.5 h-3.5 mr-1 shrink-0" />
                {t("nav.signIn", "Sign In")}
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  openAuthModal("register");
                }}
                className="h-11 justify-center rounded-xl text-xs font-black bg-[#C6FE56] text-[#12150D] hover:bg-[#B3E848]"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1 shrink-0" />
                {t("nav.register", "Register")}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 px-1 pb-1">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#C6FE56] shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black text-sm uppercase shrink-0">
                    {user?.username?.[0] || "U"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-[#12150D] dark:text-white truncate">
                    {user?.username}
                  </p>
                  <p className="text-[10px] font-bold text-[#16A34A] dark:text-[#C6FE56] uppercase truncate">
                    {isAdmin ? "Administrator" : "Fan Member"}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full h-11 justify-center rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50"
              >
                <LogOut className="w-3.5 h-3.5 mr-1 shrink-0" />
                {t("nav.signOut", "Sign Out")}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}
