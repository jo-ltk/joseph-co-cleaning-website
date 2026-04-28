import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin/portfolio"];
const publicRoutes = ["/admin/login", "/admin/forgot-password", "/admin/login/verify", "/admin/reset-password"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie ONLY if needed
  let session = null;
  if (isProtectedRoute || isPublicRoute) {
    const cookie = req.cookies.get("session")?.value;
    session = cookie ? await decrypt(cookie) : null;
  }

  // 4. Redirect to /admin/login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  // 5. Redirect to /admin/portfolio if the user is authenticated
  if (isPublicRoute && session && !path.startsWith("/admin/portfolio")) {
    return NextResponse.redirect(new URL("/admin/portfolio", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
