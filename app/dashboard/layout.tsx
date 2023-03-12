import Sidebar from "../../components/dashboard/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

// Next.js docs recommends only getting data when its needed
/*
async function checkUser() {
  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt || !jwt.sub) {
    redirect("/api/auth/signin");
  }

  const user = getUser(jwt.sub);
  if (!user) {
    redirect("/api/auth/signin");
  }
}
*/

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-white bg-neutral-800 font-montserrat">
      <Sidebar />
      <div className="pt-4 pl-4 ml-56">{children}</div>
    </div>
  );
};

export default DashboardLayout;
