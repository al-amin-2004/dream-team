import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/profile/:path*", // profile route protect
};
