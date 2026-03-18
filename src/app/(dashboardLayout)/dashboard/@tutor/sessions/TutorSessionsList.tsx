"use client";

import { BookingWithStudent } from "@/src/types/BookingWithStudent";


type Props = {
  items: BookingWithStudent[];
};

export function TutorSessionsList({ items }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-500">
        No sessions scheduled yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ml-5">
      {items.map((session) => (
        <div
          key={session.id}
          className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3"
        >
          {/* Date + Time */}
          <div>
            <p className="font-semibold text-gray-800">
              {new Date(session.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              {session.startTime} - {session.endTime}
            </p>
          </div>

          {/* Student Info */}
          <div className="text-sm">
            <p className="font-medium text-gray-800">
              Student: {session.student?.name || "Unknown"}
            </p>
            <p className="text-gray-500">{session.student?.email}</p>
          </div>

          {/* Status Badge */}
          <span
            className={`text-xs px-2 py-1 rounded-full w-fit ${
              session.status === "CONFIRMED"
                ? "bg-emerald-100 text-emerald-700"
                : session.status === "COMPLETED"
                ? "bg-blue-100 text-blue-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {session.status}
          </span>
        </div>
      ))}
    </div>
  );
}