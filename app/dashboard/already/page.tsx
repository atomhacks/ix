import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function AlreadySubmitted() {
  return (
    <div className="flex items-center justify-center h-screen text-white bg-neutral-800 font-montserrat">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-yellow-500 rounded-full">
          <QuestionMarkCircleIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold md:text-center">You&apos;ve already submitted this form.</h1>
        <p className="text-xl text-center md:text-base md:px-3">
          Contact{" "}
          <a href="mailto:atomhacks@bxscience.edu" className="text-green-500 underline underline-offset-4 decoration-2">
            atomhacks@bxscience.edu
          </a>{" "}
          if you&apos;d like to change anything.
        </p>
      </div>
    </div>
  );
}
