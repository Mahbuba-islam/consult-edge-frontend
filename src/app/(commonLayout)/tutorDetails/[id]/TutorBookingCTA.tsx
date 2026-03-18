"use client";

import { useRouter } from "next/navigation";
import BookSessionModal from "./BookSessionModal";

export default function TutorBookingCTA({ tutorId, tutorName, isLoggedIn } : {tutorId:string, tutorName:string, isLoggedIn:boolean}) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Ready to book a session?
        </h3>
        <p className="text-sm text-gray-500">
          Choose a date and time to book your lesson.
        </p>
      </div>

      {isLoggedIn ? (
        <BookSessionModal tutorId={tutorId} tutorName={tutorName} />
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white rounded-lg font-semibold shadow"
        >
          Login to Book
        </button>
      )}
    </div>
  );
}