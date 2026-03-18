"use client";

import { ReviewWithStudent } from "@/src/types/review.types";

type Props = {
  items: ReviewWithStudent[];
};

export function ReviewsList({ items }: Props) {
  console.log("Review data", items);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-lg font-semibold text-gray-800">
                {review.rating}
              </span>
            </div>

            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Comment */}
          <p className="text-gray-700 mt-4 leading-relaxed">
            {review.comment || "No comment provided."}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-4" />

          {/* Student Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
              {review.student.name?.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">
                {review.student.name}
              </p>
              <p className="text-xs text-gray-500">{review.student.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}