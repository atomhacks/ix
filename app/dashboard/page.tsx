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
import SignIn from "../../components/SignIn";

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
  if (!user.formInfo) {
    redirect("/dashboard/form");
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-center">
        <span className="border-b-4 border-green-500 py-6 font-morro text-7xl md:text-5xl">DASHBOARD</span>
      </div>
      <h1 className="p-4 text-center text-xl md:text-base">
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
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <ListBulletIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Complete the form</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
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
          // onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
        >
          {" "}
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <LinkIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Link Discord account</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
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
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            <UsersIcon />
          </div>
          <h1 className="mx-4 grow text-left text-2xl md:text-sm">Create a team</h1>
          <div className="h-10 w-10 object-contain md:h-5 md:w-5">
            {" "}
            {!user.team ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
          </div>
        </Link>
      </div>
    </>
  );
}
