"use client"

import { useState } from "react"
import { DateTimePicker } from "./DateTimePicker"
import { AvailabilityCalendar } from "./AvailabilityCalendar"
import { createBooking } from "@/src/services/bookings.services"

export function BookingModal({ tutorId, open, onClose }: {
  tutorId: string
  open: boolean
  onClose: () => void
}) {
  const [dateTime, setDateTime] = useState<{ date: string; time: string } | null>(null)
  const [success, setSuccess] = useState(false)

  const handleConfirm = async () => {
    if (!dateTime) return

    const res = await createBooking({
      tutorId,
      date: dateTime.date,
      startTime: dateTime.time,
    })

    if (res.success) {
      setSuccess(true)
      setTimeout(onClose, 1500)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Book a Session</h2>

        <DateTimePicker onChange={setDateTime} />

        {dateTime?.date && (
          <AvailabilityCalendar
            tutorId={tutorId}
            date={dateTime.date}
            onSelect={(time) => setDateTime({ date: dateTime.date, time })}
          />
        )}

        {success && (
          <p className="text-sm text-green-600">Booking created successfully!</p>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!dateTime}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}