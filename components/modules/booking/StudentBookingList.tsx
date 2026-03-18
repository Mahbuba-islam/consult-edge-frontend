import { Booking } from "@/src/types/booking.types";

export function StudentBookingList({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="p-4 border rounded bg-white shadow-sm">
          <h3 className="font-semibold">{b.tutor.user.name}</h3>
          <p className="text-sm text-gray-600">
            {new Date(b.date).toDateString()} at {b.startTime}
          </p>
          <p className="text-sm">Status: {b.status}</p>
        </div>
      ))}
    </div>
  )
}