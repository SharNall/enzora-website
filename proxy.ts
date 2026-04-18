import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (sessionCookie !== getAdminSessionToken()) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
