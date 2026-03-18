"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { deleteAccountAction } from "@/src/app/actions/userDashboard.action";
import { toast } from "sonner";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  open,
  onClose,
}: DeleteAccountModalProps) {
  const handleDelete = async () => {
    const res = await deleteAccountAction();

    if (res?.success) {
      toast("Account deleted successfully");
      window.location.href = "/";
    } else {
      toast("Something went wrong");
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
            <Dialog.Title>Delete Account</Dialog.Title>
          </VisuallyHidden>

          <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>

          <p className="text-gray-700">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}