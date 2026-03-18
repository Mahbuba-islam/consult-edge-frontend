export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  MessageSquare,
  User,
  BookOpen,
  Users,
  LayoutDashboard,
} from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-7 h-7 text-primary" />
          Student Dashboard
        </h1>
      </div>

      {/* Grid Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Browse Tutors */}
        <Link href="/tutors">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Browse Tutors</h2>
                <p className="text-sm text-gray-500">Find the perfect tutor</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Book a Session */}
        <Link href="/">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Book a Session</h2>
                <p className="text-sm text-gray-500">Schedule a tutoring session</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Upcoming Sessions */}
        <Link href="/dashboard/bookSession">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <CalendarCheck className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
                <p className="text-sm text-gray-500">View your scheduled sessions</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Past Sessions */}
        <Link href="/dashboard/bookSession">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Past Sessions</h2>
                <p className="text-sm text-gray-500">See your completed sessions</p>
              </div>
            </div>
          </div>
        </Link>

        {/* My Reviews */}
        <Link href="/dashboard/bookSession">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <MessageSquare className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Leave Reviews</h2>
                <p className="text-sm text-gray-500">Share your feedback</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Profile */}
        <Link href="/dashboard/manageProfile">
          <div className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <User className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              <div>
                <h2 className="text-lg font-semibold">Manage your profile</h2>
                <p className="text-sm text-gray-500">Update and delete</p>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}