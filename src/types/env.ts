import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  // ⭐ Server-side env (used in server actions)
  server: {
    API_URL: z.string().url(),
  },

  // ⭐ Client-side env (browser)
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.url(),
    NEXT_PUBLIC_FRONTEND_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_AUTH_URL: z.url(),
  },

  runtimeEnv: {
    // server
    API_URL: process.env.API_URL,

    // client
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },
})