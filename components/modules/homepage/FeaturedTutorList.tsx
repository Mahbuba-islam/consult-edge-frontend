"use client";

import TutorCard from "./tutorCard";
import { Tutor } from "@/src/types/expert.types";

export default function FeaturedTutorList({ tutors }: { tutors: Tutor[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor) => (
        <div key={tutor.id} className="relative">

          {tutor.isFeatured && (
            <span className="absolute top-3 right-3 z-10 px-3 py-1 text-xs font-semibold 
              bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white rounded-full shadow">
              Featured
            </span>
          )}

          <TutorCard
            id={tutor.id}
            bio={tutor.bio}
            categoryName={tutor.category?.name ?? ""}
            subject={tutor.subject}
            price={tutor.price}
            rating={tutor.rating}
            totalReviews={tutor.totalReviews}
            user={tutor.user}
            onDetailsClick={(id) => console.log("Clicked tutor:", id)}
          />
        </div>
      ))}
    </div>
  );
}