import Sidebar from "./components/SideBar";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-neutral-800 font-montserrat text-white overflow-auto">
      <Sidebar />
      <div className="ml-56 pt-4 ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
