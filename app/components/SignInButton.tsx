"use client";

import { useSession, signIn } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <button
      className="relative font-bold border-green-500 border-2 rounded-lg bg-transparent py-2.5 px-5 uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-500 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      {session ? "Sign In" : "Sign Up"}
    </button>
  );
}
