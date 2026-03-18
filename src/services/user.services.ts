// 




"use server";

// 🔥 Protected backend API (cookie required — auto-sent by Server Actions)
const API_URL = process.env.API_URL!;

// 🔥 BetterAuth API (public + protected)
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL!;

/* ---------------------------------------------------------
   1) Get Session (BetterAuth)
--------------------------------------------------------- */
export async function getSession() {
  try {
    const res = await fetch(`${AUTH_URL}/session`, {
      cache: "no-store",
      credentials: "include",   // ⭐ FIXED — Cookie now included
    });

    const session = await res.json();

    if (!session) {
      return { data: null, error: { message: "Session missing" } };
    }

    return { data: session, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went wrong" } };
  }
}

/* ---------------------------------------------------------
   2) Register user (protected backend route)
--------------------------------------------------------- */
export async function registerUser(data: {
  userId: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR";
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",   // ⭐ FIXED — Cookie now included
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------------------------------------------------
   3) Admin get all users (protected)
--------------------------------------------------------- */
export async function getAllUsers() {
  try {
    const res = await fetch(`${API_URL}/admin/getAllUsers`, {
      next: { tags: ["users"] },
      credentials: "include",   // ⭐ FIXED — Cookie now included
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch users" } };
  }
}