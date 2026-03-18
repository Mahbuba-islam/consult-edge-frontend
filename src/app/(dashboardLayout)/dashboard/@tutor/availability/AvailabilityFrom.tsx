"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { TimeSlotPicker } from "./TimeSlotsPicker";
import { setAvailabilityAction } from "@/src/app/actions/tutorDashboard.action";

export function AvailabilityForm() {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!date || timeSlots.length === 0) {
      toast.error("Please select a date and at least one time slot");
      return;
    }

    startTransition(async () => {
      const res = await setAvailabilityAction({
        date,
        timeSlots,
      });

      if (res?.success) {
        toast.success("Availability updated");
        setTimeSlots([]);
        setDate("");
      } else {
        toast.error(res?.message || "Failed to update availability");
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">Add New Availability</h2>

      {/* Date Picker */}
      <div>
        <label className="block font-medium mb-1">Select Date</label>
        <input
          type="date"
          className="border rounded-md p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Time Slot Picker */}
      <TimeSlotPicker selectedSlots={timeSlots} onChange={setTimeSlots} />

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isPending}
        className="w-full bg-primary text-white py-2 rounded-md font-semibold"
      >
        {isPending ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}