import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User } from "@/src/types/user.types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader({ user }: { user: User }) {
  return (
    <header className="p-3 mt-2 flex h-(--header-height) shrink-0 items-center 
      bg-white dark:bg-neutral-900 shadow-sm px-4 lg:px-6">

      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-2 h-5" />

        <h1 className="text-base font-semibold tracking-tight">
          Documents
        </h1>

        <div className="ml-auto flex items-center gap-3">

          {/* User Info */}
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-sm font-medium">
              {user?.name ?? "Unknown User"}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.email ?? "No email"}
            </span>
          </div>

          {/* Role Badge */}
          <Badge 
            variant="secondary"
            className="bg-orange-500/10 text-orange-600 border border-orange-300 text-xs"
          >
            {user?.role ?? "No role"}
          </Badge>

          {/* Avatar */}
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>
              {user?.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}