"use server";

import { revalidateTag } from "next/cache";
import {
 
  createTutorProfile,
  getAvailability,
  getRatingsAndReviews,
  getSessions,
  getTutorProfile,
  setAvailability,
  TutorProfileData,
  updateTutorProfile,
} from "@/src/services/tutorDashboard.services";




export const createTutorProfileAction = async (data:TutorProfileData) => {
  // Convert frontend fields to match Prisma model
  const payload = {
    bio: data.bio,
    price: data.price,
    categoryId: data.categoryId,
    subject: data.subject,
    image:null   
  };

  const res = await createTutorProfile(payload);

  revalidateTag("tutor-profile", "page");

  return res;
};







// -----------------------------
// GET TUTOR PROFILE
// -----------------------------
export const getTutorProfileAction = async () => {
  return await getTutorProfile();
};

// -----------------------------
// UPDATE TUTOR PROFILE
// -----------------------------
export const updateTutorProfileAction = async (data: TutorProfileData) => {
  const res = await updateTutorProfile(data);

  revalidateTag("tutor-profile", "page");

  return res;
};



// GET TUTOR AVAILABILITY
export const getTutorAvailabilityAction = async () => {
  const res = await getAvailability();
  return res;
};






// -----------------------------
// SET AVAILABILITY SLOTS
// -----------------------------
export const setAvailabilityAction = async (slots: {
  date: string;
  timeSlots: string[];
}) => {
  const res = await setAvailability(slots);

  revalidateTag("tutor-availability", "page");

  return res;
};

// -----------------------------
// GET TEACHING SESSIONS
// -----------------------------
export const getTeachingSessionsAction = async () => {
  return await getSessions();
};

// -----------------------------
// GET RATINGS & REVIEWS
// -----------------------------
export const getRatingsAndReviewsAction = async () => {
  return await getRatingsAndReviews();
};