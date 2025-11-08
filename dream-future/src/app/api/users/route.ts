import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token)
      return NextResponse.json(
        { ok: false, message: "No auth token" },
        { status: 401 }
      );
  } catch (error) {
    console.error("me route error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
