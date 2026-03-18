"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-client"
import { BookingModal } from "../booking/bookingModel"

export default function BookNowButton({ tutorId }: { tutorId: string }) {
  const router = useRouter()
   const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!user) return router.push("/login")
    if (user.role !== "student") return alert("Only students can book sessions")
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded-md bg-purple-600 text-white px-5 py-2 font-semibold hover:bg-purple-700"
      >
        Book Now
      </button>

      <BookingModal tutorId={tutorId} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function useAuth(): { user: any } {
    throw new Error("Function not implemented.")
}
