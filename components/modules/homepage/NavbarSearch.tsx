"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/tutors?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm
      border border-gray-200 w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Search tutors, subjects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 outline-none text-sm"
      />

      <button
        type="submit"
        className="px-4 py-1.5 rounded-full text-white text-sm font-semibold
        bg-linear-to-r from-[#5624D0] to-[#b00ea5] hover:opacity-90 transition"
      >
        Search
      </button>
    </form>
  );
}