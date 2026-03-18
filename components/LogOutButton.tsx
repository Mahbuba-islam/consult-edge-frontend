"use client"


import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function LogOutButton() {
  const router = useRouter()

  return (
    <div
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => router.push("/login")
          }
        })
      }}
      className="cursor-pointer text-red-600"
    >
      Logout
    </div>
  )
}