export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from "next/link"

import {
  Users,
  UserCog,
  BookOpen,
  FolderKanban,
  LayoutDashboard
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-primary" />
          Admin Dashboard
        </h1>
      </div>

      {/* Grid Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        <Link href="/dashboard/users">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">View All Users</h2>
                <p className="text-sm text-gray-500">See every registered user</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/manageUsers">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <UserCog className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Manage Users</h2>
                <p className="text-sm text-gray-500">Ban, unban, update status</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/bookings">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">View Bookings</h2>
                <p className="text-sm text-gray-500">All platform bookings</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/categories">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <FolderKanban className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Manage Categories</h2>
                <p className="text-sm text-gray-500"> Edit and delete categories</p>
              </div>
            </div>
          </div>
        </Link>
       

      </div>
    </div>
  )
}