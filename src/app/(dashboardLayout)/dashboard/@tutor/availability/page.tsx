
import { getTutorAvailabilityAction } from "@/src/app/actions/tutorDashboard.action";
import { AvailabilityForm } from "./AvailabilityFrom";
import { AvailabilityList } from "./AvailabilityList";


export default async function AvailabilityPage() {
  const availability = await getTutorAvailabilityAction();
 console.log('avalability page', availability);
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">My Availability</h1>
<AvailabilityList items={availability?.data || []} />
<AvailabilityForm />
    </div>
  );
}
