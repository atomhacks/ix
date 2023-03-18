import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import { getUser } from "../../../../lib/server";
import UserTable from "./UserTable";

export default async function ManageTeamPage() {
  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt || !jwt.sub) {
    redirect("/api/auth/signin");
  }
  const my_user = await getUser(jwt.sub);
  if (!my_user) {
    redirect("/api/auth/signin");
  }

  if (!my_user.team) {
    redirect("/dashboard/team/create");
  }

  const { team } = my_user;

  const users = await prisma.user.findMany({
    where: {
      NOT: [
        {
          id: {
            in: team.users.map((user) => user.id),
          },
        },
        {
          formInfo: null,
        },
      ],
      team: null,
    },
  });

  return (
    <div className="m-2 flex justify-center">
      {team.image && (
        <div className="relative m-4 mr-8 h-64 w-64">
          <Image src={team.image} className="rounded-xl object-cover" fill alt="Team Image" />
        </div>
      )}
      <div className="max-w-screen-md p-4">
        <h1 className="mb-4 text-6xl font-bold text-green-500">{team.name}</h1>
        <p className="mb-8 whitespace-pre-line text-4xl">
          Submission:{" "}
          {team.submission ? (
            <a
              className="font-bold text-green-500 underline underline-offset-4"
              href={`/dashboard/submissions/${team.submission.id}`}
            >
              {team.submission.name}
            </a>
          ) : (
            "None"
          )}
        </p>
        <p className="mb-4 text-3xl">Members:</p>
        <UserTable my_user={my_user} team={team} users={users} />
      </div>
    </div>
  );
}
