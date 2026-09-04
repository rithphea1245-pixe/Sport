import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  role: string;
  timezone: string;
  avatar: string;
  joined: string;
  stats: { label: string; value: string }[];
}

const CURRENT_USER: UserProfileData = {
  name: "Jordan Lee",
  email: "jordan.lee@example.com",
  phone: "+1 (555) 013-4482",
  role: "Admin",
  timezone: "GMT+7 — Phnom Penh",
  avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Jordan+Lee",
  joined: "Jan 2025",
  stats: [
    { label: "Products managed", value: "128" },
    { label: "Orders reviewed", value: "942" },
    { label: "Avg. response", value: "3.2h" },
  ],
};

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-6">
      <span className="w-full shrink-0 text-sm text-muted-foreground sm:w-36">
        {label}
      </span>
      <div className="w-full">{children}</div>
    </div>
  );
}

export function UserProfile() {
  const user = CURRENT_USER;

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      {/* Identity panel */}
      <Card className="h-fit gap-0 p-5">
        <img
          src={user.avatar}
          alt={user.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-xl ring-1 ring-foreground/10"
        />
        <div className="mt-4">
          <p className="text-base font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Badge variant="secondary" className="mt-3 w-fit">
          {user.role}
        </Badge>

        <Separator className="my-4" />

        <dl className="flex flex-col gap-3">
          {user.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline justify-between"
            >
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-sm font-medium">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Editable details */}
      <Card className="gap-0 p-5">
        <p className="text-sm font-medium">Profile</p>
        <div className="divide-y">
          <FieldRow label="Full name">
            <Input defaultValue={user.name} />
          </FieldRow>
          <FieldRow label="Email">
            <Input defaultValue={user.email} type="email" />
          </FieldRow>
          <FieldRow label="Phone">
            <Input defaultValue={user.phone} type="tel" />
          </FieldRow>
          <FieldRow label="Timezone">
            <Input defaultValue={user.timezone} />
          </FieldRow>
          <FieldRow label="Member since">
            <span className="flex h-8 items-center text-sm text-muted-foreground">
              {user.joined}
            </span>
          </FieldRow>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </Card>
    </div>
  );
}
