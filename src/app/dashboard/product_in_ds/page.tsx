"use client";

import React, { useState } from "react";
import { Package, Search, PlusCircle, Trash2, Edit3, ArrowLeft, Trophy, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

interface SportsItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  condition: "Certified" | "In Use" | "Reserved";
  imageUrl: string;
}

export default function PageProductInDs() {
  const { isKhmer } = useLanguage();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<SportsItem[]>([
    {
      id: "item-1",
      name: "CPL 2026 Official Match Ball (FIFA Quality Pro)",
      category: "Football",
      stock: 45,
      condition: "Certified",
      imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: "item-2",
      name: "Kun Khmer Championship Pro 10oz Leather Gloves",
      category: "Martial Arts",
      stock: 60,
      condition: "Certified",
      imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: "item-3",
      name: "Angkor Heritage Half Marathon Official Finisher Medals",
      category: "Athletics",
      stock: 1200,
      condition: "Reserved",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
    },
  ]);

  const handleDelete = (id: string) => {
    if (!confirm(isKhmer ? "តើអ្នកប្រាកដជាចង់លុបទំនិញនេះឬ?" : "Are you sure you want to delete this equipment item?")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#12150D] text-white border border-[#222919] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge className="bg-[#C6FE56] text-[#12150D] font-black border-0 mb-2">
            <Package className="w-3.5 h-3.5 mr-1" />
            {isKhmer ? "សម្ភារៈកីឡាផ្លូវការ" : "Official Equipment & Inventory"}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isKhmer ? "ការគ្រប់គ្រងសម្ភារៈប្រកួត" : "Tournament Equipment Desk"}
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9B7E] mt-1">
            {isKhmer
              ? "គ្រប់គ្រងបាល់ប្រកួត ស្រោមដៃ និងមេដាយកិត្តិយសកីឡាជាតិ"
              : "Manage certified tournament balls, ring gear, and marathon finisher medals"}
          </p>
        </div>

        <Link href="/dashboard">
          <Button
            variant="outline"
            className="rounded-full border-[#2B3520] bg-[#1C2215] text-white hover:bg-[#252E1B] font-bold text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            {isKhmer ? "ត្រឡប់ទៅផ្ទាំងទិន្នន័យ" : "Back to Overview"}
          </Button>
        </Link>
      </div>

      {/* Main Inventory Card */}
      <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-[#12150D] dark:text-white">
              {isKhmer ? "បញ្ជីសម្ភារៈទាំងអស់" : "All Certified Items"} ({filtered.length})
            </h2>
            <p className="text-xs text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "ទិន្នន័យសម្ភារៈប្រកួតផ្លូវការ" : "Certified gear allocated to national competitions"}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isKhmer ? "ស្វែងរកសម្ភារៈ..." : "Search equipment..."}
              className="pl-10 rounded-full border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-xs h-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#EEF2E4] dark:border-[#222919] text-[#616D54] dark:text-[#8E9B7E] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Item / Image</th>
                <th className="py-3 px-3">Discipline</th>
                <th className="py-3 px-3">Allocated Stock</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E4] dark:divide-[#222919]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8F9F3]/60 dark:hover:bg-[#1C2215]/50 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-11 h-11 rounded-xl object-cover border border-[#E2E6D5] dark:border-[#26331B] shrink-0"
                      />
                      <span className="font-bold text-[#12150D] dark:text-white line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="bg-[#C6FE56] text-[#12150D] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#12150D] dark:text-white">
                    {item.stock} Units
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge className="bg-[#1C2215] text-[#C6FE56] border border-[#2B3520] text-[10px] font-bold">
                      {item.condition}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="h-8 px-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
