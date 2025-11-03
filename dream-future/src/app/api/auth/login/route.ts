import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    await connectDB();

    const userInfo = await req.json();

    // check existsting email
    const existsEmail = await User.findOne({ email: userInfo.email });
    if (!existsEmail) {
      return new Response(JSON.stringify({ message: "Something is wrong!" }), {
        status: 400,
      });
    }

    //  check hashed Password with bcrypt
    const validPassword = await bcrypt.compare(
      userInfo.password,
      existsEmail.password
    );

    if (!validPassword) {
      return new Response(JSON.stringify({ message: "Something is wrong!" }), {
        status: 401,
      });
    }

    // Cookie set with JWT
    if (!jwtSecret) throw new Error("JWT_SECRET is not defined!");
    const token = jwt.sign({ email: existsEmail.email }, jwtSecret);

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 24 * 60 * 60,
      path: "/",
      priority: "high",
    });

    return new Response(JSON.stringify({ message: "User login successful" }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
