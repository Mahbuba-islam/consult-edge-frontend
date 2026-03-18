"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"

import { Roles } from "@/src/constants/roles"
import Link from "next/link"
import { sidebarItems } from "../src/constants/sidebar-items"

interface AppSidebarProps {
  user: {
    name: string
    email: string
    role: Roles
    image?: string | null
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  console.log('sidebar props', user);
  if (!user) {
    return null
  }


  const items = sidebarItems[user.role]
console.log('app-sidebar user',user);
  return (
    <Sidebar collapsible="offcanvas">
     <SidebarHeader>
  <Link href="/">
    <div className="px-4 py-3 text-xl font-semibold cursor-pointer">
      MentorHub
    </div>
  </Link>

  <Link href="/" className="px-4">
    <p className="text-xs text-gray-500 hover:text-gray-700 transition">
      Back to home page
    </p>
  </Link>
</SidebarHeader>


      <SidebarContent>
        <nav className="space-y-1 px-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}