"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  updateCategoryAction,
  deleteCategoryAction,
} from "@/src/app/actions/category.action";
import { Pencil, Trash2, X } from "lucide-react";
import { Category } from "@/src/types/category.types";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [items, setItems] = useState<Category[]>(categories);

  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setName(cat.name);
  };

  const closeEdit = () => {
    setEditing(null);
    setName("");
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!editing) return;

    const res = await updateCategoryAction(editing.id, { name });

    if (res?.success) {
      toast.success("Category updated successfully");

      setItems((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...c, name } : c))
      );

      closeEdit();
    } else {
      toast.error(res?.message || "Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCategoryAction(id);

    if (res?.success) {
      toast.success("Category deleted");
      setItems((prev) => prev.filter((c) => c.id !== id));
    } else {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      {/* CATEGORY LIST */}
      <div className="space-y-3">
        {items.map((cat) => (
          <div
            key={cat.id}
            className="p-4 border rounded-xl bg-white shadow-sm flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{cat.name}</p>
              <p className="text-xs text-gray-500">ID: {cat.id}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => openEdit(cat)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-5 animate-in fade-in zoom-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Category</h2>
              <button onClick={closeEdit}>
                <X className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>
            </div>

            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}