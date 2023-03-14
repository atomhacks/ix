import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUser } from "../../../../lib/server";
import CreateSubmissionForm from "./Form";

export default async function CreateSubmissionPage() {
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

  if (!user.team) {
    redirect("/dashboard/team/create");
  }

  if (user.team.submission) {
    redirect(`/dashboard/submissions/${user.team.submission.id}`);
  }

  const tracks = [
    {
      name: "GENERAL",
      description:
        "Everyone is automatically registered for the regular track. Do your best to stick to the theme of CENSORED.",
      prizes: ["PENDING", "PENDING", "PENDING"],
      value: "GENERAL",
    },
    {
      name: "Beginner",
      description: "Your project will be up against other beginners. All groupmates must be beginners.",
      prizes: ["PENDING"],
      value: "BEGINNER",
    },
    {
      name: "Sponsorship Track",
      description: "Courtesy of SPONSOR_PENDING! Your project must feature TECHNOLOGY_PENDING.",
      prizes: ["SPONSOR_CREDITS"],
      value: "SPONSOR_PENDING",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-8 flex grow items-center justify-center rounded-lg bg-neutral-800 px-4 py-2">
      <div className="mr-12 flex basis-1/2 flex-col items-end justify-end">
        <h1 className="text-4xl font-bold">Create a submission</h1>
        <h2 className="text-neutral-400">None of these options are permanant</h2>
      </div>
      <div className="mt-2 ml-6 flex basis-1/2 items-start justify-start text-neutral-300">
        <CreateSubmissionForm tracks={tracks} />
      </div>
    </div>
  );
}
