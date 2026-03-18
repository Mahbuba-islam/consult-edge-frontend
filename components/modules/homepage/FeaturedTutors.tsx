
import Link from "next/link";
import TutorCard from "@/components/modules/homepage/tutorCard";
import { Animated } from "@/components/modules/homepage/Animated";
import { TutorProfile } from "@/src/types/expert.types";
import { getFeaturedTutors } from "@/src/services/expert.services";



export default async function FeaturedTutors() {
 const { data: featuredTutors } = await getFeaturedTutors();
   console.log('featureTutor', featuredTutors);
  return (
    <div>
    
  <Animated> 
      {/* Featured Tutors */}
     <section className="space-y-8 mt-14 px-4 md:px-10 animate-fadeIn">
  <h2 className="text-3xl font-extrabold text-center 
     text-violet-600
    animate-gradientShift">
    Discover Expert Tutors
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-12 ">
    {featuredTutors?.map((tutor: TutorProfile) => (
      <div key={tutor.id} className="relative">

        {/* Smaller Featured Badge */}
        {tutor.isFeatured && (
         <span
       className="absolute top-5 right-5 z-20 px-2 py-0.5 text-[7px] font-semibold
     bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white rounded-full shadow"
    >
   Featured
</span>

        )}

        <TutorCard
          id={tutor.id}
          bio={tutor.bio}
          categoryName={tutor.category?.name ?? ""}
          price={tutor.price}
          rating={tutor.rating}
          totalReviews={tutor.totalReviews}
          subject={Array.isArray(tutor.subject) ? tutor.subject : [tutor.subject]}

          user={{
            name: tutor.user?.name ?? "Unknown",
            image: tutor.user?.image ?? "Unknown",
          }}
        />
      </div>
    ))}
  </div>

 <Link
  href="/tutors"
  className="group relative mx-auto inline-flex items-center gap-2 text-md font-semibold 
    bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent"
>
  Explore All Tutors

  <span
    className="text-[#5624D0] text-base font-bold 
      transition-transform duration-300 group-hover:translate-x-1"
  >
    →
  </span>

  <span
    className="absolute left-0 -bottom-0.5 h-0.5 w-0 
      bg-linear-to-r from-[#5624D0] to-[#b00ea5] 
      transition-all duration-300 group-hover:w-full"
  />
</Link>

</section>
</Animated>
 </div>
    
  );
}