export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import CreateCategoryFormClient from "../createCategoryFormClient";

import Link from "next/link";

export default function CreateCategoryPage() {
  return (
    <div className="p-6 md:p-10 max-w-lg mx-auto space-y-8">

      <h1 className="text-2xl font-bold">Create New Category</h1>

      <div className="rounded-xl border bg-white shadow-sm p-6">
        <CreateCategoryFormClient />
      </div>

      <Link
        href="/dashboard/categories"
        className="text-blue-600 hover:underline text-sm"
      >
        ← Back to Categories
      </Link>

    </div>
  );
}