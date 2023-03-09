import prisma from "../../../lib/prisma";

import NextAuth from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {},
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      authorization: { params: { scope: "identify guilds role_connections.write" } },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@bxscience.edu");
      }
      if (account.provider === "discord") {
        return true;
      }
      /*
      if (account.provider === "github") {
        return true;
      }
      */
      return false;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (account.provider === "discord") {
        if (!user.accounts.find((account) => account.provider === "google")) {
          return;
        }
        await fetch(`https://discord.com/api/v10/applications/${process.env.DISCORD_ID}/role-connections/metadata`, {
          method: "PUT",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        });
        await fetch(`https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_ID}/role-connection`, {
          method: "PUT",
          body: JSON.stringify({
            platform_name: "Name",
            platform_username: user.name,
          }),
          headers: {
            Authorization: `Bearer ${account.access_token}`,
            "Content-Type": "application/json",
          },
        });
      }
    },
  },
};

export default NextAuth(authOptions);
