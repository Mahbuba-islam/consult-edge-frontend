"use client"


import { Booking } from "@/src/types/booking.types"

export function TutorBookingList({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="p-4 border rounded bg-white shadow-sm flex justify-between">
          <div>
            <h3 className="font-semibold">{b.student.name}</h3>
            <p className="text-sm text-gray-600">
              {new Date(b.date).toDateString()} at {b.startTime}
            </p>
          </div>

         
        </div>
      ))}
    </div>
  )
}