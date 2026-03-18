export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


import { getCategoriesAction } from "@/src/app/actions/category.action"
import CategoryList from "./categoryList"
import Link from "next/link"

export default async function CategoriesPage() {
  const { data } = await getCategoriesAction()

  return (
    <div className="p-6 md:p-10 space-y-8">

      {/* HEADER + BUTTON */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Categories</h1>

        <Link
          href="/dashboard/categories/createCategories"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Create Category
        </Link>
      </div>

      {/* CATEGORY LIST */}
      <div className="rounded-xl border bg-white shadow-sm p-4">
        <CategoryList categories={data} />
      </div>

      {/* TEXT BEFORE CREATE */}
      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Want to create more categories?
        </p>

        <Link
          href="/dashboard/categories/createCategories"
          className="text-blue-600 hover:underline text-sm"
        >
          Click here to add a new category →
        </Link>
      </div>

    </div>
  )
}