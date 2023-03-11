"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type Props = {
  session: Session;
};

export const Providers: React.FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
