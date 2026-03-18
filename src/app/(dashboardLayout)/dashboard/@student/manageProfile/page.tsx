
import { getStudentProfileAction } from "@/src/app/actions/userDashboard.action";
import ManageProfilePage from "./ManageProfilePage";

export default async function Page() {
  const res = await getStudentProfileAction();
  const user = res.data
 console.log('profile student', res.data.name)

  if (!res) {
    return (
      <div className="p-6 text-center text-gray-600">
        Please login to manage your profile.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ManageProfilePage user={user} />
    </div>
  );
}
