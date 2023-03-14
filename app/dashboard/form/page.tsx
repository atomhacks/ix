import { getUser } from "../../../lib/server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Form from "./Form";

export const revalidate = 0;

export default async function FormPage() {
  console.log("waaaa");
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
  if (user.formInfo) redirect("/dashboard/already");

  return <Form />;
}
