"use client";
import { useRouter } from "next/navigation";

import { setActiveAction, setBanAction } from "@/src/app/actions/user.action";
import { useTransition } from "react";

import { toast } from "sonner";
import { User} from "@/src/types/user.types";

export default function ManageUserButtons({ user }: {user:User}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  const isBanned = user.status === "BANNED";

  function handleBanToggle() {
    startTransition(async () => {
      if (isBanned) {
        await setActiveAction(user.id);
        toast.success("User unbanned successfully");
      } else {
        await setBanAction(user.id);
        toast.success("User banned successfully");
      }
       router.refresh();

    });
  }

  return (
    <div className="flex gap-2">

      {/* STATUS BUTTON (not clickable) */}
      <button
        disabled
        className={`px-3 py-1 rounded border text-sm cursor-default ${
          isBanned
            ? "bg-red-600 text-white border-red-700"
            : "bg-green-600 text-white border-green-700"
        }`}
      >
        {isBanned ? "Banned" : "Active"}
      </button>

      {/* BAN / UNBAN BUTTON */}
      <button
        onClick={handleBanToggle}
        disabled={isPending}
        className={`px-3 py-1 rounded text-sm text-white ${
          isBanned ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {isPending ? "Updating..." : isBanned ? "Unban" : "Ban"}
      </button>
    </div>
  );
}