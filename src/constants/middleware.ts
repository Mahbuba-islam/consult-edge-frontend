import { NextResponse } from "next/server";
import { auth } from "./lib/auth-server";

export async function middleware(req: any) {
  const session = await auth();

  const url = req.nextUrl.pathname;

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = session.user.role;

  if (url.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (url.startsWith("/expert") && role !== "EXPERT") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (url.startsWith("/client") && role !== "CLIENT") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/expert/:path*", "/client/:path*"],
};