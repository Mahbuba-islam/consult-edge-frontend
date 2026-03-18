"use client"

import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  user: {
    name: string
    email: string
    role: string
    image?: string | null
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      {/* Left side */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
      </div>

      {/* Right side */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || <User />}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="capitalize">
            {user.role} Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}