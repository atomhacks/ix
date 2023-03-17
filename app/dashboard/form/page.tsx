import { getUser } from "../../../lib/server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import FormQuestions from "./components/FormQuestions";

export const revalidate = 0;

export default async function Form() {
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

  return <FormQuestions complete={user.formInfo !== null} />;
}
