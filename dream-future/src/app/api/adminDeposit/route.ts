import connectDB from "@/lib/connectDB";
import Deposit from "@/models/Deposit";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    await connectDB();

    /* ================= AUTH ================= */
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      role: string;
      userId: string;
    };

    if (!["admin", "treasurer"].includes(decoded.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const depositInfo = await req.json();

    const { amount, month, method, userId, accountId } = depositInfo;
    if (!userId || !accountId || !amount || !month || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const deposit = await Deposit.create({
      userId,
      accountId,
      amount,
      month,
      method,
      depositBy: decoded.userId,
    });

    return NextResponse.json({
      message: "Deposit request submitted",
      deposit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
