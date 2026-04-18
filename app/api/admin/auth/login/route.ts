import { NextRequest, NextResponse } from "next/server";
import { adminLogin } from "@/lib/firebase/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await adminLogin(email, password);

    if (!result.success || !result.token || !result.user) {
      return NextResponse.json(
        { error: result.error || "Login failed" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        user: result.user,
      },
      { status: 200 }
    );

    // Set Firebase ID token in httpOnly cookie
    response.cookies.set("firebase_token", result.token, {
      httpOnly: true,
      secure: true, // Always secure for Firebase tokens
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    // Set user UID in regular cookie for client-side checks
    response.cookies.set("admin_uid", result.user.uid, {
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
