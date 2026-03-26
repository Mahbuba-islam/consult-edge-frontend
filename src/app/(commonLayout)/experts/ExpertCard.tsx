"use client";

import Image from "next/image";
import Link from "next/link";

export interface TutorCardUser {
  name: string;
  image?: string | null;
}

export interface TutorCardCategory {
  name: string;
}

export interface TutorCardItem {
  id: string;
  bio: string;
  price: number;
  rating: number;
  totalReviews: number;
  subject: string[];
  category: TutorCardCategory | null;
  user: TutorCardUser | null;
}

interface TutorsCardProps {
  tutors: TutorCardItem[];
  selectedCategory: string;
}

export function TutorsCard({ tutors, selectedCategory }: TutorsCardProps) {
  if (!tutors || tutors.length === 0) {
    return (
      <div className="flex flex-col items-center text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#5624D0] to-[#b00ea5] flex items-center justify-center shadow-lg mb-4">
          <span className="text-white text-3xl">🎓</span>
        </div>

        <h3 className="text-2xl font-extrabold bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
          No Tutors Found
        </h3>

        <p className="text-gray-600 mt-2 text-lg font-medium">
          We couldn’t find any tutors in
          <span className="font-bold text-[#5624D0]"> {selectedCategory}</span>.
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Try exploring another category or browse all tutors.
        </p>

        <Link
          href="/"
          className="mt-5 inline-block px-6 py-2 rounded-full text-white font-semibold bg-linear-to-r from-[#5624D0] to-[#b00ea5] shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          Try Another Category
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tutors.map((tutor) => (
        <div
          key={tutor.id}
          className="px-5 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
            <Image
              src={
                tutor.user?.image && tutor.user.image.trim() !== ""
                  ? tutor.user.image
                  : "https://i.ibb.co/xS7Y9FN0/a-colorful-modern-av.png"
              }
              alt={tutor.user?.name || "Tutor"}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>

          <div>
            <p className="text-base font-semibold text-gray-900 leading-tight mt-2">
              {tutor.user?.name ?? "Unknown"}
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              {tutor.category?.name}
            </p>

            <p className="mt-2 text-gray-700 text-xs line-clamp-2 leading-relaxed">
              {tutor.bio}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 px-2">
              {tutor.subject?.map((sub) => (
                <span
                  key={sub}
                  className="px-2 py-0.5 bg-[#f3e8ff] text-[#5624D0] font-medium rounded-full text-[10px] shadow-xs"
                >
                  {sub}
                </span>
              ))}
            </div>

            <Link
              href={`/tutorDetails/${tutor.id}`}
              className="block w-full text-center py-2 mt-5 rounded-md font-semibold text-white bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-xs shadow hover:opacity-90 transition"
            >
              See Details for Booking
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}