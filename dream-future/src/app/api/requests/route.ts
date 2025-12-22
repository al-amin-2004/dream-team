import connectDB from "@/lib/connectDB";
import Request from "@/models/Request";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const requests = await Request.find().lean();
    return NextResponse.json({ ok: true, requests });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Server errorr" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const requestInfo = await req.json();

    const { userId, accountId, amount, month, method, transactionId } =
      requestInfo;
    if (
      !userId ||
      !accountId ||
      !amount ||
      !month ||
      !method ||
      !transactionId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const request = await Request.create({
      userId,
      accountId,
      amount,
      month,
      method,
      transactionId,
    });

    return NextResponse.json({
      message: "Request request submitted",
      request,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
