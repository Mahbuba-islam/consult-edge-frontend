import "better-auth/react";

declare module "better-auth/react" {
  interface SessionUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: "ADMIN" | "EXPERT" | "CLIENT";
  }
}