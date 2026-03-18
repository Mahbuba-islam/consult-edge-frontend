
"use server"


import { authClient } from "@/lib/auth-client"
import { bookSession, completeBooking, deleteAccountService, getPastBookings, getStudentProfile, getUpcomingBookings, leaveReview, updateStudentProfile } from "@/src/services/userDashboard.services"

import { revalidateTag } from "next/cache"

// -----------------------------
// GET STUDENT PROFILE
// -----------------------------
export const getStudentProfileAction = async () => {
  return await getStudentProfile()
}

// -----------------------------
// UPDATE STUDENT PROFILE
// -----------------------------
export const updateStudentProfileAction = async (payload: any) => {
  const res = await updateStudentProfile(payload)

  if (res?.data?.profile) {
    revalidateTag("student-profile", "default")   // ⭐ FIXED
    return {
      success: true,
      data: res.data.profile,
    }
  }

  return { success: false, data: null }
}

// -----------------------------
// BOOK SESSION
// -----------------------------
export const bookSessionAction = async (payload: {
  tutorId: string
  date: string
  startTime: string
  endTime: string
}) => {
  const res = await bookSession(payload)
  revalidateTag("student-bookings", "default")   
  revalidateTag("tutors", "default")             
  return res
}

// -----------------------------
// COMPLETE BOOKING
// -----------------------------
export const completeBookingAction = async (bookingId: string) => {
  const res = await completeBooking(bookingId)
  revalidateTag("student-bookings", "default")   // ⭐ FIXED
  revalidateTag("tutors", "default")             // ⭐ IMPORTANT FIX
  return res
}

// -----------------------------
// GET UPCOMING BOOKINGS
// -----------------------------
export const getUpcomingBookingsAction = async () => {
  return await getUpcomingBookings()
}

// -----------------------------
// GET PAST BOOKINGS
// -----------------------------
export const getPastBookingsAction = async () => {
  return await getPastBookings()
}

// -----------------------------
// LEAVE REVIEW
// -----------------------------
export const leaveReviewAction = async (payload: any) => {
  const res = await leaveReview(payload)
  revalidateTag("student-reviews", "default")    
  revalidateTag("tutors", "default")             
  return res
}

// -----------------------------
// DELETE ACCOUNT
// -----------------------------
export async function deleteAccountAction() {
  try {
    const res = await deleteAccountService()

    if (!res.success) {
      return { success: false, message: res.message }
    }

    await authClient.signOut()
    return { success: true }
  } catch (error) {
    return { success: false, message: "Something went wrong" }
  }
}





