import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/login",
    "/admin/dashboard/:path*",
    "/admin/manage-room/:path*",
    "/reservation/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)"
  ],
};