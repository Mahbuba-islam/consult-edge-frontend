import { getPastBookingsAction, getUpcomingBookingsAction } from "@/src/app/actions/userDashboard.action";
import BookSessionUi from "./BookSessionUi";

export default async function StudentBookingsPage() {
  const [upcomingRes, pastRes] = await Promise.all([
    getUpcomingBookingsAction(),
    getPastBookingsAction(),
  ]);

  
  console.log('up..', upcomingRes, pastRes);
  const upcoming = upcomingRes?.data?.data || [];
  const past = pastRes?.data?.data || [];

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
     <h1 className="text-2xl font-bold text-gray-900">
  Your Bookings <span className="text-violet-800">(Past + Upcoming)</span>
  <span className="block text-sm text-gray-600 mt-1">
    Manage your upcoming & past sessions — complete lessons and share your 
    <span className="text-violet-600 text-2xl p-2">feedback</span>
  </span>
</h1>
      <BookSessionUi upcoming={upcoming} past={past} />
    </div>
  );
}