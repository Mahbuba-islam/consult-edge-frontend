export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from "next/link"

import {
  UserCog,
  CalendarCheck,
  BookOpen,
  Star,
  LayoutDashboard
} from "lucide-react"

export default function TutorDashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-primary" />
          Tutor Dashboard
        </h1>
      </div>

     
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Create / Update Tutor Profile */}
        <Link href="/dashboard/profile">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <UserCog className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Tutor Profile</h2>
                <p className="text-sm text-gray-500">Create or update your profile</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Set Availability Slots */}
        <Link href="/dashboard/availability">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <CalendarCheck className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Availability</h2>
                <p className="text-sm text-gray-500">Set your available time slots</p>
              </div>
            </div>
          </div>
        </Link>

        {/* View Teaching Sessions */}
        <Link href="/dashboard/sessions">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Teaching Sessions</h2>
                <p className="text-sm text-gray-500">View all your sessions</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Ratings & Reviews */}
        <Link href="/dashboard/reviews">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <Star className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
                <p className="text-sm text-gray-500">See student feedback</p>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}