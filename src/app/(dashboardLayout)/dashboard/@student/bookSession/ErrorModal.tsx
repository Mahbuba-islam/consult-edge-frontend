"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { XCircle } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({
  open,
  onClose,
  message,
}: ErrorModalProps) {
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
            <Dialog.Title>Error</Dialog.Title>
          </VisuallyHidden>

          <div className="flex items-center gap-2 text-red-600 text-xl font-semibold">
            <XCircle className="w-6 h-6" />
            <span>Error</span>
          </div>

          <p className="text-gray-600">{message}</p>

          <button
            onClick={onClose}
            className="w-full border py-2 rounded-md hover:bg-gray-100 transition"
          >
            Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}