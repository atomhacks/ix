"use client";

import { Prisma, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import SubmitButton from "../../components/Submit";
import AddUsersModal from "./AddUsersModal";

type Props = {
  my_user: User;
  team: Prisma.TeamGetPayload<{
    include: {
      users: {
        include: {
          formInfo: true;
        };
      };
      submission: true;
    };
  }>;
  users: User[];
};

export default function UserTable({ my_user, team, users }: Props) {
  const router = useRouter();
  const [acting, setActing] = useState(false);
  const [closed, setClose] = useState(true);

  const onAction = async (id: string) => {
    const body = {
      users: [id],
    };
    setActing(true);
    const res = await fetch("/api/team/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      router.refresh();
      setActing(false);
    }
  };

  return (
    <>
      <>
        {team.users.length < 4 && !closed && (
          <AddUsersModal
            users={users}
            closed={closed}
            disabled={acting}
            currentLength={team.users.length}
            setClose={setClose}
            setDisabled={setActing}
          />
        )}
      </>
      <table className="table-fixed">
        <thead className="bg-neutral-900 text-left">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Experience</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="bg-neutral-700">
          {team.users.map((user) => (
            <tr className="text-xl" key={user.id}>
              <td className="p-4 font-bold">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.formInfo!.experience}</td>
              <td className="p-4">
                <SubmitButton className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-red-500 disabled:opacity-50"
                onClick={() => onAction(user.id)} disabled={acting} loading={acting}>
                  {user.id == my_user.id ? "Leave" : "Kick"}
                </SubmitButton>
              </td>
            </tr>
          ))}
          {team.users.length < 4 && (
            <tr className="text-xl">
              <td className="p-4 font-bold">New User</td>
              <td className="p-4"></td>
              <td className="p-4"></td>
              <td className="p-4">
                <SubmitButton onClick={() => setClose(false)} disabled={acting} loading={acting}>
                  Add
                </SubmitButton>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
