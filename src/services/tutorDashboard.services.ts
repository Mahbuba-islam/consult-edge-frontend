// 



"use server";

import { cookies } from "next/headers";

export interface TutorProfileData {
  bio: string;
  price: number;
  categoryId: string;
  subject: string[];
  experience?: string;
  isFeatured?: boolean;
}

export interface AvailabilitySlot {
  date: string;
  timeSlots: string[];
}

// MUST use server-side API URL
const API_URL = process.env.API_URL!;

// ⭐ Helper: Build cookie header (REQUIRED)
async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

/* ---------------------------------------------------------
   CREATE TUTOR PROFILE (protected)
--------------------------------------------------------- */
export async function createTutorProfile(data: TutorProfileData) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,          // ⭐ REQUIRED
    },
    credentials: "include",          // ⭐ REQUIRED
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------------------------------------------------
   GET TUTOR PROFILE (Dashboard)
--------------------------------------------------------- */
export async function getTutorProfile() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/dashboard`, {
    headers: { Cookie: cookieHeader }, // ⭐ REQUIRED
    cache: "no-store",
    credentials: "include",           // ⭐ REQUIRED
  });

  return res.json();
}

/* ---------------------------------------------------------
   UPDATE TUTOR PROFILE
--------------------------------------------------------- */
export async function updateTutorProfile(data: TutorProfileData) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,           // ⭐ REQUIRED
    },
    credentials: "include",           // ⭐ REQUIRED
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------------------------------------------------
   SET AVAILABILITY
--------------------------------------------------------- */
export async function setAvailability(slots: AvailabilitySlot) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/availability`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,           // ⭐ REQUIRED
    },
    credentials: "include",           // ⭐ REQUIRED
    body: JSON.stringify(slots),
  });

  return res.json();
}

/* ---------------------------------------------------------
   GET AVAILABILITY
--------------------------------------------------------- */
export async function getAvailability() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/availability`, {
    headers: { Cookie: cookieHeader }, // ⭐ REQUIRED
    cache: "no-store",
    credentials: "include",           // ⭐ REQUIRED
  });

  return res.json();
}

/* ---------------------------------------------------------
   GET TEACHING SESSIONS
--------------------------------------------------------- */
export async function getSessions() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/sessions`, {
    headers: { Cookie: cookieHeader }, // ⭐ REQUIRED
    cache: "no-store",
    credentials: "include",           // ⭐ REQUIRED
  });

  return res.json();
}

/* ---------------------------------------------------------
   GET RATINGS & REVIEWS
--------------------------------------------------------- */
export async function getRatingsAndReviews() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/tutors/reviews`, {
    headers: { Cookie: cookieHeader }, // ⭐ REQUIRED
    cache: "no-store",
    credentials: "include",           // ⭐ REQUIRED
  });

  return res.json();
}