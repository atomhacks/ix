"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function SignIn({
  provider,
  callbackUrl,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: string;
  callbackUrl: string;
  children?: React.ReactNode;
}) {
  return (
    <button className={className} onClick={() => signIn(provider, { callbackUrl: callbackUrl })} {...props}>
      {children}
    </button>
  );
}
