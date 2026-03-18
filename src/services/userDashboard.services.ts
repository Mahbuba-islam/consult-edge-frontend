// "use server";

// import { cookies } from "next/headers";

// // 🔥 Protected backend API (cookie required)
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
//    STUDENT PROFILE (PROTECTED)
// --------------------------------------------------------- */

// export async function getStudentProfile() {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/student/profile`, {
//       headers: { Cookie: cookieHeader },
//       cache: "no-store",
//       credentials: "include",
//     });

//     return { data: await res.json(), error: null };
//   } catch {
//     return { data: null, error: { message: "Failed to fetch student profile" } };
//   }
// }

// export async function updateStudentProfile(payload: {
//   name?: string;
//   email?: string;
//   phone?: string;
// }) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/student/update-profile`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieHeader,
//       },
//       credentials: "include",
//       body: JSON.stringify(payload),
//     });

//     return { data: await res.json(), error: null };
//   } catch {
//     return { data: null, error: { message: "Failed to update student profile" } };
//   }
// }

// /* ---------------------------------------------------------
//    BOOKINGS (PROTECTED)
// --------------------------------------------------------- */

// export async function bookSession(payload: {
//   tutorId: string;
//   date: string;
//   startTime: string;
//   endTime: string;
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
//   } catch {
//     return { success: false, message: "Failed to book session" };
//   }
// }

// export async function completeBooking(bookingId: string) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/student/bookings/${bookingId}/complete`, {
//       method: "PUT",
//       headers: { Cookie: cookieHeader },
//       credentials: "include",
//     });

//     return { data: await res.json(), error: null };
//   } catch {
//     return { data: null, error: { message: "Failed to complete booking" } };
//   }
// }

// export async function getUpcomingBookings() {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/student/bookings/upcoming`, {
//       headers: { Cookie: cookieHeader },
//       next: { tags: ["student-upcoming-bookings"] },
//       credentials: "include",
//     });

//     return { data: await res.json(), error: null };
//   } catch {
//     return { data: null, error: { message: "Failed to fetch upcoming bookings" } };
//   }
// }

// export async function getPastBookings() {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/student/bookings/past`, {
//       headers: { Cookie: cookieHeader },
//       next: { tags: ["student-past-bookings"] },
//       credentials: "include",
//     });

//     return { data: await res.json(), error: null };
//   } catch {
//     return { data: null, error: { message: "Failed to fetch past bookings" } };
//   }
// }

// /* ---------------------------------------------------------
//    DELETE ACCOUNT (PROTECTED)
// --------------------------------------------------------- */

// export async function deleteAccountService() {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/student/delete-profile`, {
//       method: "DELETE",
//       headers: { Cookie: cookieHeader },
//       credentials: "include",
//     });

//     return await res.json();
//   } catch {
//     return { success: false, message: "Something went wrong" };
//   }
// }

// /* ---------------------------------------------------------
//    REVIEWS (PROTECTED)
// --------------------------------------------------------- */

// export async function leaveReview(payload: {
//   bookingId: string;
//   rating: number;
//   comment?: string;
// }) {
//   try {
//     const cookieHeader = await buildCookieHeader();

//     const res = await fetch(`${API_URL}/reviews`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cookieHeader,
//       },
//       credentials: "include",
//       body: JSON.stringify(payload),
//     });

//     return { data: await res.json(), error: null };
//   } catch {
//     return { data: null, error: { message: "Failed to submit review" } };
//   }
// }



"use server";

import { cookies } from "next/headers";

// 🔥 Protected backend API (cookie required)
const API_URL = process.env.API_URL!;

// ⭐ Helper: build Cookie header
async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

/* ---------------------------------------------------------
   STUDENT PROFILE (PROTECTED)
--------------------------------------------------------- */

export async function getStudentProfile() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/profile`, {
      cache: "no-store",
      headers: { Cookie: cookieHeader },
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch student profile" } };
  }
}

export async function updateStudentProfile(payload: {
  name?: string;
  email?: string;
  phone?: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to update student profile" } };
  }
}

/* ---------------------------------------------------------
   BOOKINGS (PROTECTED)
--------------------------------------------------------- */

export async function bookSession(payload: {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Failed to book session" };
  }
}

export async function completeBooking(bookingId: string) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(
      `${API_URL}/student/bookings/${bookingId}/complete`,
      {
        method: "PUT",
        headers: { Cookie: cookieHeader },
        credentials: "include",
      }
    );

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to complete booking" } };
  }
}

export async function getUpcomingBookings() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/bookings/upcoming`, {
      next: { tags: ["student-upcoming-bookings"] },
      headers: { Cookie: cookieHeader },
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch upcoming bookings" } };
  }
}

export async function getPastBookings() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/bookings/past`, {
      next: { tags: ["student-past-bookings"] },
      headers: { Cookie: cookieHeader },
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch past bookings" } };
  }
}

/* ---------------------------------------------------------
   DELETE ACCOUNT (PROTECTED)
--------------------------------------------------------- */

export async function deleteAccountService() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/delete-profile`, {
      method: "DELETE",
      headers: { Cookie: cookieHeader },
      credentials: "include",
    });

    return await res.json();
  } catch {
    return { success: false, message: "Something went wrong" };
  }
}

/* ---------------------------------------------------------
   REVIEWS (PROTECTED)
--------------------------------------------------------- */

export async function leaveReview(payload: {
  bookingId: string;
  rating: number;
  comment?: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to submit review" } };
  }
}