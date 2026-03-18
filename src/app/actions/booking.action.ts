
"use server";


import { getAllBookings } from "@/src/services/admin.services";
import { deleteBooking } from "@/src/services/bookings.services";
import { revalidateTag } from "next/cache";

export const getBookingsAction = async () => {
  return await getAllBookings();
  
};



export const deleteBookingAction = async (id: string) => {
  const res = await deleteBooking(id);

  if (res.success) {
   
    revalidateTag("student-upcoming-bookings", "default");
    revalidateTag("student-past-bookings", 'default');
  }

  return res;
};