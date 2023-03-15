import { ArrowLongLeftIcon, ArrowLongRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getSubmission } from "../../../../lib/server";

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

  return (
    <>
      <div className="h-80 w-full py-8 bg-black flex justify-center items-center">
          <button>
            <ArrowLongLeftIcon className="w-8 h-8 text-white mr-8" />
          </button>
        <div className="bg-neutral-900 w-1/2 rounded-xl h-full flex justify-center items-center">
<PhotoIcon className="w-8 h-8 text-neutral-400" />
        </div>
        <button>
          <ArrowLongRightIcon className="w-8 h-8 text-white ml-8" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-screen-md mx-auto p-4">
          <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.name}</h1>
          <p className="text-xl">{submission.description}</p>
        </div>
      </div>
    </>
  );
}
