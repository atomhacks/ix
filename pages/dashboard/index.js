import { getUser, redirect } from "../../lib/server";

import { signIn } from "next-auth/react";

import Link from "next/link";

import {
  ListBulletIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  LinkIcon,
  // UsersIcon,
} from "@heroicons/react/24/outline";

export default function Index({ user }) {
  return (
    <>
      <div className="bg-zinc-900 p-8 text-white font-montserrat min-h-screen">
        <div className="flex items-center justify-center mb-8">
          <span className="py-6 border-b-4 border-green-500 md:text-5xl text-7xl font-morro">DASHBOARD</span>
        </div>
        <h1 className="p-4 text-xl md:text-base text-center">
          Please make sure that you complete all the tasks before the event begins.
        </h1>
        <div className="flex flex-col justify-around items-center gap-4">
          <Link
            className={`p-4 flex w-2/5 md:w-4/5 flex-row border-2 rounded-lg bg-transparent items-center ${
              !user.formInfo ? "border-red-500" : "border-green-500"
            }`}
            href="/dashboard/form"
          >
            {" "}
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              <ListBulletIcon />
            </div>
            <h1 className="mx-4 text-2xl md:text-sm text-left grow">Complete the form</h1>
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              {!user.formInfo ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
            </div>
          </Link>
          <button
            className={`p-4 flex w-2/5 md:w-4/5 flex-row border-2 rounded-lg bg-transparent items-center ${
              !user.accounts.find((account) => account.provider === "discord") ? "border-red-500" : "border-green-500"
            }`}
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          >
            {" "}
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              <LinkIcon />
            </div>
            <h1 className="mx-4 text-2xl md:text-sm text-left grow">Link Discord account</h1>
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              {!user.accounts.find((account) => account.provider === "discord") ? (
                <ExclamationCircleIcon />
              ) : (
                <CheckCircleIcon />
              )}
            </div>
          </button>
          {/* <Link
            className={`p-4 flex w-2/5 md:w-4/5 flex-row border-2 rounded-lg bg-transparent items-center ${
              !user.team ? "border-red-500" : "border-green-500"
            }`}
            href="/dashboard/team"
          >
            {" "}
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              <UsersIcon />
            </div>
            <h1 className="mx-4 text-2xl md:text-sm text-left grow">Create a team</h1>
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              {!user.team ? <ExclamationCircleIcon /> : <CheckCircleIcon />}
            </div>
          </Link> */}
        </div>
      </div>
    </>
  );
}

// wishing i had app directory rn
// Dashboard.Layout = Layout;

export async function getServerSideProps({ req }) {
  const user = await getUser(req);
  if (!user) return redirect("/");
  return {
    props: { user },
  };
}
