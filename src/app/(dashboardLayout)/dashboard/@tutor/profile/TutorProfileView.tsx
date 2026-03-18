"use client";

import { useState } from "react";
import { TutorProfileForm } from "./TutorProfileForm";
import { TutorProfile } from "@/src/types/expert.types";
import { Category } from "@/src/types/category.types";

interface TutorProfileViewProps {
  profile: TutorProfile;
  categories: Category[];
}

export function TutorProfileView({ profile, categories }: TutorProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  // ⭐ Normalize subjects safely
  const subjectsString = Array.isArray(profile.subject)
    ? profile.subject.join(", ")
    : profile.subject || "";

  if (isEditing) {
    return (
      <TutorProfileForm
        categories={{ data: categories }}
        defaultValues={{
          bio: profile.bio ?? "",
          price: profile.price ?? 0,
          categoryId: profile.categoryId,
          subject: subjectsString, // ⭐ FIXED
          isFeatured: profile.isFeatured ?? false,
        }}
        isUpdate
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow">
      <p><strong>Name:</strong> {profile.user?.name}</p>
      <p><strong>Email:</strong> {profile.user?.email}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Price:</strong> ${profile.price}</p>
      <p><strong>Category:</strong> {profile.category?.name}</p>

      
      <p><strong>Subjects:</strong> {subjectsString}</p>

      <button
        onClick={() => setIsEditing(true)}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Update Profile
      </button>
    </div>
  );
}