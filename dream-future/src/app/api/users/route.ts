import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const allUsers = await User.find({}).lean();
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("users api route error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
