"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  onDashboard: () => void;
  onHome: () => void;
}

export default function SuccessModal({
  open,
  onClose,
  onDashboard,
  onHome,
}: SuccessModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-xl p-6 w-full max-w-sm shadow-lg space-y-4"
        >
          <VisuallyHidden>
            <Dialog.Title>Booking Successful</Dialog.Title>
          </VisuallyHidden>

          <div className="flex items-center gap-2 text-green-600 text-xl font-semibold">
            <CheckCircle className="w-6 h-6" />
            <span>Booking Successful</span>
          </div>

          <p className="text-gray-600">
            Your tutoring session has been booked successfully.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={onDashboard}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Go to Dashboard
            </button>

            <button
              onClick={onHome}
              className="w-full border py-2 rounded-md hover:bg-gray-100 transition"
            >
              Go to Home
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}