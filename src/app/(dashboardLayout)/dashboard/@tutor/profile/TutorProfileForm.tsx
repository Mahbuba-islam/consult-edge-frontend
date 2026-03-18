"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { createTutorProfileAction, updateTutorProfileAction } from "@/src/app/actions/tutorDashboard.action";


export type Category = {
  id: string;
  name: string;
};

// Form fields type
type TutorProfileFormType = {
  bio: string;
  price: number;
  categoryId: string;
  subject: string; // comma separated input
  experience?: string;
  isFeatured?: boolean;
};

// Component props type
type TutorProfileFormProps = {
  categories: { data: Category[] };
  defaultValues?: Partial<TutorProfileFormType>;
  isUpdate?: boolean;
  onCancel?: () => void;
};

export function TutorProfileForm({
  categories,
  defaultValues,
  isUpdate,
  onCancel
}: TutorProfileFormProps) {

  const { register, handleSubmit, reset } = useForm<TutorProfileFormType>({
    defaultValues: defaultValues || {}
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TutorProfileFormType) => {
    const payload = {
      ...values,
      price: Number(values.price),
      subject: values.subject
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      const res = isUpdate
        ? await updateTutorProfileAction(payload)
        : await createTutorProfileAction(payload);

      if (res?.success) {
        toast.success(isUpdate ? "Profile updated" : "Profile created");
        reset();
        onCancel?.();
      } else {
        toast.error(res?.message || "Failed");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-3xl mx-auto"
    >
      {/* Title */}
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
        {isUpdate ? "Update Tutor Profile" : "Create Tutor Profile"}
      </h2>

      {/* Row 1: Bio + Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Bio</label>
          <textarea
            {...register("bio", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#b00ea5] focus:border-transparent transition"
            rows={4}
            placeholder="Write a short introduction..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Hourly Price ($)</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5624D0] focus:border-transparent transition"
            placeholder="e.g. 25"
          />
        </div>
      </div>

      {/* Row 2: Category + Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Category</label>
          <select
            {...register("categoryId", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#b00ea5] focus:border-transparent transition"
          >
            <option value="">Select category</option>
            {categories.data?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Subjects</label>
          <input
            type="text"
            {...register("subject", { required: true })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5624D0] focus:border-transparent transition"
            placeholder="Math, English, Physics..."
          />
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center gap-3 mt-4">
        <label className="font-semibold text-gray-700">Featured Tutor</label>
        <input
          type="checkbox"
          {...register("isFeatured")}
          className="h-5 w-5 accent-[#5624D0] cursor-pointer"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#5624D0] to-[#b00ea5] shadow-md hover:opacity-90 transition"
      >
        {isPending
          ? isUpdate
            ? "Updating..."
            : "Creating..."
          : isUpdate
          ? "Update Profile"
          : "Create Profile"}
      </button>

      {/* Cancel Button */}
      {isUpdate && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      )}
    </form>
  );
}