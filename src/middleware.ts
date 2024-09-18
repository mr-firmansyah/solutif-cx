import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = host.split(".")[0];
  // const domain = host.split(".")[1];
  // const secret = process.env.NEXTAUTH_SECRET;
  // const apiPath = process.env.NEXTAUTH_PUBLIC_API_PATH || "api";
  // if (!secret) {
  //   throw new Error("NEXTAUTH_SECRET is not defined");
  // }
  // const token = await getToken({ req: request, secret, salt: subdomain });

  // if (!token) {
  //   return NextResponse.redirect(`http://${subdomain}.${domain}/api/auth/signout`);
  // }
  
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
