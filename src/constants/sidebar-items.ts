import {
  LayoutDashboard,
  Users,
  Star,
  Calendar,
  BarChart,
  UserCog,
} from "lucide-react";

export enum Roles {
  ADMIN = "ADMIN",
  EXPERT = "EXPERT",
  CLIENT = "CLIENT",
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  feature?: string;
}

export const sidebarItems: Record<Roles, SidebarItem[]> = {
  [Roles.ADMIN]: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart },
  ],

  [Roles.EXPERT]: [
    { label: "Dashboard", href: "/expert", icon: LayoutDashboard },
    { label: "My Schedule", href: "/expert/schedule", icon: Calendar },
    { label: "Testimonials", href: "/expert/testimonials", icon: Star },
    { label: "Analytics", href: "/expert/analytics", icon: BarChart },
  ],

  [Roles.CLIENT]: [
    { label: "Dashboard", href: "/client", icon: LayoutDashboard },
    { label: "My Bookings", href: "/client/bookings", icon: Calendar },
    { label: "My Testimonials", href: "/client/testimonials", icon: Star },
    { label: "Profile", href: "/client/profile", icon: UserCog },
  ],
};