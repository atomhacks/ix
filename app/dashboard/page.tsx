import "server-only";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser } from "../../lib/server";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  LinkIcon,
  ListBulletIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import SignIn from "../components/SignIn";

export const dynamic = "force-dynamic";

export default async function DashboardLanding() {
  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt || !jwt.sub) {
    redirect("/api/auth/signin");
  }
  const user = await getUser(jwt.sub);
  if (!user) {
    redirect("/api/auth/signin");
  }
  // if (!user.formInfo) {
  //   redirect("/");
  // }

  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <span className="py-6 border-b-4 border-green-500 font-morro text-7xl md:text-5xl">DASHBOARD</span>
      </div>
      <h1 className="p-4 text-xl text-center md:text-base">
        Please make sure that you complete all the tasks before the event begins.
      </h1>
      <div className="flex flex-col items-center justify-around gap-4">
        <Link
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${
            !user.formInfo ? "border-red-500" : "border-green-500"
          }`}
          href="/dashboard/form"
        >
          {" "}
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            <ListBulletIcon />
          </div>
          <h1 className="mx-4 text-2xl text-left grow md:text-sm">Complete the form</h1>
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            {!user.formInfo ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
          </div>
        </Link>
        <SignIn
          provider="discord"
          callbackUrl="/dashboard"
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${
            !user.accounts.find((account) => account.provider === "discord") ? "border-red-500" : "border-green-500"
          }`}
        >
          {" "}
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 text-2xl text-left grow md:text-sm">Link Discord account</h1>
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            {!user.accounts.find((account) => account.provider === "discord") ? (
              <ExclamationCircleIcon />
            ) : (
              <CheckCircleIcon />
            )}
          </div>
        </SignIn>
        <Link
          className={`flex w-2/5 flex-row items-center rounded-lg border-2 bg-transparent p-4 md:w-4/5 ${
            !user.team ? "border-red-500" : "border-green-500"
          }`}
          href="/dashboard/team/create"
        >
          {" "}
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            <UsersIcon />
          </div>
          <h1 className="mx-4 text-2xl text-left grow md:text-sm">Create a team</h1>
          <div className="object-contain w-10 h-10 md:h-5 md:w-5">
            {" "}
            {!user.team ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
          </div>
        </Link>
      </div>
    </>
  );
}
