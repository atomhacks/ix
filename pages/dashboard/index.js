import { getUser, redirect } from "../../lib/server";

import { signIn } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

import DiscordImage from "../../public/icons/discord.png";
import { ListBulletIcon, ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Dashboard({ user }) {
  // const router = useRouter();
  // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  // const setInitialized = (val) => {
  //   _setInitialized(val);
  //   router.replace(router.asPath);
  // };

  return (
    <>
      <div className="bg-zinc-900 p-8 text-white font-montserrat min-h-screen">
        {/* {!initialized && <Setup setInitialized={setInitialized} />} */}
        <div className="flex items-center justify-center mb-8">
          <span className="py-6 border-b-4 border-green-500 md:text-5xl text-7xl font-morro">DASHBOARD</span>
        </div>
        <h1 className="p-4 text-xl md:text-base text-center">
          Please make sure that you complete all the tasks before the event begins.
        </h1>
        <div className="flex flex-col justify-around items-center gap-4">
          <Link
            className={`p-4 flex w-1/2 md:w-4/5 flex-row font-bold border-2 rounded-lg bg-transparent items-center ${
              !user.initialized ? "border-red-500" : "border-green-500"
            }`}
            href="/dashboard/setup"
          >
            {" "}
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              <ListBulletIcon alt="Form"></ListBulletIcon>
            </div>
            <h1 className="text-4xl md:text-sm text-center grow">Complete the form</h1>
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              {!user.initialized ? (
                <ExclamationCircleIcon alt="Incomplete"></ExclamationCircleIcon>
              ) : (
                <CheckCircleIcon alt="Completed"></CheckCircleIcon>
              )}
            </div>
          </Link>
          <button
            className={`p-4 flex w-1/2 md:w-4/5 flex-row font-bold border-2 rounded-lg bg-transparent items-center ${
              !user.accounts.find((account) => account.provider === "discord") ? "border-red-500" : "border-green-500"
            }`}
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
          >
            {" "}
            <div>
              {" "}
              <Image className="object-contain h-10 w-10 md:h-5 md:w-5" src={DiscordImage} alt="Discord"></Image>
            </div>
            <h1 className="text-4xl md:text-sm text-center grow">Verify Discord account</h1>
            <div className="object-contain h-10 w-10 md:h-5 md:w-5">
              {" "}
              {!user.accounts.find((account) => account.provider === "discord") ? (
                <ExclamationCircleIcon alt="Incomplete"></ExclamationCircleIcon>
              ) : (
                <CheckCircleIcon alt="Completed"></CheckCircleIcon>
              )}
            </div>
          </button>

          {/*<h1 className="mt-2 text-xs text-center">
            (By the way, you haven&apos;t fully registered for the event yet. You can do so by going{" "}
            <div className="inline underline ">
              <Link href="/dashboard/setup" passHref>
                here!
              </Link>
            </div>
            )
          </h1>*/}

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
            </div>
          )} */}
        </div>
        {/* <div className="">
          {" "}
          <Image className="rounded-full" src={user.image} alt="Profile Picture" width={96} height={96} />
          <h1>
            {user.name} - {user.osis}
          </h1>
          <h1>Email: {user.email}</h1>
          <h1>Experience: {user.experience}</h1>
        </div> */}
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
