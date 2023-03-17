import SideBar from "./components/SideBar";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto bg-zinc-900 font-montserrat text-white">
      <SideBar />
      <div className="ml-56">{children}</div>
    </div>
  );
};

export default DashboardLayout;
