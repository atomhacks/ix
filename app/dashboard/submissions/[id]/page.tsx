import { GetServerSideProps } from "next";
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
    <div className="max-w-screen-md p-2 py-6 mx-auto">
      <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.name}</h1>
      <p className="text-xl">{submission.description}</p>
    </div>
  );
}