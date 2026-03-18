"use client";

const HOURS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
];

export function TimeSlotPicker({
  selectedSlots,
  onChange
}: {
  selectedSlots: string[];
  onChange: (slots: string[]) => void;
}) {

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      onChange(selectedSlots.filter((s) => s !== slot));
    } else {
      onChange([...selectedSlots, slot]);
    }
  };

  return (
    <div>
      <label className="block font-medium mb-2">Select Time Slots</label>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {HOURS.map((slot) => {
          const active = selectedSlots.includes(slot);

          return (
            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              className={`border rounded-md py-2 text-center transition
                ${active ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}