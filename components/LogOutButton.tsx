"use client";

import { logoutAction } from "@/src/app/(commonLayout)/(authRouteGroup)/logOut/_action";


export function LogOutButton() {
  return (
    <div
      onClick={async () => {
        await logoutAction();
      }}
      className="cursor-pointer text-red-600"
    >
      Logout
    </div>
  );
}
