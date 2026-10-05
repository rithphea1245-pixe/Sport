"use client";

import React from "react";
import { SportCategory } from "@/types/sport";
import { Layers } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface CategoryTabsProps {
  categories: SportCategory[];
  selectedCategory: string;
  onSelectCategory: (name: string) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const { t, isKhmer } = useLanguage();

  // Deduplicate category names
  const categoryNames = Array.from(
    new Set(
      categories
        .map((c) => c.name?.trim())
        .filter((name): name is string => Boolean(name && name.length > 0))
    )
  );

  return (
    <div id="categories" className="mb-10 font-sans">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#C6FE56] flex items-center justify-center text-[#12150D]">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#616D54]">
            {isKhmer ? "តម្រងតាមប្រភេទកីឡា" : "Filter by Sport Discipline"}
          </h2>
        </div>
        <span className="text-xs text-[#8E9B7E] font-medium hidden sm:inline">
          {categoryNames.length} {isKhmer ? "ប្រភេទកីឡាមានក្នុងប្រព័ន្ធ" : "disciplines available"}
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2.5 pt-0.5 scrollbar-none overscroll-x-contain touch-pan-x px-0.5">
        <button
          onClick={() => onSelectCategory("ALL")}
          className={`h-9 px-4 sm:px-5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center shrink-0 ${
            selectedCategory === "ALL"
              ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-md shadow-[#12150D]/10"
              : "bg-white dark:bg-[#151B10] text-[#616D54] dark:text-[#CBD5BE] border border-[#E2E6D5] dark:border-[#26331B] hover:border-[#12150D] dark:hover:border-[#C6FE56] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
          }`}
        >
          ⚡ {t("cat.all", "All Sports")}
        </button>

        {categoryNames.map((name) => {
          const isSelected = selectedCategory.toLowerCase() === name.toLowerCase();
          return (
            <button
              key={name}
              onClick={() => onSelectCategory(name)}
              className={`h-9 px-4 sm:px-5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center shrink-0 ${
                isSelected
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] shadow-md shadow-[#12150D]/10"
                  : "bg-white dark:bg-[#151B10] text-[#616D54] dark:text-[#CBD5BE] border border-[#E2E6D5] dark:border-[#26331B] hover:border-[#12150D] dark:hover:border-[#C6FE56] hover:text-[#12150D] dark:hover:text-[#C6FE56]"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
