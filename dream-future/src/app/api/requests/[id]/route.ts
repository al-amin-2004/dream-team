import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Request from "@/models/Request";
import Account from "@/models/Account";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

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

    /* ================= DATA ================= */
    const { action, rejectReason } = await req.json();

    const requestData = await Request.findById(id);

    console.log(requestData);

    if (!requestData)
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );

    /* ================= ACTION ================= */

    if (action === "approve") {
      await Account.findByIdAndUpdate(requestData.accountId, {
        $inc: { totalDeposit: requestData.amount },
      });

      requestData.status = "approved";
      requestData.approvedBy = decoded.userId;
    }

    if (action === "reject") {
      requestData.status = "rejected";
      requestData.rejectBy = decoded.userId;
      requestData.requestReason = rejectReason || "No reason provided!";
    }

    requestData.approvedOrRejectedAt = new Date();
    await requestData.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Request action error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
