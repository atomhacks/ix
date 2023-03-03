import { CheckIcon } from "@heroicons/react/24/outline";

export default function Success() {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-800 font-montserrat text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-500">
          <CheckIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Success!</h1>
        <p className="text-xl text-center">You are now registered for Atomhacks IX</p>
        <p className="text-xl text-center">Look out for any emails and see you on March 18th!</p>
      </div>
    </div>
  );
}
