"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorModal({
  open,
  onClose,
  message,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

       <Dialog.Content
  className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  bg-white rounded-xl p-6 w-full max-w-sm shadow-xl space-y-5 border border-gray-200"
>
  <VisuallyHidden>
    <Dialog.Title>Login Required</Dialog.Title>
  </VisuallyHidden>

  {/* Header */}
  <div className="flex items-center gap-2 text-[#b00ea5] text-xl font-semibold">
    <XCircle className="w-6 h-6" />
    <span>Login Required</span>
  </div>

  {/* Message */}
  <p className="text-gray-600 text-sm leading-relaxed">
    You must be logged in to book a tutoring session.  
    Please login to continue.
  </p>

  {/* Buttons */}
  <div className="flex justify-end gap-3 pt-2">
    <button
      onClick={onClose}
      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
    >
      Close
    </button>

    <Link
      href="/login"
      className="px-4 py-2 rounded-md bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white font-medium shadow hover:opacity-90 transition"
    >
      Login
    </Link>
  </div>
</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}