import Sidebar from "../../components/dashboard/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";
import React, { ReactElement } from "react";

export const metadata = {
  title: "Dashboard",
};
async function checkUser() {
  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: jwt.sub,
    },
  });
  if (!user) {
    redirect("/api/auth/signin");
  }
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await checkUser();

  return (
    <div className="min-h-screen text-white bg-neutral-800 font-montserrat">
      <Sidebar />
      <div className="pt-4 pl-4 ml-56">{children}</div>
    </div>
  );
};

export default DashboardLayout;
