import connectDB from "@/lib/connectDB";
import { cookies } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateUsername } from "@/lib/generateUsername";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.json();

  //  check existsting email
  const existsEmail = await User.findOne({ email: formData.email });
  if (existsEmail) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }

  // Generate a unique username
  const username = generateUsername(formData.firstName);

  //  Password has hashed with bcrypt
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  const newUser = new User({
    ...formData,
    password: hashedPassword,
    username: username,
  });
  await newUser.save();

  
  // Cookie set with JWT
  if (!jwtSecret) throw new Error("JWT_SECRET is not defined!");

  const token = jwt.sign({ email: newUser.email }, jwtSecret);

  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 24 * 60 * 60,
    path: "/",
    priority: "high",
  });

  return new Response(JSON.stringify({ message: "User created" }), {
    status: 201,
  });
}
