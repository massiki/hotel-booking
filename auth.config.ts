import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google';

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [Google],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.sub as string
      session.user.role = token.role as string
      return session
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const role = auth?.user.role
      const pathname = request.nextUrl.pathname

      const isUserRoute = pathname.startsWith("/reservation")

      const isAdminRoute = pathname.startsWith("/admin")

      if (pathname === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/', request.nextUrl))
      }

      if (isUserRoute && !isLoggedIn) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      if (isAdminRoute) {
        if (!isLoggedIn) {
          return Response.redirect(
            new URL("/login", request.nextUrl)
          );
        }

        if (role !== "admin") {
          return Response.redirect(
            new URL("/", request.nextUrl)
          );
        }
      }

      return true
    },
  },
} satisfies NextAuthConfig;