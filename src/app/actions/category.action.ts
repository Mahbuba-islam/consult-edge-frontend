"use server";

import { revalidateTag } from "next/cache";
import {  CategoryData, createCategory, deleteCategory, getCategories, updateCategory } from "@/src/services/category.service";

export const createCategoryAction = async (data: CategoryData) => {
  const res = await createCategory(data);
  revalidateTag("categories", "page");
  return res;
};

export const getCategoriesAction = async () => {
  return await getCategories();
};





export async function deleteCategoryAction(id: string) {
  try {
    await deleteCategory(id)

    // Revalidate category list
    revalidateTag("categories", "page")

    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to delete category" }
  }
}



export async function updateCategoryAction(id: string, data: { name: string }) {
  try {
    await updateCategory(id, data)
    revalidateTag("categories", "page")

    return { success: true }
  } catch (err) {
    return { success: false, message: "Error updating category" }
  }
}
