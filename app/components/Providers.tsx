"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  session: Session;
};

export const Providers: React.FC<React.PropsWithChildren<Props>> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
