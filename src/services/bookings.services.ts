// "use server";

// import { cookies } from "next/headers";

// // 🔥 MUST use server-side API URL for all booking routes
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
//    1) CREATE BOOKING (protected)
// --------------------------------------------------------- */
// export async function createBooking(payload: {
//   tutorId: string;
//   date: string;
//   startTime: string;
//   endTime?: string;
// }) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/bookings`, {
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
//     console.error("Booking create error:", err);
//     return { success: false, message: "Something went wrong" };
//   }
// }

// /* ---------------------------------------------------------
//    2) GET STUDENT BOOKINGS (protected)
// --------------------------------------------------------- */
// export async function getStudentBookings() {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/bookings`, {
//       headers: { Cookie: cookieHeader },
//       cache: "no-store",
//       credentials: "include",
//     });

//     return await res.json();
//   } catch (err) {
//     console.error("Student booking fetch error:", err);
//     return [];
//   }
// }

// /* ---------------------------------------------------------
//    3) GET TUTOR BOOKINGS (protected)
// --------------------------------------------------------- */
// export async function getTutorBookings() {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/bookings/tutor`, {
//       headers: { Cookie: cookieHeader },
//       cache: "no-store",
//       credentials: "include",
//     });

//     return await res.json();
//   } catch (err) {
//     console.error("Tutor booking fetch error:", err);
//     return [];
//   }
// }

// /* ---------------------------------------------------------
//    4) UPDATE BOOKING STATUS (protected)
// --------------------------------------------------------- */
// export async function updateStatus(
//   id: string,
//   action: "CONFIRM" | "REJECT"
// ) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/bookings/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieHeader,
//       },
//       credentials: "include",
//       body: JSON.stringify({ action }),
//     });

//     return await res.json();
//   } catch (err) {
//     console.error("Booking update error:", err);
//     return { success: false };
//   }
// }

// /* ---------------------------------------------------------
//    5) DELETE BOOKING (protected)
// --------------------------------------------------------- */
// export async function deleteBooking(id: string) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/bookings/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieHeader,
//       },
//       credentials: "include",
//     });

//     return await res.json();
//   } catch (error) {
//     return {
//       success: false,
//       message: "Something went wrong while deleting booking",
//     };
//   }
// }



"use server";

import { cookies } from "next/headers";

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
   1) CREATE BOOKING (protected)
--------------------------------------------------------- */
export async function createBooking(payload: {
  tutorId: string;
  date: string;
  startTime: string;
  endTime?: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,        // ⭐ REQUIRED
      },
      credentials: "include",         // ⭐ REQUIRED
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
    console.error("Booking create error:", err);
    return { success: false, message: "Something went wrong" };
  }
}

/* ---------------------------------------------------------
   2) GET STUDENT BOOKINGS (protected)
--------------------------------------------------------- */
export async function getStudentBookings() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings`, {
      headers: { Cookie: cookieHeader },   // ⭐ REQUIRED
      cache: "no-store",
      credentials: "include",              // ⭐ REQUIRED
    });

    return await res.json();
  } catch (err) {
    console.error("Student booking fetch error:", err);
    return [];
  }
}

/* ---------------------------------------------------------
   3) GET TUTOR BOOKINGS (protected)
--------------------------------------------------------- */
export async function getTutorBookings() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings/tutor`, {
      headers: { Cookie: cookieHeader },   // ⭐ REQUIRED
      cache: "no-store",
      credentials: "include",              // ⭐ REQUIRED
    });

    return await res.json();
  } catch (err) {
    console.error("Tutor booking fetch error:", err);
    return [];
  }
}

/* ---------------------------------------------------------
   4) UPDATE BOOKING STATUS (protected)
--------------------------------------------------------- */
export async function updateStatus(
  id: string,
  action: "CONFIRM" | "REJECT"
) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,              // ⭐ REQUIRED
      },
      credentials: "include",              // ⭐ REQUIRED
      body: JSON.stringify({ action }),
    });

    return await res.json();
  } catch (err) {
    console.error("Booking update error:", err);
    return { success: false };
  }
}

/* ---------------------------------------------------------
   5) DELETE BOOKING (protected)
--------------------------------------------------------- */
export async function deleteBooking(id: string) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: { Cookie: cookieHeader },   // ⭐ REQUIRED
      credentials: "include",              // ⭐ REQUIRED
    });

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while deleting booking",
    };
  }
}