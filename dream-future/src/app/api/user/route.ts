import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "No auth token" },
        { status: 401 }
      );
    }
    if (token) {
      console.log("asdasd");
    }

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      email: string;
    };

    const user = await User.findOne({ email: decode.email })
      .select("-password")
      .lean();

    if (!user)
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("me route error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
