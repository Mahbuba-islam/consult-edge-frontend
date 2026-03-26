"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { getExperts } from "@/src/services/expert.services";
import { IExpert } from "@/src/types/expert.types";

const ExpertsPage = () => {
  const searchParams = useSearchParams();

  const [experts, setExperts] = useState<IExpert[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchExperts = async () => {
    setIsLoading(true);
    try {
      const query = searchParams.toString();
      const res = await getExperts(query);
      setExperts(res?.data || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Experts</h1>

      {/* Search */}
      <div className="max-w-sm">
        <input
          type="text"
          defaultValue={searchParams.get("search") ?? ""}
          placeholder="Search experts..."
          className="w-full rounded-md border px-3 py-2"
          onChange={(e) => {
            const value = e.target.value;
            const params = new URLSearchParams(window.location.search);

            if (value) params.set("search", value);
            else params.delete("search");

            window.history.pushState(null, "", `?${params.toString()}`);
            fetchExperts();
          }}
        />
      </div>

      {/* Loading */}
      {isLoading && <p className="text-muted-foreground">Loading...</p>}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <Link
            key={expert.id}
            href={`/experts/${expert.id}`}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={expert.profilePhoto || "/placeholder.png"}
                alt={expert.fullName}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mt-3 text-lg font-semibold">{expert.fullName}</h2>
            <p className="text-sm text-muted-foreground">{expert.title}</p>

            <div className="mt-2 text-sm">
              <span className="font-medium">Industry:</span>{" "}
              {expert.industry?.name || "N/A"}
            </div>

            <div className="mt-1 text-sm">
              <span className="font-medium">Price:</span> ${expert.consultationFee}
            </div>

            <button className="mt-4 w-full bg-primary text-white py-2 rounded-md text-sm">
              View Profile
            </button>
          </Link>
        ))}
      </div>

      {!isLoading && experts.length === 0 && (
        <p className="text-muted-foreground">No experts found.</p>
      )}
    </div>
  );
};

export default ExpertsPage;