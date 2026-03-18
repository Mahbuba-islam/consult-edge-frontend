"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export type AuthSession = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
};



export function useSession() {
  const [session, setSession] = useState<AuthSession | null>(null);


  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res.data || null);
    });
  }, []);

  return session;
}
