import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken, isValidAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!isValidAdminCredentials(username, password)) {
      return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, getAdminSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
