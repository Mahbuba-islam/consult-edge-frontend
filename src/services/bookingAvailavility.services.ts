// "use server";

// import { cookies } from "next/headers";

// // 🔥 Public API (no cookie needed)
// const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL!;

// // 🔥 Protected API (cookie required)
// const API_URL = process.env.API_URL!;

// // ⭐ Helper: Build cookie header
// export async function buildCookieHeader() {
//   const cookieStore = await cookies();
//   return cookieStore
//     .getAll()
//     .map(c => `${c.name}=${c.value}`)
//     .join("; ");
// }

// /* ---------------------------------------------------------
//    1) PUBLIC — GET SLOTS
// --------------------------------------------------------- */
// export async function getSlots({
//   tutorId,
//   date,
// }: {
//   tutorId: string;
//   date: string;
// }) {
//   try {
//     const res = await fetch(
//       `${PUBLIC_API_URL}/availability/${tutorId}?date=${date}`,
//       { cache: "no-store" }
//     );

//     return await res.json();
//   } catch (err) {
//     console.error("Availability fetch error:", err);
//     return { slots: [] };
//   }
// }

// /* ---------------------------------------------------------
//    2) PROTECTED — SET AVAILABILITY (cookie required)
// --------------------------------------------------------- */
// export async function setAvailability(payload: {
//   tutorId: string;
//   date: string;
//   timeSlots: string[];
// }) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/availability`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieHeader,
//       },
//       credentials: "include",
//       body: JSON.stringify(payload),
//     });

//     return await res.json();
//   } catch (err) {
//     console.error("Availability set error:", err);
//     return { success: false };
//   }
// }




"use server";

import { cookies } from "next/headers";

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL!;
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
   1) PUBLIC — GET SLOTS
--------------------------------------------------------- */
export async function getSlots({
  tutorId,
  date,
}: {
  tutorId: string;
  date: string;
}) {
  try {
    const res = await fetch(
      `${PUBLIC_API_URL}/availability/${tutorId}?date=${date}`,
      { cache: "no-store" }
    );

    return await res.json();
  } catch (err) {
    console.error("Availability fetch error:", err);
    return { slots: [] };
  }
}

/* ---------------------------------------------------------
   2) PROTECTED — SET AVAILABILITY (cookie REQUIRED)
--------------------------------------------------------- */
export async function setAvailability(payload: {
  tutorId: string;
  date: string;
  timeSlots: string[];
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,     // ⭐ REQUIRED
      },
      credentials: "include",      // ⭐ REQUIRED
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
    console.error("Availability set error:", err);
    return { success: false };
  }
}