import { getUser, redirect } from "../../lib/server";

import { signIn } from "next-auth/react";

import Link from "next/link";
import { GetServerSideProps } from "next";
import { Prisma } from "@prisma/client";

type Props = {
  user: Prisma.UserGetPayload<{
    include: {
      submission: true;
    };
  }>;
};

import {
  ListBulletIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  LinkIcon,
  // UsersIcon,
} from "@heroicons/react/24/outline";

export default function Index({ user }: Props) {
  return (
    <>
      {/* {!initialized && <Setup setInitialized={setInitialized} />} */}
      <div className="flex flex-col items-center justify-center min-h-screen text-white font-montserrat">
        <h1 className="mb-2 text-6xl font-bold md:text-4xl">Dashboard</h1>
        <p className="text-2xl text-center md:my-2 md:text-base">
          The dashboard will be available when the hackathon begins!
        </p>
        {!user.initialized ? (
          <div>
            <h1 className="mt-2 text-xs text-center">
              (By the way, you haven&apos;t fully registered for the event yet. You can do so by going{" "}
              <div className="inline underline ">
                <Link href="/dashboard/setup" passHref>
                  here!
                </Link>
              </div>
              )
            </h1>
          </div>
        ) : null}
        {/* {user.submissionId ? (
            <Link href={`/dashboard/submissions/${user.submissionId}`} className="inline-block">
              <div className="p-4 mt-4 rounded-lg w-80 h-36 bg-neutral-900">
                <h2 className="mb-2 text-2xl font-bold text-teal-300">{user.submission.title}</h2>
                <p>{user.submission.description}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-center max-w-sm mt-4 rounded-lg h-36 bg-neutral-800">
              <Link href="/dashboard/create-submission">
                <button className="flex items-center justify-center w-16 h-16 duration-200 rounded-full group bg-neutral-700 hover:bg-sky-400">
                  <PlusIcon className="w-8 h-8 duration-200 fill-sky-400 group-hover:fill-white" />
                </button>
              </Link>
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
    </>
  );
}

// wishing i had app directory rn
// Dashboard.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUser(req);
  if (!user) return redirect("/");
  return {
    props: { user },
  };
};
