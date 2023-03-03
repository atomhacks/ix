import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function AlreadySubmitted() {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-800 font-montserrat text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-500">
          <QuestionMarkCircleIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">You've already submitted this form.</h1>
        <p className="text-xl text-center">
          Contact{" "}
          <a href="mailto:atomhacks@bxscience.edu" className="text-green-500 underline underline-offset-4 decoration-2">
            atomhacks@bxscience.edu
          </a>{" "}
          if you'd like to change anything.
        </p>
      </div>
    </div>
  );
}
