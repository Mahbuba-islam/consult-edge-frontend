// "use server";

// import { cookies } from "next/headers";

// // 🔥 Public API (no cookie needed)
// const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL!;

// // 🔥 Protected API (cookie required)
// const API_URL = process.env.API_URL!;

// export interface CategoryData {
//   name: string;
// }

// /* ---------------------------------------------------------
//    1) PUBLIC — GET CATEGORIES
// --------------------------------------------------------- */
// export async function getCategories() {
//   const res = await fetch(`${PUBLIC_API_URL}/categories`, {
//     next: { tags: ["categories"] },
//   });

//   const data = await res.json();
//   return { data };
// }

// /* ---------------------------------------------------------
//    2) PROTECTED — CREATE CATEGORY
// --------------------------------------------------------- */
// export async function createCategory(data: CategoryData) {
//   const cookieStore = await cookies();

//   const res = await fetch(`${API_URL}/admin/categories`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Cookie: cookieStore.toString(),
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }

// /* ---------------------------------------------------------
//    3) PROTECTED — DELETE CATEGORY
// --------------------------------------------------------- */
// export async function deleteCategory(id: string) {
//   const cookieStore = await cookies();

//   const res = await fetch(`${API_URL}/admin/categories/${id}`, {
//     method: "DELETE",
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return res.json();
// }

// /* ---------------------------------------------------------
//    4) PROTECTED — UPDATE CATEGORY
// --------------------------------------------------------- */
// export async function updateCategory(id: string, data: ) {
//   const cookieStore = await cookies();

//   const res = await fetch(`${API_URL}/admin/categories/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Cookie: cookieStore.toString(),
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }



"use server";

import { cookies } from "next/headers";

// Public API (no cookie needed)
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Protected API (cookie required)
const API_URL = process.env.API_URL!;

export interface CategoryData {
  name: string;
}



// ⭐ Helper: Build cookie header (REQUIRED)
async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

/* ---------------------------------------------------------
   1) PUBLIC — GET CATEGORIES
--------------------------------------------------------- */
export async function getCategories() {
  const res = await fetch(`${PUBLIC_API_URL}/categories`, {
    next: { tags: ["categories"] },
  });

  const data = await res.json();
  return { data };
}

/* ---------------------------------------------------------
   2) PROTECTED — CREATE CATEGORY
--------------------------------------------------------- */
export async function createCategory(data: CategoryData) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,        // ⭐ REQUIRED
    },
    credentials: "include",         // ⭐ REQUIRED
    body: JSON.stringify(data),
  });

  return res.json();
}

/* ---------------------------------------------------------
   3) PROTECTED — DELETE CATEGORY
--------------------------------------------------------- */
export async function deleteCategory(id: string) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieHeader,         // ⭐ REQUIRED
    },
    credentials: "include",         // ⭐ REQUIRED
  });

  return res.json();
}

/* ---------------------------------------------------------
   4) PROTECTED — UPDATE CATEGORY
--------------------------------------------------------- */
export async function updateCategory(id: string, data: CategoryData) {
  const cookieHeader = await buildCookieHeader();

  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,         // ⭐ REQUIRED
    },
    credentials: "include",         // ⭐ REQUIRED
    body: JSON.stringify(data),
  });

  return res.json();
}