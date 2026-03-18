"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";
import ErrorModal from "./ErrorModal";
import {
  completeBookingAction,
  leaveReviewAction,
} from "@/src/app/actions/userDashboard.action";
import Link from "next/link";
import { DeleteBooking } from "./DeleteBooking";

// ----------------------
// TYPES
// ----------------------

interface BookingUser {
  name: string;
  email: string;
}

interface BookingTutor {
  id: string;
  user: BookingUser | null;
}

export interface BookingItem {
  id: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  status: string;
  tutor: BookingTutor;
}

interface BookSessionUiProps {
  upcoming: BookingItem[];
  past: BookingItem[];
}

// ----------------------
// COMPONENT
// ----------------------

export default function BookSessionUi({ upcoming, past }: BookSessionUiProps) {
  const [pastList, setPastList] = useState<BookingItem[]>(past);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  // COMPLETE BUTTON
  const handleComplete = async (bookingId: string) => {
    const res = await completeBookingAction(bookingId);

    if (!res?.data?.success) {
      setErrorOpen(true);
      return;
    }

    // Update UI instantly
    setPastList((prev) =>
      prev.map((item) =>
        item.id === bookingId ? { ...item, status: "COMPLETED" } : item
      )
    );

    setSelectedBooking(bookingId);
    setReviewOpen(true);
  };

  // REVIEW SUBMIT
  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!selectedBooking) return;

    const res = await leaveReviewAction({
      bookingId: selectedBooking,
      rating,
      comment,
    });

    if (!res?.data?.success) {
      setErrorOpen(true);
      return;
    }

    setReviewOpen(false);
  };

  return (
    <div className="space-y-12">
      {/* UPCOMING BOOKINGS */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Sessions
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming sessions.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((b) => (
              <div
                key={b.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    {new Date(b.date).toLocaleDateString()}
                  </p>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    {b.status}
                  </span>
                </div>

                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {b.startTime} – {b.endTime}
                </p>

                {/* Tutor Info */}
                <div className="mt-4 flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#f3e8ff] to-[#ffe6fa] flex items-center justify-center text-[#5624D0] font-bold text-lg shadow">
                    {b.tutor?.user?.name?.charAt(0)}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                      This Session With
                    </p>

                    <p className="text-base font-semibold text-gray-900">
                      {b.tutor?.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {b.tutor?.user?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Link href={`/tutorDetails/${b.tutor.id}`}>
                    <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                      View Details
                    </button>
                  </Link>

                  <DeleteBooking bookingId={b.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PAST BOOKINGS */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Past Sessions
        </h2>

        {pastList.length === 0 ? (
          <p className="text-gray-500 text-sm">No past sessions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastList.map((b) => (
              <div
                key={b.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-600 text-sm">
                  {new Date(b.date).toLocaleDateString()}
                </p>

                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {b.startTime} – {b.endTime}
                </p>

                {/* Tutor Info */}
                <div className="mt-4 flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#f3e8ff] to-[#ffe6fa] flex items-center justify-center text-[#5624D0] font-bold text-lg shadow">
                    {b.tutor?.user?.name?.charAt(0)}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
                      This Session With
                    </p>

                    <p className="text-base font-semibold text-gray-900">
                      {b.tutor?.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {b.tutor?.user?.email}
                    </p>
                  </div>
                </div>

                {b.status === "COMPLETED" ? (
                  <button
                    disabled
                    className="mt-6 w-full bg-violet-900 text-white py-2 rounded-lg cursor-default"
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    onClick={() => handleComplete(b.id)}
                    className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Review Modal */}
      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={handleReviewSubmit}
      />

      {/* Error Modal */}
      <ErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message="Something went wrong"
      />
    </div>
  );
}