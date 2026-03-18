import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="w-full py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-4 animate-slide-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Find the Perfect Tutor for You
          </h1>

          <p className="text-lg text-gray-600">
            Learn anything, anytime — with expert tutors from around the world.
          </p>
          <Link href="/tutors">
           <button className="px-6 py-3 bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white rounded-lg font-semibold shadow hover:scale-105 transition">
            Get Started
          </button>
          </Link>
         
        </div>

        {/* RIGHT IMAGE */}
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
    </section>
  );
}