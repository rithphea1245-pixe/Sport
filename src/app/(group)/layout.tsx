import { AppSidebar } from "@/components/shadcn-space/blocks/sidebar-01/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

export default function DashboardGroup({ children }: { children: ReactNode }) {
  return (
    <section>
      <SidebarProvider>
        <AppSidebar />
        {/* ---------------- Main ---------------- */}
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 flex h-14 items-center border-b px-4">
            <SidebarTrigger className="cursor-pointer" />
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
}
