import NextAuth, { type NextAuthOptions } from "next-auth";

import authConfig from "@/config/auth.config";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/loginerror",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // eslint-disable-next-line no-console
      // console.log("redirect", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.roles && session.user) {
        session.user.roles = token.roles as string[];
      }

      session.user.permissions = token.permissions as string[];
      session.accessToken = token.accessToken as string;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.permissions = user.permissions;
        token.accessToken = user.token; // Store JWT access token
      }

      return token;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
};

export const handler = NextAuth(authOptions);
