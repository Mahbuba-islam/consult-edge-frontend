"use client";

import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { User } from "@/src/types/user.types";

interface ManageProfilePageProps {
  user: User;
}

export default function ManageProfilePage({ user }: ManageProfilePageProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<User>(user);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Manage Profile
        <span className="block text-sm text-gray-500 mt-1">
          Update your personal information or delete your account
        </span>
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium">{profile.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{profile.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-lg font-medium">{profile.phone || "Not added"}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Update
          </button>

          <button
            onClick={() => setDeleteOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>

      <UpdateProfileModal
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
        onUpdated={(updated: User) => setProfile(updated)}
      />

      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}