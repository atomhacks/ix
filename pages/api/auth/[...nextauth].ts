import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (!account || !profile) return false;
      // future GitHub integration?
      if (account.provider === "google") {
        return (profile as GoogleProfile).email_verified && (profile as GoogleProfile).email.endsWith("@bxscience.edu");
      }
      // TODO: actual error handling
      // some form of redirecting back to landing page with a red box
      // saying they used a non bxsci email
      return false;
    },
  },
};

export default NextAuth(authOptions);
