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
  TextAlignJustify,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRole } from "@/context/role-context";
import { useTheme } from "@/context/theme-context";
import { useLanguage } from "@/context/language-context";
import { useFavorites } from "@/context/favorites-context";

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

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

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
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-3.5">
        <nav
          className={cn(
            "w-full flex items-center justify-between gap-3 px-5 sm:px-6 h-15 rounded-full transition-all duration-300",
            sticky
              ? "bg-white/95 dark:bg-[#12150D]/95 backdrop-blur-xl border border-[#E2E6D5] dark:border-[#2B3520] shadow-md dark:shadow-xl text-[#12150D] dark:text-[#F8F9F3]"
              : "bg-white dark:bg-[#12150D] border border-[#E2E6D5] dark:border-[#222919] shadow-sm dark:shadow-lg text-[#12150D] dark:text-[#F8F9F3]"
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 hover:opacity-95 transition-opacity">
            <Logo />
          </Link>

          {/* Clean, Minimal Nav: Home, Sports, Venues, About */}
          <div className="hidden md:flex items-center gap-1">
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
                    "px-3.5 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all tracking-normal whitespace-nowrap",
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
                  "px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-full transition-all tracking-normal whitespace-nowrap flex items-center gap-1.5",
                  pathName.startsWith("/dashboard")
                    ? "bg-[#C6FE56] text-[#12150D] shadow-xs"
                    : "text-[#16A34A] dark:text-[#C6FE56] bg-[#EEF2E4] dark:bg-[#1C2215] border border-[#D5DEC5] dark:border-[#2B3520] hover:bg-[#C6FE56] hover:text-[#12150D]"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {t("nav.adminConsole", "Admin Console")}
              </Link>
            )}
          </div>

          {/* Right Action: Language + Theme Toggle + Auth/Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Khmer / English Language Switcher with Real Flags */}
            <button
              onClick={toggleLanguage}
              className="h-8 px-2.5 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
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
              <span className={isKhmer ? "font-battambang font-bold" : "font-bold"}>
                {isKhmer ? "ខ្មែរ" : "EN"}
              </span>
            </button>

            {/* Dark Mode / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark and Light Mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-500 dark:text-[#C6FE56] transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#616D54] dark:text-[#CBD5BE] transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Favorites Button with Live Count Badge */}
            <button
              onClick={openFavorites}
              className="relative h-8 px-2.5 sm:px-3 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
              title={isKhmer ? "កីឡាពេញចិត្ត" : "My Saved Favorites"}
              aria-label="View Favorites"
            >
              <Heart
                className={cn(
                  "w-3.5 h-3.5 transition-transform group-hover:scale-110",
                  favoritesCount > 0 ? "text-rose-500 fill-rose-500" : "text-[#616D54] dark:text-[#CBD5BE]"
                )}
              />
              <span className="hidden lg:inline font-semibold">
                {isKhmer ? "ពេញចិត្ត" : "Favorites"}
              </span>
              {favoritesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#C6FE56] text-[#12150D] leading-none animate-in zoom-in-50 duration-200">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Auth Buttons or User Avatar */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  onClick={() => openAuthModal("login")}
                  className="rounded-full px-3.5 h-8 text-xs font-bold text-[#12150D] dark:text-[#E5EAD9] hover:text-[#12150D] hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] dark:hover:text-white transition-all cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1" />
                  {t("nav.signIn", "Sign In")}
                </Button>

                <Button
                  onClick={() => openAuthModal("register")}
                  className="rounded-full px-3.5 h-8 text-xs font-black bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] shadow-md shadow-[#C6FE56]/20 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  {t("nav.register", "Register")}
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] hover:border-[#16A34A] dark:hover:border-[#C6FE56] transition-all cursor-pointer outline-none">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-7 h-7 rounded-full object-cover border border-[#C6FE56]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                      }}
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black text-xs uppercase">
                      {user?.username?.[0] || "U"}
                    </div>
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#12150D] dark:text-white max-w-[80px] truncate leading-tight">
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

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="rounded-full bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] p-2 outline-none flex items-center justify-center cursor-pointer text-[#12150D] dark:text-white">
                  <TextAlignJustify size={18} />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-white dark:bg-[#12150D] border border-[#E2E6D5] dark:border-[#2B3520] text-[#12150D] dark:text-white p-2.5 rounded-2xl shadow-2xl font-sans"
                >
                  {navigationItems.map((item) => (
                    <DropdownMenuItem key={item.href} className="p-0">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="w-full cursor-pointer text-sm font-semibold p-2 hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] rounded-xl text-[#12150D] dark:text-white block"
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  {isAdmin && (
                    <DropdownMenuItem className="p-0">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="w-full cursor-pointer text-sm font-bold p-2 text-[#16A34A] dark:text-[#C6FE56] hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] rounded-xl flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {t("nav.adminConsole", "Admin Console")}
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {/* Mobile Favorites Button */}
                  <DropdownMenuItem className="p-0">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        openFavorites();
                      }}
                      className="w-full cursor-pointer text-sm font-semibold p-2 hover:bg-[#EEF2E4] dark:hover:bg-[#1C2215] rounded-xl text-[#12150D] dark:text-white flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Heart
                          className={cn(
                            "w-4 h-4",
                            favoritesCount > 0 ? "text-rose-500 fill-rose-500" : "text-[#616D54] dark:text-[#8E9B7E]"
                          )}
                        />
                        {isKhmer ? "កីឡាពេញចិត្ត" : "Favorites"}
                      </span>
                      {favoritesCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#C6FE56] text-[#12150D]">
                          {favoritesCount}
                        </span>
                      )}
                    </button>
                  </DropdownMenuItem>

                  <div className="pt-2 mt-2 border-t border-[#E2E6D5] dark:border-[#222919] flex items-center justify-between px-2">
                    <button
                      onClick={toggleLanguage}
                      className="text-xs font-bold text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center gap-2 py-1"
                    >
                      <div className="w-5 h-3.5 overflow-hidden rounded-[2.5px] border border-black/15 dark:border-white/20 shrink-0 shadow-2xs flex items-center justify-center bg-black/5">
                        <img
                          src={isKhmer ? "/flags/kh.svg" : "/flags/gb.svg"}
                          alt={isKhmer ? "Cambodia Flag" : "United Kingdom Flag"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={isKhmer ? "font-battambang font-bold" : ""}>
                        {isKhmer ? "ភាសាខ្មែរ" : "English"}
                      </span>
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="text-xs font-bold text-[#12150D] dark:text-[#E5EAD9] hover:text-[#16A34A] dark:hover:text-[#C6FE56] flex items-center gap-1.5 py-1"
                    >
                      {isDark ? (
                        <>
                          <Sun className="w-3.5 h-3.5 text-amber-500 dark:text-[#C6FE56]" />
                          <span>Light</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-3.5 h-3.5 text-[#616D54] dark:text-[#CBD5BE]" />
                          <span>Dark</span>
                        </>
                      )}
                    </button>
                  </div>

                  {!isLoggedIn && (
                    <div className="pt-2 mt-2 border-t border-[#E2E6D5] dark:border-[#222919] space-y-1">
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          openAuthModal("login");
                        }}
                        className="w-full justify-start rounded-xl text-xs font-bold bg-[#F8F9F3] dark:bg-[#1C2215] text-[#12150D] dark:text-white hover:bg-[#EEF2E4] dark:hover:bg-[#252E1B] border border-[#E2E6D5] dark:border-transparent h-9"
                      >
                        <LogIn className="w-3.5 h-3.5 mr-1.5" />
                        {t("nav.signIn", "Sign In")}
                      </Button>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          openAuthModal("register");
                        }}
                        className="w-full justify-start rounded-xl text-xs font-black bg-[#C6FE56] text-[#12150D] hover:bg-[#B3E848] h-9"
                      >
                        <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                        {t("nav.register", "Register")}
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
