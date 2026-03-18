
import { getTeachingSessionsAction } from "@/src/app/actions/tutorDashboard.action";
import { TutorSessionsList } from "./TutorSessionsList";

export default async function TutorSessionsPage() {
  const res = await getTeachingSessionsAction();
  console.log('session res',res);
  const sessions = res?.bookings || [];
 console.log('sessionssss', sessions);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold p-8">Your Teaching Sessions</h1>

      <TutorSessionsList items={sessions} />
    </div>
  );
}
