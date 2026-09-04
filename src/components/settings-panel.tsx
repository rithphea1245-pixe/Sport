"use client";

import * as React from "react";
import { Bell, KeyRound, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SectionId = "general" | "security" | "notifications";

const SECTIONS: { id: SectionId; title: string; icon: typeof Settings2 }[] = [
  { id: "general", title: "General", icon: Settings2 },
  { id: "security", title: "Security", icon: KeyRound },
  { id: "notifications", title: "Notifications", icon: Bell },
];

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="w-full shrink-0 sm:w-40">
        <p className="text-sm text-foreground">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors cursor-pointer",
        checked ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-all",
          checked ? "left-[18px]" : "left-0.5",
        )}
      />
    </button>
  );
}

export function SettingsPanel() {
  const [active, setActive] = React.useState<SectionId>("general");
  const [notifications, setNotifications] = React.useState({
    orders: true,
    lowStock: true,
    weeklyDigest: false,
  });

  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      {/* Section nav — same active-state idiom as the sidebar */}
      <nav className="flex gap-1 md:flex-col">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActive(section.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 h-9 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <section.icon size={16} />
              {section.title}
            </button>
          );
        })}
      </nav>

      <Card className="gap-0 p-5">
        {active === "general" && (
          <>
            <p className="text-sm font-medium">General</p>
            <p className="text-sm text-muted-foreground">
              Workspace identity and defaults.
            </p>
            <div className="mt-2 divide-y">
              <FieldRow label="Workspace name">
                <Input defaultValue="My Workspace" />
              </FieldRow>
              <FieldRow
                label="Support email"
                hint="Shown to customers on invoices"
              >
                <Input defaultValue="support@example.com" type="email" />
              </FieldRow>
              <FieldRow label="Default currency">
                <Input defaultValue="USD" />
              </FieldRow>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </>
        )}

        {active === "security" && (
          <>
            <p className="text-sm font-medium">Security</p>
            <p className="text-sm text-muted-foreground">
              Update your password and account access.
            </p>
            <div className="mt-2 divide-y">
              <FieldRow label="New password">
                <Input type="password" placeholder="••••••••" />
              </FieldRow>
              <FieldRow label="Confirm password">
                <Input type="password" placeholder="••••••••" />
              </FieldRow>
              <FieldRow
                label="Two-factor authentication"
                hint="Require a code at sign-in"
              >
                <Toggle
                  checked={notifications.orders}
                  onChange={() =>
                    setNotifications((s) => ({ ...s, orders: !s.orders }))
                  }
                  label="Two-factor authentication"
                />
              </FieldRow>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Update password</Button>
            </div>
          </>
        )}

        {active === "notifications" && (
          <>
            <p className="text-sm font-medium">Notifications</p>
            <p className="text-sm text-muted-foreground">
              Choose what you want to hear about.
            </p>
            <div className="mt-2 divide-y">
              <FieldRow
                label="New orders"
                hint="Ping me when an order comes in"
              >
                <Toggle
                  checked={notifications.orders}
                  onChange={() =>
                    setNotifications((s) => ({ ...s, orders: !s.orders }))
                  }
                  label="New orders"
                />
              </FieldRow>
              <FieldRow
                label="Low stock alerts"
                hint="Below 10 units remaining"
              >
                <Toggle
                  checked={notifications.lowStock}
                  onChange={() =>
                    setNotifications((s) => ({ ...s, lowStock: !s.lowStock }))
                  }
                  label="Low stock alerts"
                />
              </FieldRow>
              <FieldRow label="Weekly digest" hint="Every Monday at 9am">
                <Toggle
                  checked={notifications.weeklyDigest}
                  onChange={() =>
                    setNotifications((s) => ({
                      ...s,
                      weeklyDigest: !s.weeklyDigest,
                    }))
                  }
                  label="Weekly digest"
                />
              </FieldRow>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button>Save preferences</Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
