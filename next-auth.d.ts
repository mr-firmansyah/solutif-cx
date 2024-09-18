import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
    token: string;
  }

  interface JWT {
    id: string;
    roles: string[];
    permissions: string[];
    accessToken: string;
  }
}
