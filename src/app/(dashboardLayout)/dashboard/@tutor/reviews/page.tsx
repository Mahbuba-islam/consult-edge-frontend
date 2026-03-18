import { getRatingsAndReviewsAction } from "@/src/app/actions/tutorDashboard.action";
import { ReviewsList } from "./ReviewList";


export default async function TutorReviewsPage() {
  const data = await getRatingsAndReviewsAction();
  console.log("review data", data);

  return (
    <div className="p-6">
      <ReviewsList items={data.data} />
    </div>
  );
}