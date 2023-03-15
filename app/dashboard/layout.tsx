import Sidebar from "./components/SideBar";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto bg-neutral-800 font-montserrat text-white">
      <Sidebar />
      <div className="ml-56">{children}</div>
    </div>
  );
};

export default DashboardLayout;
