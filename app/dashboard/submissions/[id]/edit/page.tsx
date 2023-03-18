import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getSubmission } from "../../../../..//lib/server";
import EditableSubmission from "./EditableSubmission";

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
      {!isMine ? (
        <>
          <h1>Access Denied Buddy</h1>
        </>
      ) : (
        <EditableSubmission submission={submission} />
      )}
    </>
  );
}
