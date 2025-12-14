import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(req: Request) {
  try {
    await connectDB();

    // 1. Read Token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "No auth token" },
        { status: 401 }
      );
    }

    // 2. Decode token
    let decoded: JwtPayload & { email: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        email: string;
      };
    } catch (err) {
      return NextResponse.json(
        { ok: false, message: "Invalid or expired token", err },
        { status: 401 }
      );
    }

    // 3. Read form raw body (JSON)
    const body = await req.json();
    

    // 4. Update user
    const updatedUser = await User.findOneAndUpdate(
      { email: decoded.email },
      {
        $set: {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          gender: body.gender,
          blood: body.blood,
          nationality: body.nationality,
          address: body.address,
          birthday: body.birthday,
          avatar: body.avatar,
          avatarId: body.avatarId,
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("user/update error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
