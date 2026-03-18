import { NextRequest, NextResponse } from "next/server";

import { Roles } from "./src/constants/roles";
import { getSession } from "./src/services/user.services";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  // Load session from BetterAuth
  const session = await getSession();
  const user = session?.data?.user;

  if (user) {
    isAuthenticated = true;
    isAdmin = user.role === Roles.ADMIN;
  }

  // 1) Not logged in → redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2) Admin trying to access student/tutor dashboard
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // 3) Student/Tutor trying to access admin dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
 matcher: [
  "/dashboard",
  "/dashboard/:path*",
],

};



