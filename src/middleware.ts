import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = process.env.NODE_ENV !== "development" ? host.split(".")[0] : "adira";

  if (!subdomain) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const response = NextResponse.next();

  // Set tenant in cookies or headers
  response.cookies.set("tenant", subdomain, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|static|_next/image|favicon.ico).*)"], // Adjust matcher based on your routes
};
