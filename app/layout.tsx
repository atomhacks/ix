import { Session } from "next-auth";
import "../styles/globals.css";

import React, { PropsWithChildren } from "react";
import { Providers } from "./Providers";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

type Props = {
  session: Session;
};

const RootLayout: React.FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="content">
          <Providers session={session}>{children}</Providers>
        </div>
        {/*         <Footer /> */}
      </body>
    </html>
  );
};

export default RootLayout;
