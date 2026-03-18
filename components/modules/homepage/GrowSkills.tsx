import { Animated } from "@/components/modules/homepage/Animated";
import { Users, GraduationCap, Sparkles } from "lucide-react";

export function GrowSkillsSection() {
  return (
    <Animated>
      <section className="mt-20 px-4 md:px-10 text-center space-y-6 mb-18">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold 
          bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
          Grow Your Skills With MentorHub
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Learn smarter with expert tutors, structured learning paths, and personalized guidance 
          designed to help you reach your goals faster.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md 
            transition-all bg-white">
            <Users className="w-10 h-10 text-[#5624D0] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">1:1 Expert Guidance</h3>
            <p className="text-gray-600 text-sm">
              Learn directly from top tutors who personalize every session to your goals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md 
            transition-all bg-white">
            <GraduationCap className="w-10 h-10 text-[#b00ea5] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Structured Learning Paths</h3>
            <p className="text-gray-600 text-sm">
              Follow curated paths that take you from beginner to advanced with confidence.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md 
            transition-all bg-white">
            <Sparkles className="w-10 h-10 text-[#5624D0] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">AI‑Powered Recommendations</h3>
            <p className="text-gray-600 text-sm">
              Get smart suggestions based on your interests, progress, and learning style.
            </p>
          </div>

        </div>
      </section>
    </Animated>
  );
}