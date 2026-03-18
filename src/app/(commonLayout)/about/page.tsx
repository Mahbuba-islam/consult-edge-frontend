import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="px-6 md:px-20 py-16 space-y-20">

      {/* Hero Section */}
      <section className="text-center space-y-4 animate-fadeIn">
        <h1 className="text-4xl font-extrabold 
          bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent
          animate-gradientShift">
          About MentorHub
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          MentorHub is a modern learning platform designed to connect students with expert tutors 
          through a seamless, personalized, and premium experience.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center animate-fadeIn">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to make high‑quality education accessible to everyone.  
            MentorHub empowers learners by providing expert tutors, personalized learning paths,  
            and a smooth, modern platform that feels premium and effortless.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="p-6 rounded-2xl bg-linear-to-br from-[#f3e8ff] to-[#ffe6fa] shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-[#5624D0]"
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

      {/* Why Choose Us */}
      <section className="space-y-10 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center 
          bg-linear-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
          Why Choose MentorHub
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
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

          {/* Card 2 */}
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

          {/* Card 3 */}
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

      {/* Final CTA */}
      <section className="text-center mt-16 animate-fadeIn">
        <Link
          href="/tutors"
          className="inline-block px-6 py-3 rounded-lg text-white font-semibold 
            bg-linear-to-r from-[#5624D0] to-[#b00ea5] shadow hover:opacity-90 transition"
        >
          Meet Our Tutors →
        </Link>
      </section>

    </div>
  );
}