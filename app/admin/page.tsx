import { User, Team, Submission } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

import { getSignedUsers } from "../../lib/server";

export default async function Admin() {
  let currentUser: User | null = null;
  const fetchedUsers = await getSignedUsers();
  // const [user, setUser] = useState<User>();
  //  & { team: Team & { submission: Submission } }

  return (
    <div className="grid min-h-screen grid-cols-2 gap-8 px-12 py-8 text-white bg-neutral-900">
      
    </div>
  );
}
