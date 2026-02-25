import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/lib/utils/RouteManager";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies or headers
  const token =
    request.cookies.get("accessToken")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Auth routes (login, register)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If accessing auth route with token, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (static files)
     * - media (static media files)
     * - icons (icon files)
     *
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|media|icons).*)",
  ],
};
