"use client";

interface AvailabilitySlot {
  id: string;
  date: string | Date;
  timeSlots: string[];
}

interface AvailabilityListProps {
  items: AvailabilitySlot[];
}

export function AvailabilityList({ items }: AvailabilityListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-500">
        No availability added yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">Your Availability</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((slot) => (
          <div
            key={slot.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <p className="font-semibold text-gray-800">
              {new Date(slot.date).toDateString()}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {slot.timeSlots.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}