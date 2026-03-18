


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createCategoryAction } from "@/src/app/actions/category.action";

export default function CreateCategoryFormClient() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const loadingId = toast.loading("Creating category...");

    const res = await createCategoryAction({ name });

    if (res?.error) {
      toast.error(res.error, { id: loadingId });
    } else {
      toast.success("Category created successfully!", { id: loadingId });
      setName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md border"
    >
      {/* CATEGORY NAME */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-800">Category Name</label>
        <Input
          placeholder="e.g. STEM, Language, Arts"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        className="w-full bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white font-semibold"
      >
        Create Category
      </Button>
    </form>
  );
}