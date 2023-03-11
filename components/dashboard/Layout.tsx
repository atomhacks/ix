// import Sidebar from "./Sidebar";
import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen text-white bg-neutral-800 font-montserrat">
      {/* <Sidebar /> */}
      <div className="pt-4 pl-4 ml-56">{children}</div>
    </div>
  );
};

export default Layout;
