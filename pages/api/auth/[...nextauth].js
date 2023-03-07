import prisma from "../../../lib/prisma";

import NextAuth from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// import GitHubProvider from "next-auth/providers/github";

const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_ID}/role-connections/metadata`;

const body = [];

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
    async signIn({ account }) {
      if (account.provider === "discord") {
        const res = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        });
        if (res.ok) {
          const url = `https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_ID}/role-connection`;
          const accessToken = account.access_token;
          const body = {
            platform_name: "atomhacks.org",
          };
          const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`Error pushing discord metadata: [${response.status}] ${response.statusText}`);
          }
        } else {
          //throw new Error(`Error pushing discord metadata schema: [${response.status}] ${response.statusText}`);
          const data = await res.text();
          console.log(data);
        }
      }
    },
  },
};

export default NextAuth(authOptions);

/*

Here's the plan:



*/
