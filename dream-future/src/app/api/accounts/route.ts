import connectDB from "@/lib/connectDB";
import Account from "@/models/Account";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      role: string;
    };

    // Admin guard
    if (decoded.role !== "admin") {
      
      return NextResponse.json(
        { ok: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const accounts = await Account.find().lean();

    return NextResponse.json({ ok: true, accounts });
  } catch (error) {
    console.error("account api route error", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
