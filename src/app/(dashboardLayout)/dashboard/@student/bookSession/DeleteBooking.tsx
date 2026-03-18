"use client";


import { deleteBookingAction } from "@/src/app/actions/booking.action";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteBooking({ bookingId }:{bookingId:string}) {
  const [isPending, startTransition] = useTransition();
  console.log('bookingId', bookingId);
  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteBookingAction(bookingId);
       console.log('booking-res', res);
      if (res.success) {
        toast.success("Booking cancelled");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Cancelling..." : "Cancel"}
    </button>
  );
}