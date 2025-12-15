import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Account from "@/models/Account";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    const accounts = await Account.find({ userId: decoded.userId })
      .sort({ createdAt: 1 })
      .lean();

    if (accounts.length === 0) {
      return NextResponse.json(
        { ok: false, message: "account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, accounts });
  } catch (error) {
    console.error("accounts route error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    await Account.create({
      userId: decoded.userId,
    });

    return NextResponse.json({
      ok: true,
      message: "New account created",
    });
  } catch (error) {
    console.error("accounts route error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
