"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

type Props = {
  session: Session;
};

export const Providers: React.FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return (
    <ParallaxProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ParallaxProvider>
  );
};
