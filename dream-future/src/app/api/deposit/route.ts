import connectDB from "@/lib/connectDB";
import Deposit from "@/models/Deposit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const depositInfo = await req.json();

    const { accountId, amount, month, method, transactionId } = depositInfo;
    if (!accountId || !amount || !month || !method || !transactionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDeposit = await Deposit.create({
      accountId,
      amount,
      month,
      method,
      status: "PENDING",
      transactionId,
    });

    return NextResponse.json({
      message: "Deposit request submitted",
      deposit: newDeposit,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
