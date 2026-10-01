"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaGithub, FaTelegram } from "react-icons/fa6";
import { useLanguage } from "@/context/language-context";

// Decorative Wavy Line component matching the reference template in brand green
const WavyUnderline = () => (
  <svg
    className="w-16 h-2.5 my-2.5 text-[#16A34A] dark:text-[#C6FE56]"
    viewBox="0 0 64 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 4C4 1 8 1 11 4C14 7 18 7 21 4C24 1 28 1 31 4C34 7 38 7 41 4C44 1 48 1 51 4C54 7 58 7 63 4"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Footer2() {
  const pathName = usePathname();
  const { isKhmer } = useLanguage();

  if (
    pathName === "/product-in-group" ||
    pathName === "/contact-in-gp" ||
    pathName?.startsWith("/dashboard")
  ) {
    return null;
  }

  return (
    <footer
      className={`relative bg-white dark:bg-[#12150D] text-[#12150D] dark:text-[#F8F9F3] border-t border-[#E2E6D5] dark:border-[#222919] pt-16 pb-10 transition-colors duration-200 ${
        isKhmer ? "font-battambang" : "font-sans"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Grid with balanced column widths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] gap-8 lg:gap-10 pb-12">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="h-7 flex items-center">
              <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                <img
                  src="/sporty-logo.png"
                  alt="Sporty"
                  className="h-10 sm:h-11 lg:h-12 w-auto object-contain drop-shadow-sm"
                />
              </Link>
            </div>

            <p className="text-xs sm:text-[13px] text-[#616D54] dark:text-[#A2AF93] leading-relaxed max-w-xs">
              {isKhmer
                ? "បង្កើតបទពិសោធន៍កីឡាជាតិប្រកបដោយភាពរស់រវើក ជាមួយទិន្នន័យពហុកីឡដ្ឋាន និងសហគមន៍អ្នកគាំទ្រកម្ពុជា។"
                : "Create beautiful athletic experiences with ease so you can focus on what truly matters in Cambodian sports."}
            </p>

            {/* Social Media Buttons (Facebook, Instagram, GitHub, Telegram) */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                title="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#24292F] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                title="Telegram"
              >
                <FaTelegram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div>
            <div className="h-7 flex items-center">
              <h4 className="font-bold text-sm sm:text-base text-[#12150D] dark:text-white tracking-tight">
                {isKhmer ? "ធនធាន" : "Resources"}
              </h4>
            </div>
            <WavyUnderline />
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#616D54] dark:text-[#CBD5BE] font-medium pt-1">
              <li>
                <Link href="/#sports" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "បណ្ណាល័យកីឡា" : "Sports Directory"}
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "កាលវិភាគប្រកួត" : "Event Fixtures"}
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "ទីលាន & ពហុកីឡដ្ឋាន" : "Venues & Arenas"}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "ចំណាត់ថ្នាក់កីឡា" : "Discipline Categories"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "កីឡាជាតិខ្មែរ" : "Khmer Heritage Sports"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <div className="h-7 flex items-center">
              <h4 className="font-bold text-sm sm:text-base text-[#12150D] dark:text-white tracking-tight">
                {isKhmer ? "ស្ថាប័ន" : "Company"}
              </h4>
            </div>
            <WavyUnderline />
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#616D54] dark:text-[#CBD5BE] font-medium pt-1">
              <li>
                <Link href="/about" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "អំពីយើង" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/#sports" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "មុខងារពិសេស" : "Features"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "ដំណើរការប្រព័ន្ធ" : "How It Works"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "សមាជិកកីឡាករ" : "Our Athletes"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "ក្រុមការងារ" : "Our Team"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <div className="h-7 flex items-center">
              <h4 className="font-bold text-sm sm:text-base text-[#12150D] dark:text-white tracking-tight">
                {isKhmer ? "ជំនួយ" : "Support"}
              </h4>
            </div>
            <WavyUnderline />
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#616D54] dark:text-[#CBD5BE] font-medium pt-1">
              <li>
                <a href="mailto:contact@sporthub.com.kh" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "ទាក់ទងមកយើង" : "Contact Us"}
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "សៀវភៅណែនាំ" : "User Guide"}
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "សំណួរញឹកញាប់" : "FAQs"}
                </Link>
              </li>
              <li>
                <a href="mailto:support@sporthub.com.kh" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "រាយការណ៍បញ្ហា" : "Report a Problem"}
                </a>
              </li>
              <li>
                <a href="mailto:feedback@sporthub.com.kh" className="hover:text-[#16A34A] dark:hover:text-[#C6FE56] transition-colors">
                  {isKhmer ? "មតិស្ថាបនា" : "Feedback"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Supported & Organized by (ISTAD) */}
          <div className="space-y-0">
            <div className="h-7 flex items-center">
              <h4 className="font-bold text-sm sm:text-base text-[#12150D] dark:text-white tracking-tight whitespace-nowrap">
                {isKhmer ? "ឧបត្ថម្ភ និងរៀបចំដោយ" : "Supported & Organized by"}
              </h4>
            </div>
            <WavyUnderline />
            <div className="pt-1 space-y-2.5">
              {/* Clean Transparent Logo Link - No background box or border */}
              <a
                href="https://www.cstad.edu.kh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group transition-transform duration-200 hover:scale-[1.03]"
                title="Institute of Science and Technology Advanced Development (ISTAD)"
              >
                <img
                  src="/istad-logo.png"
                  alt="ISTAD Logo"
                  className="h-10 sm:h-11 lg:h-12 w-auto max-w-[210px] object-contain drop-shadow-sm"
                />
              </a>
              <p className="text-xs sm:text-[13px] text-[#616D54] dark:text-[#A2AF93] leading-relaxed max-w-xs font-normal">
                {isKhmer
                  ? "វិទ្យាស្ថាន វិទ្យាសាស្ត្រ និង បច្ចេកវិទ្យា ជឿនលឿន អភិវឌ្ឍន៍"
                  : "Institute of Science and Technology Advanced Development (ISTAD)"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Dotted Separator + Copyright + Legal Links) */}
        <div className="pt-6 border-t border-dashed border-[#CBD5BE] dark:border-[#2B3520] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-[13px] text-[#616D54] dark:text-[#8E9B7E]">
          <div>
            <span>@2026 Sporty. All rights reserved</span>
          </div>

          <div className="flex items-center gap-6 text-[#16A34A] dark:text-[#C6FE56] font-semibold text-xs sm:text-[13px]">
            <Link href="/about" className="hover:underline hover:text-[#15803D] dark:hover:text-[#D9FF70] transition-colors">
              {isKhmer ? "គោលការណ៍ភាពឯកជន" : "Privacy Policy"}
            </Link>
            <Link href="/about" className="hover:underline hover:text-[#15803D] dark:hover:text-[#D9FF70] transition-colors">
              {isKhmer ? "លក្ខខណ្ឌប្រើប្រាស់" : "Terms of Service"}
            </Link>
            <Link href="/about" className="hover:underline hover:text-[#15803D] dark:hover:text-[#D9FF70] transition-colors">
              {isKhmer ? "គោលការណ៍ខូគី" : "Cookie Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
