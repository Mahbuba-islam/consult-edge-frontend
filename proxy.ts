import { NextRequest, NextResponse } from "next/server";

import { getNewTokensWithRefreshToken, getUserInfo } from "@/src/services/auth.services";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtilis";
import { jwtUtils } from "./lib/jwtUtilis";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refreshed = await getNewTokensWithRefreshToken(refreshToken);
    return !!refreshed;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;

    // Read cookies
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // Validate access token
    const decoded = accessToken
      ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!).data
      : null;

    const isValidAccessToken = accessToken
      ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!).success
      : false;

    let userRole: UserRole | null = decoded?.role ?? null;

    // SUPER_ADMIN → ADMIN unify
    if (userRole === "ADMIN") userRole = "ADMIN";

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // 🔥 Auto-refresh token if expiring soon
    if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken!))) {
      const headers = new Headers(request.headers);
      const refreshed = await refreshTokenMiddleware(refreshToken);

      if (refreshed) headers.set("x-token-refreshed", "1");

      return NextResponse.next({ request: { headers } });
    }

    // 🔥 Rule 1: Logged-in users cannot visit auth pages
    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== "/verify-email" &&
      pathname !== "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole!), request.url)
      );
    }

    // 🔥 Rule 2: Reset password logic
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (accessToken && email) {
        const userInfo = await getUserInfo();
        if (userInfo.needPasswordChange) return NextResponse.next();
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
      }

      if (email) return NextResponse.next();

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // 🔥 Rule 3: Public route → allow
    if (routeOwner === null) return NextResponse.next();

    // 🔥 Rule 4: Protected route but no token → redirect to login
    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // 🔥 Rule 5: Email verification + password change enforcement
    const userInfo = await getUserInfo();

    if (userInfo) {
      // Email not verified → force verify page
      if (!userInfo.emailVerified) {
        if (pathname !== "/verify-email") {
          const verifyUrl = new URL("/verify-email", request.url);
          verifyUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(verifyUrl);
        }
        return NextResponse.next();
      }

      // Email verified but user tries to access verify page
      if (userInfo.emailVerified && pathname === "/verify-email") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
      }

      // Need password change → force reset page
      if (userInfo.needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetUrl = new URL("/reset-password", request.url);
          resetUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(resetUrl);
        }
        return NextResponse.next();
      }

      // Password already changed but user tries to access reset page
      if (!userInfo.needPasswordChange && pathname === "/reset-password") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
      }
    }

    // 🔥 Rule 6: Common protected route → allow
    if (routeOwner === "COMMON") return NextResponse.next();

    // 🔥 Rule 7: Role-based route protection
    if (["ADMIN", "EXPERT", "CLIENT"].includes(routeOwner!)) {
      if (routeOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole!), request.url)
        );
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Error in proxy middleware:", err);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};