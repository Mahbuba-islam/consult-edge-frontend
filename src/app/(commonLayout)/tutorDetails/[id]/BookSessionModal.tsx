"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { bookSessionAction } from "@/src/app/actions/userDashboard.action";

interface BookSessionModalProps {
  tutorId: string;
  tutorName: string;
}

interface BookingResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export default function BookSessionModal({
  tutorId,
  tutorName,
}: BookSessionModalProps) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const router = useRouter();

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBooking = async () => {
    if (!date || !slot) return;

    const res = (await bookSessionAction({
      tutorId,
      date,
      startTime: slot,
      endTime: slot,
    })) as BookingResponse;

    if (!res?.success) {
      setErrorMessage(res?.message || "Maybe you already booked this session");
      setErrorOpen(true);
      return;
    }

    setOpen(false);
    setSuccessOpen(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-purple-600 text-white px-5 py-2 font-semibold hover:bg-purple-700 transition"
      >
        Book Now
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold">
              Book Session with {tutorName}
            </h2>

            <div>
              <label className="text-sm font-medium">Select Date</label>
              <input
                type="date"
                className="w-full border p-2 rounded mt-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {date && (
              <div>
                <label className="text-sm font-medium">Select Time Slot</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      className={`p-2 rounded border ${
                        slot === t
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={handleBooking}
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onDashboard={() => router.push("/dashboard/bookSession")}
        onHome={() => router.push("/")}
      />

      <ErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMessage}
      />
    </>
  );
}