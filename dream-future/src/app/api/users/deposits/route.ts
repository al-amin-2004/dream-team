import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Deposit from "@/models/Deposit";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await connectDB();

    const getCookies = await cookies();
    const token = getCookies.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ messsage: "Unauthorized" }, { status: 401 });
    }

    const decode = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    const histories = await Deposit.find({ userId: decode.userId }).sort({
      createdAt: -1,
    });
    
    return NextResponse.json({ ok: true, histories });
  } catch (error) {
    console.error("user/Histories error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
