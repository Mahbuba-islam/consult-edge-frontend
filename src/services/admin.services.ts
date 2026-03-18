// "use server";

// import { cookies } from "next/headers";

// // 🔥 MUST use server-side API URL for protected admin routes
// const API_URL = process.env.API_URL!;

// // ⭐ Helper: Build cookie header
// export async function buildCookieHeader() {
//   const cookieStore = await cookies();
//   return cookieStore
//     .getAll()
//     .map(c => `${c.name}=${c.value}`)
//     .join("; ");
// }

// // ⭐ 1) Get all bookings
// export async function getAllBookings() {
//   const cookieHeader = await buildCookieHeader();

//   const res = await fetch(`${API_URL}/admin/bookings`, {
//     headers: { Cookie: cookieHeader },
//     cache: "no-store",
//     credentials: "include",
//   });

//   if (!res.ok) return null;
//   return res.json();
// }

// // ⭐ 2) Get all users
// export async function getAllUsers() {
//   const cookieHeader = await buildCookieHeader();

//   const res = await fetch(`${API_URL}/admin/getAllUsers`, {
//     headers: { Cookie: cookieHeader },
//     cache: "no-store",
//     credentials: "include",
//   });

//   return res.json();
// }

// // ⭐ 3) Get all tutors
// export async function getAllTutors() {
//   const cookieHeader = await buildCookieHeader();

//   const res = await fetch(`${API_URL}/admin/tutors`, {
//     headers: { Cookie: cookieHeader },
//     cache: "no-store",
//     credentials: "include",
//   });

//   return res.json();
// }

// // ⭐ 4) Manage user status (ban/unban)
// export async function manageUserStatus(
//   userId: string,
//   status: "ACTIVE" | "BANNED"
// ) {
//   const cookieHeader = await buildCookieHeader();

//   const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Cookie: cookieHeader,
//     },
//     credentials: "include",
//     body: JSON.stringify({ status }),
//   });

//   return res.json();
// }



"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;

// ⭐ Helper: Build cookie header (REQUIRED)
async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

// ⭐ 1) Get all bookings
export async function getAllBookings() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/bookings`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}

// ⭐ 2) Get all users
export async function getAllUsers() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/getAllUsers`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
    credentials: "include",
  });

  return res.json();
}

// ⭐ 3) Get all tutors
export async function getAllTutors() {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/tutors`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
    credentials: "include",
  });

  return res.json();
}

// ⭐ 4) Manage user status (ban/unban)
export async function manageUserStatus(
  userId: string,
  status: "ACTIVE" | "BANNED"
) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  return res.json();
}