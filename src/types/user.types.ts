
export enum UserRoles {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
}


export interface User {
  id: string
  name: string
  email: string
  image?: string | null
  role: UserRoles
   phone?: string | null;
  status?:string | null
    _count?: {
    bookings: number;
  };

}






export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export interface AuthSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;   // ← MUST BE Date
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface SessionResponse {
  user: AuthUser;
  session: AuthSession;
}