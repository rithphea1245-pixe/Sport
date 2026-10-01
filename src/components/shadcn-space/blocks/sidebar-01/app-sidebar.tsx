"use client";

import React from "react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/assets/logo/logo";
import { NavItem, NavMain } from "@/components/shadcn-space/blocks/sidebar-01/nav-main";
import { AlignStartVertical, PieChart, ClipboardList, Table, Ticket, Zap, Mail, ShieldCheck } from "lucide-react";

export const navData: NavItem[] = [
  { label: "SportHub Admin", isSection: true },
  { title: "Overview & Analytics", icon: PieChart, href: "/dashboard" },
  { title: "Manage Sports", icon: Table, href: "/dashboard#sports-table" },
  { title: "Manage Venues", icon: ClipboardList, href: "/dashboard#events-table" },
  { title: "Disciplines", icon: AlignStartVertical, href: "/dashboard#categories-section" },
  { title: "Fan Inquiries", icon: Mail, href: "/dashboard/contact" },
  { label: "Public Platform", isSection: true },
  { title: "Return to Main Site", icon: Ticket, href: "/" },
];

export function AppSidebar() {
  return (
    <Sidebar className="px-0 h-full [&_[data-slot=sidebar-inner]]:h-full bg-[#12150D] text-white border-r border-[#222919]">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <SidebarHeader className="px-4 pt-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/" className="w-full h-full block">
                <Logo />
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="px-4">
              <NavMain items={navData} />
            </div>

            {/* Quick Info & ISTAD Partner Box */}
            <div className="pt-6 px-4 space-y-3 pb-8">
              <div className="rounded-2xl p-4 bg-[#1C2215] border border-[#2B3520] text-center shadow-md">
                <div className="w-8 h-8 rounded-full bg-[#C6FE56] text-[#12150D] flex items-center justify-center mx-auto mb-2 font-bold shadow-xs">
                  <Zap className="w-4 h-4" />
                </div>
                <p className="text-xs font-black text-white">Live Sports API</p>
                <p className="text-[11px] text-[#8E9B7E] mt-0.5 font-medium">
                  100% Synchronized
                </p>
              </div>

              {/* ISTAD Academic Partner Branding in Sidebar */}
              <a
                href="https://www.cstad.edu.kh"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-2xl bg-[#171E12] border border-[#263519] hover:border-[#C6FE56] transition-all text-center group"
                title="Institute of Science and Technology Advanced Development (ISTAD)"
              >
                <img
                  src="/istad-logo.png"
                  alt="ISTAD"
                  className="h-8 w-auto mx-auto object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform"
                />
                <p className="text-[10px] text-[#8E9B7E] mt-1 font-bold">
                  ISTAD Academic Partner
                </p>
              </a>
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
