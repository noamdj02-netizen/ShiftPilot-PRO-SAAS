/**
 * Next.js Middleware
 * Route protection using NextAuth
 */

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type NextAuthToken = { role?: string } | null

export default withAuth(
  async function middleware(req: NextRequest & { nextauth?: { token?: NextAuthToken } }) {
    const { pathname } = req.nextUrl

    // Redirect old login routes to unified login
    if (pathname === "/login" || pathname === "/employee/login") {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Role-based access control
    if (pathname.startsWith("/dashboard") && req.nextauth?.token?.role === "employee") {
      return NextResponse.redirect(new URL("/employee", req.url))
    }
    if (pathname.startsWith("/employee") && req.nextauth?.token?.role !== "employee") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employee/:path*",
    "/login",
    "/employee/login",
  ],
}
