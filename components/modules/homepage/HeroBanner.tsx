"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="mt-6 px-4 md:px-10">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white">
        <div className="grid md:grid-cols-2 gap-6 items-center p-6 sm:p-10 lg:p-14">

          {/* Left: Text */}
          <div className="space-y-4 animate-fadeIn">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-white/10 px-3 py-1 rounded-full backdrop-blur">
              ⭐ 4.9 average rating · Thousands of happy students
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug">
              Learn with trusted tutors,  
              <span className="block text-[#ffe6fa]">grow with confidence.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/80 max-w-md">
              MentorHub connects you with expert tutors, real reviews, and a learning experience 
              that actually feels motivating, modern, and personal.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/tutors"
                className="px-5 py-2.5 rounded-lg bg-white text-[#5624D0] font-semibold text-sm shadow hover:bg-[#f7f3ff] transition"
              >
                Browse Tutors
              </Link>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                <span className="flex -space-x-2">
                  <span className="w-7 h-7 rounded-full bg-white/20 border border-white/40" />
                  <span className="w-7 h-7 rounded-full bg-white/30 border border-white/40" />
                  <span className="w-7 h-7 rounded-full bg-white/40 border border-white/40" />
                </span>
                <span>10k+ students learning happily</span>
              </div>
            </div>
          </div>

          {/* Right: Image */}
           <div className="relative w-full h-72 md:h-96 animate-slide-right">
                   <Image
                     src="https://i.ibb.co/zTXhdTPJ/mentorhub-banner.jpg"
                     alt="MentorHub Banner"
                     fill
                     className="rounded-xl object-cover shadow-xl"
                     priority
                   />
                 </div>
         
        </div>
      </div>
    </section>
  );
}