import {  LayoutDashboard, BookOpen, FolderPlus, Users, UserCog, Clock, Star, UserPlus, CalendarCheck } from "lucide-react"
import { Roles } from "@/src/constants/roles"

import type { FeatureKey } from "@/src/constants/features";

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  feature?: FeatureKey; // ⭐ critical
}


export const sidebarItems: Record<Roles, SidebarItem[]> = {
  
  [Roles.ADMIN]: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: BookOpen },
  { label: "Create category", href: "/dashboard/categories/createCategories", icon: FolderPlus },
  { label: "Manage category", href: "/dashboard/categories", icon: FolderPlus },
  { label: "All Users", href: "/dashboard/users", icon: Users },
  { label: "Manage Users", href: "/dashboard/manageUsers", icon: UserCog },

  ],

  [Roles.TUTOR]: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      feature: "PROFILE"
    },
    {
      label: "My Sessions",
      href: "/dashboard/sessions",
      icon: CalendarCheck,
      feature: "SESSIONS"
    },
    {
      label: "Create & Update Profile",
      href: "/dashboard/profile",
      icon: UserPlus,
      feature: "PROFILE"
    },

   
    {
      label: "Set Availability",
      href: "/dashboard/availability",
      icon: Clock,
      feature: "AVAILABILITY"
    },
    {
      label: "Ratings & Reviews",
      href: "/dashboard/reviews",
      icon: Star,
      feature: "REVIEWS"
    }



  ],

  [Roles.STUDENT]: [
     {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      feature: "PROFILE"
    },
    {
      label: "Your Bookings",
      href: "/dashboard/bookSession",
      icon: BookOpen,
      feature: "BOOKING"
    },
    {
      label: "Book Session",
      href: "/tutors",
      icon: Star,
      feature: "REVIEWS"
    },
    {
      label: "Manage Profile",
      href: "/dashboard/manageProfile",
      icon: UserCog,
      feature: "PROFILE"
    }

  ],
}