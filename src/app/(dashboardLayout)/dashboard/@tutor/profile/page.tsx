import { getCategoriesAction } from "@/src/app/actions/category.action";
import { getTutorProfileAction } from "@/src/app/actions/tutorDashboard.action";
import { TutorProfileForm } from "./TutorProfileForm";
import { TutorProfileView } from "./TutorProfileView";

export default async function TutorProfilePage() {
  const categories = await getCategoriesAction();
  const response = await getTutorProfileAction();

  const profile = response?.data?.profile; 

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Tutor Profile</h1>

      {profile ? (
        <TutorProfileView profile={profile} categories={categories.data} />
      ) : (
        <TutorProfileForm categories={categories} />
      )}
    </div>
  );
}