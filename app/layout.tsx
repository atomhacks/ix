import { Session } from "next-auth";
import "../styles/globals.css";

import React, { PropsWithChildren, Suspense } from "react";
import { Providers } from "./components/Providers";
import NavBar from "./components/NavBar";

import Loading from "./loading";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

type Props = {
  session: Session;
};

const RootLayout: React.FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className={`${montserrat.variable} content`}>
          <Providers session={session}>{children}</Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
