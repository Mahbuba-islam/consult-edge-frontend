"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Star } from "lucide-react";
import { useState } from "react";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewModal({
  open,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(rating, comment);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl 
          w-full max-w-sm space-y-4 shadow-lg"
        >
          {/* Hidden Title for accessibility */}
          <VisuallyHidden>
            <Dialog.Title>Leave a Review</Dialog.Title>
          </VisuallyHidden>

          <h2 className="text-xl font-semibold">Leave a Review</h2>

          {/* Stars */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                onClick={() => setRating(s)}
                className={`w-7 h-7 cursor-pointer ${
                  rating >= s
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Comment */}
          <textarea
            className="w-full border rounded-md p-2"
            rows={3}
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Submit Review
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}