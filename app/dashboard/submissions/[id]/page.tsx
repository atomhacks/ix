import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getSubmission } from "../../../../lib/server";
import EditMenu from "./components/EditMenu";
import PhotoCarousel from "./components/PhotoCarousel";

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

  const isMine = submission.team?.users.map((user) => user.id).some((id) => id == jwt.sub) ?? false;

  return (
    <>
      <PhotoCarousel images={submission.media} />
      <div className="flex justify-center">
        <div className="max-w-screen-md mx-auto p-4">
          <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.name}</h1>
          <p className="mb-4 whitespace-pre-line text-xl">{submission.description}</p>
        </div>
        {isMine && <EditMenu />}
      </div>
    </>
  );
}
