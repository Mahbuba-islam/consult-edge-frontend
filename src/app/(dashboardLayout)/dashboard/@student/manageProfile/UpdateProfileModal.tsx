"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { updateStudentProfileAction } from "@/src/app/actions/userDashboard.action";
import { User } from "@/src/types/user.types";

interface UpdateProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: User;
  onUpdated: (updated: User) => void;
}

export default function UpdateProfileModal({
  open,
  onClose,
  profile,
  onUpdated,
}: UpdateProfileModalProps) {
  // ⭐ State initializes from props because component remounts
  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone || "");

  const handleSubmit = async () => {
    const res = await updateStudentProfileAction({ name, phone });

    if (res?.success && res.data) {
      onUpdated(res.data);
      onClose();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl 
          w-full max-w-sm space-y-4 shadow-lg"
        >
          <VisuallyHidden>
            <Dialog.Title>Update Profile</Dialog.Title>
          </VisuallyHidden>

          <h2 className="text-xl font-semibold">Update Profile</h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                className="w-full border rounded-md p-2 mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                className="w-full border rounded-md p-2 mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}