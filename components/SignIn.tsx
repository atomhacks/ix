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
    <button
      className={
        className
          ? className
          : "relative rounded-lg border-2 border-green-500 bg-transparent py-2.5 px-5 font-bold uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-500 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
      }
      onClick={() => signIn(provider, { callbackUrl: callbackUrl })}
      {...props}
    >
      {children}
    </button>
  );
}
