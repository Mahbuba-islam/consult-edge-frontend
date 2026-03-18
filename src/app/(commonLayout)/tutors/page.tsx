
import { TutorsCard } from "./TutorsCard";
import Categories from "@/components/modules/homepage/Categories";
import { getTutorProfile } from "@/src/services/expert.services";
import { TutorsPageProps } from "@/src/types/expert.types";

export default async function TutorsPage(props:TutorsPageProps) {
  const searchParams = await props.searchParams ?? {}

  const searchQuery = searchParams.search || "";
  const selectedCategory = searchParams.categoryName || "";

  console.log("searchParams.categoryName:", selectedCategory);


  const { data: tutors, error } = await getTutorProfile({
    search: searchQuery,
    categoryName: selectedCategory,
  });

  console.log("category in tutor", selectedCategory);
  console.log("tutors", tutors);

  return (
    <div>
      <Categories/>
    <div className=" md:px-8  text-center">
     

   
{selectedCategory && tutors?.length > 0 && (
  <h2
    className="text-center text-3xl font-extrabold my-6 
      bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent
      animate-fadeIn"
  >
    Our {selectedCategory} Experts
  </h2>
)}


{!selectedCategory && (
  <h2
    className="text-center text-2xl font-extrabold mb-6 my-12
      bg-linear-to-r from-[#7445ec] to-[#9b1e9b] bg-clip-text text-transparent
      animate-fadeIn"
  >
    Discover Expert Tutors
  </h2>
)}


      <TutorsCard tutors={tutors} selectedCategory ={selectedCategory }/>
    </div>
    </div>
  );
}