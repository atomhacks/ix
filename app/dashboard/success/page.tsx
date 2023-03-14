import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Success() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-800 font-montserrat text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500">
          <CheckIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Success!</h1>
        <p className="text-center text-xl">You are now registered for Atomhacks IX</p>
        <p className="text-center text-xl">Look out for any emails and see you on March 18th!</p>
        <Link href="/dashboard?complete" className="text-green-500 underline decoration-2 underline-offset-4">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
