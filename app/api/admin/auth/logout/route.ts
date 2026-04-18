import { NextRequest, NextResponse } from "next/server";
import { adminLogout } from "@/lib/firebase/auth";

export async function POST(request: NextRequest) {
  try {
    await adminLogout();

    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear cookies
    response.cookies.set("firebase_token", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("admin_uid", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
