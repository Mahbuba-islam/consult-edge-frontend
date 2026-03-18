import Link from "next/link";
import { Animated } from "@/components/modules/homepage/Animated";
import { getCategoriesAction } from "@/src/app/actions/category.action";
import {
  Code, Brain, BookOpen, PenTool, Globe, Calculator, Laptop, LucideIcon
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  Programming: Code,
  "Computer Science": Laptop,
  Mathematics: Calculator,
  AI: Brain,
  English: BookOpen,
  Design: PenTool,
  Language: Globe,
};

export default async function Categories() {
  const { data: categories } = await getCategoriesAction() as { data: Category[] };

  return (
    <Animated>
      <section className="mt-18 px-4 md:px-10 text-center space-y-6">

        <p className="text-sm md:text-xl font-medium text-gray-600 max-w-2xl mx-auto animate-fadeIn">
          Grow smarter with expert‑guided learning<br />
          Explore categories built to support your goals at every level.
        </p>

        <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1 justify-start sm:justify-center">

          {categories?.map((cat: Category, index: number) => {
            const Icon = categoryIcons[cat.name] || Code;

            return (
              <Link
                key={cat.id}
                href={`/tutors?categoryName=${cat.name}`}
                className="
                  group relative flex items-center gap-1.5 sm:gap-2
                  px-3 py-1.5 sm:px-4 sm:py-2
                  rounded-full bg-white border border-gray-200 shadow-sm
                  hover:shadow-md hover:-translate-y-1 transition-all duration-300
                  text-gray-700 text-xs sm:text-xs 
                  opacity-0 animate-fadeIn
                "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#5624D0]" />
                <span>{cat.name}</span>

                <span
                  className="
                    absolute left-1/2 -bottom-1 w-0 h-0.5
                    bg-linear-to-r from-[#5624D0] to-[#b00ea5]
                    rounded-full transition-all duration-300
                    group-hover:w-3/4 group-hover:-translate-x-1/2
                  "
                ></span>
              </Link>
            );
          })}
        </div>
      </section>
    </Animated>
  );
}