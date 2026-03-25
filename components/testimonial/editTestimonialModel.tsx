"use client";

import { useState } from "react";

export function EditTestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: any;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(testimonial.rating);
  const [comment, setComment] = useState(testimonial.comment || "");

  const { mutate, isPending } = useUpdateTestimonial();

  const handleUpdate = () => {
    mutate(
      {
        id: testimonial.id,
        payload: { rating, comment },
      },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Edit Testimonial</h3>

        <label className="block mb-2">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
          rows={4}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleUpdate}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}