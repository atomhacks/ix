import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Fragment } from "react";
import { getSubmission } from "../../../../lib/server";
import ActionsMenu from "./ActionsMenu";

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt || !jwt.sub) {
    redirect("/api/auth/signin");
  }

  const submission = await getSubmission(jwt.sub, params.id);
  if (!submission) {
    notFound();
  }

  const isMine = submission.team.users.map((user) => user.id).some((id) => id == jwt.sub);

  return (
    <>
      <div className="flex h-96 w-full items-center justify-center bg-black py-8 sm:h-80">
        <button>
          <ArrowLongLeftIcon className="mr-8 h-8 w-8 text-white" />
        </button>
        <div className="flex h-full w-2/6 min-w-[600px] items-center justify-center rounded-xl bg-neutral-900">
          <PhotoIcon className="h-8 w-8 text-neutral-400" />
        </div>
        <button>
          <ArrowLongRightIcon className="ml-8 h-8 w-8 text-white" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-screen-md ml-auto p-4">
          <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.name}</h1>
          <p className="text-xl">{submission.description}</p>
        </div>
        <div className="m-4 ml-auto">{isMine && <ActionsMenu />}</div>
      </div>
    </>
  );
}
