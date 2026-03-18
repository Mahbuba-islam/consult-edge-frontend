

import Image from "next/image";

import BookSessionModal from "./BookSessionModal";
import {  ReviewWithStudent } from "@/src/types/review.types";
import { getTutorById } from "@/src/services/expert.services";

export default async function TutorDetails({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data } = await getTutorById(id);

  if (!data.data) {
    return <div className="text-center py-20 text-gray-500">Tutor not found</div>;
  }

  const tutor = data.data;

  // CLEAN SUBJECTS
  const cleanedSubjects = tutor.subject
    ?.map((s: string) => s.trim().replace(/(^,)|(,$)|["“”]/g, ""))
    
    .filter((s: string) => s.length > 0);

  return (
    <section className="max-w-5xl mx-auto py-10 space-y-10 px-4">

      {/* HEADER */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col md:flex-row gap-8 items-center md:items-start">

        {/* IMAGE */}
        <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-md bg-gray-100">
          <Image
            src={
              tutor.user?.image && tutor.user.image.trim() !== ""
                ? tutor.user.image
                : "https://i.ibb.co/xS7Y9FN0/a-colorful-modern-av.png"
            }
            alt={tutor.user?.name || "Tutor"}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        {/* INFO */}
        <div className="flex-1 space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {tutor.user?.name}
          </h1>

          <p className="text-sm text-gray-600">
            {tutor.category?.name} • {cleanedSubjects.join(", ")}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-yellow-500 text-lg">
              {tutor.rating?.toFixed(1)}
            </span>
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-gray-600">
              ({tutor.totalReviews} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold text-[#5624D0]">
            ${tutor.price} / hour
          </div>
        </div>
      </div>

      {/* BIO */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">About the Tutor</h2>
        <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
      </div>

      {/* SUBJECTS */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Subjects</h2>

        <div className="flex flex-wrap gap-3">
          {cleanedSubjects.map((sub: string) => (
            <span
              key={sub}
              className="px-4 py-1.5 text-sm bg-linear-to-r from-[#f3e8ff] to-[#ffe6fa]
              text-gray-800 border border-gray-200 rounded-full shadow-sm animate-fadeIn"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6">

        {/* SMART HEADING */}
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
            What Students Are Saying
          </h2>
          <p className="text-sm text-gray-500">Real feedback from verified learners.</p>
        </div>

        {tutor.reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutor.reviews.map((review: ReviewWithStudent) => (
              <div
                key={review.id}
                className="p-5 rounded-xl border border-gray-200 shadow-sm 
                bg-linear-to-br from-[#ffffff] to-[#f9f5ff]
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeIn"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">{review.student?.name}</h4>
                  <span className="text-yellow-500 font-bold">{review.rating} ★</span>
                </div>

                {/* Email */}
                <p className="text-xs text-gray-500">{review.student?.email}</p>

                {/* Comment */}
                <p className="text-gray-700 text-sm mt-3 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>

      {/* CTA */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ready to book a session?</h3>
          <p className="text-sm text-gray-500">Choose a date and time to book your lesson.</p>
        </div>

        <BookSessionModal tutorId={tutor.id} tutorName={tutor.user?.name} />
      </div>

    </section>
  );
}