"use client"

import { getSlots } from "@/src/services/bookingAvailavility.services"
import { useEffect, useState } from "react"

export function AvailabilityCalendar({ tutorId, date, onSelect }: {
  tutorId: string
  date: string
  onSelect: (time: string) => void
}) {
  const [slots, setSlots] = useState<string[]>([])

  useEffect(() => {
    if (!date) return
    ;(async () => {
      const res = await getSlots({ tutorId, date })
      setSlots(res?.slots || [])
    })()
  }, [date, tutorId])

  if (!date) return null

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {slots.length === 0 && (
        <p className="text-sm text-gray-500">No available slots for this date.</p>
      )}

      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-gray-50 hover:bg-purple-100"
        >
          {slot}
        </button>
      ))}
    </div>
  )
}