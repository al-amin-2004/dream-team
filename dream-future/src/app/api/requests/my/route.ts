import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Request from "@/models/Request";

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

    const requests = await Request.find({
      userId: decode.userId,
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ ok: true, requests });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Server errorr" },
      { status: 500 }
    );
  }
}
