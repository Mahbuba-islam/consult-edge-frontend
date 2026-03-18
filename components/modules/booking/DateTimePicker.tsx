"use client"

import { useState } from "react"

export function DateTimePicker({ onChange }: { onChange: (v: { date: string; time: string }) => void }) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const update = (field: "date" | "time", value: string) => {
    if (field === "date") setDate(value)
    else setTime(value)

    const d = field === "date" ? value : date
    const t = field === "time" ? value : time

    if (d && t) onChange({ date: d, time: t })
  }

  return (
    <div className="flex gap-3">
      <input
        type="date"
        className="border border-gray-300 rounded px-3 py-2 text-sm"
        value={date}
        onChange={(e) => update("date", e.target.value)}
      />
      <input
        type="time"
        className="border border-gray-300 rounded px-3 py-2 text-sm"
        value={time}
        onChange={(e) => update("time", e.target.value)}
      />
    </div>
  )
}