"use client";

import Link from "next/link";
import { Animated } from "./Animated";

export default function AboutPage() {
  return (
    <div className="px-6 md:px-20 py-16 space-y-10">

      {/* HERO */}
      <Animated>
        <section className="text-center space-y-3">
          <h1
            className="text-4xl md:text-5xl font-extrabold 
            bg-gradient-to-r from-[#5624D0] to-[#b00ea5] 
            bg-clip-text text-transparent animate-fadeIn"
          >
            About MentorHub
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            MentorHub is a modern learning platform connecting students with expert tutors
            through a seamless, personalized, and premium experience.
          </p>

          <div className="mx-auto w-40 h-2 bg-gradient-to-r from-[#5624D0] to-[#b00ea5] blur-xl opacity-40"></div>
        </section>
      </Animated>

      {/* MISSION SECTION */}
      <Animated>
        <section className="grid md:grid-cols-2 gap-14 items-center">

          {/* TEXT */}
          <div className="space-y-5 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              We aim to make high‑quality education accessible to everyone.
              MentorHub empowers learners by providing expert tutors, personalized learning paths,
              and a smooth, modern platform that feels premium and effortless.
            </p>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Whether you're preparing for exams, learning a new skill, or seeking career guidance,
              MentorHub ensures you get the support you need — anytime, anywhere.
            </p>
          </div>

          {/* FLOATING ICON CARD */}
          <div className="flex justify-center">
            <div
              className="p-10 rounded-2xl shadow-xl 
              bg-gradient-to-br from-[#f3e8ff] to-[#ffe6fa] 
              animate-floatSlow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-[#5624D0]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </div>
          </div>

        </section>
      </Animated>

      {/* WHY CHOOSE US */}
      <Animated>
        <section className="space-y-10 animate-fadeIn">
          <h2
            className="text-3xl font-extrabold text-center 
            bg-gradient-to-r from-[#5624D0] to-[#b00ea5] 
            bg-clip-text text-transparent"
          >
            Why Choose MentorHub
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-[#f3e8ff]">
                  <svg className="w-7 h-7 text-[#5624D0]" fill="none" stroke="currentColor" strokeWidth="1.5"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Expert Tutors</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Learn from highly qualified tutors with real teaching experience.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-[#ffe6fa]">
                  <svg className="w-7 h-7 text-[#b00ea5]" fill="none" stroke="currentColor" strokeWidth="1.5"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 8v4l3 3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Flexible Learning</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Study anytime, anywhere with personalized schedules.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-[#e8f0ff]">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Verified Quality</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Every tutor is reviewed and approved for quality assurance.
              </p>
            </div>

          </div>
        </section>
      </Animated>

      {/* CTA */}
      <Animated>
        <section className="text-center mt-16 animate-fadeIn">
          <Link
            href="/tutors"
            className="inline-block px-6 py-3 rounded-lg text-white font-semibold 
            bg-gradient-to-r from-[#5624D0] to-[#b00ea5] shadow hover:opacity-90 transition"
          >
            Meet Our Tutors →
          </Link>
        </section>
      </Animated>

    </div>
  );
}