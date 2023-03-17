"use client";

import { FormEventHandler, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, Dialog, Transition } from "@headlessui/react";
import SubmitButton from "../../components/Submit";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function FormQuestions({ complete }: { complete: boolean }) {
  const router = useRouter();
  const [osis, setOsis] = useState("");
  const [experience, setExperience] = useState("");
  const [year, setYear] = useState("");
  const [confirmation, setConfirmation] = useState("NO");
  const [submitting, setSubmitting] = useState(false);
  const experienceLevels = ["None", "Beginner", "Intermediate", "Advanced"];
  const graduationYears = ["2023", "2024", "2025", "2026"];
  const confirmations = ["Yes", "No"];
  let [isOpen, setIsOpen] = useState(complete);

  function closeModal() {
    setIsOpen(false);
    router.refresh();
    router.push("/dashboard");
  }

  function openModal() {
    setIsOpen(true);
  }

  // We gotta use Formik or something
  const isValid = () => {
    return experience && !isNaN(+year) && confirmation == "Yes" && osis.length == 9 && !isNaN(+osis);
  };

  // to be updated
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    setSubmitting(true);
    const body = JSON.stringify({
      osis,
      experience,
      year,
    });
    const res = await fetch("/api/user/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (res.status == 201) {
      openModal();
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center border-b-8 border-green-500 bg-zinc-900 py-12 text-white">
        <form onSubmit={handleSubmit} className="w-2/5">
          <div className="mb-20 flex items-center justify-center">
            <span className="border-b-4 border-green-500 py-6 font-morro text-7xl">REGISTRATION</span>
          </div>

          <div className="mb-8 space-y-4 rounded-lg bg-zinc-300 p-4 text-black md:text-sm">
            <p>It&apos;s that time of the year again — IT&apos;S ATOMHACKS SEASON!</p>

            <p>
              Our ninth annual hackathon is here! It&apos;s an amazing opportunity for everyone to unite and build
              something they have never thought of before. It will be a creative outlet for people to plug themselves in
              and start creating!
            </p>

            <p>
              NO PRIOR KNOWLEDGE NEEDED. If you don&apos;t know how to code, it&apos;s no problem at all. We welcome you
              to come and learn through our amazing workshops. We have prizes for beginner coders, so come on down and
              create something with your friends, have fun, and take home a grand prize. There will also be swag and
              free lunch and dinner for everyone participating!
            </p>

            <p>
              The event will take place March 18th from 8 AM to 8 PM at BRONX SCIENCE. You will be able to present to a
              panel of awesome judges for a chance to win PRIZES! Team up with your friends and learn how to make
              amazing things! There will be workshops and guest speakers as well so make sure to sign up!
            </p>

            <p>
              Please check atomhacks.org for more information about the schedule and FAQs. If you have any questions
              email atomhacks@bxscience.edu.
            </p>
          </div>

          <div>
            {" "}
            <div className="flex items-center justify-center">
              {" "}
              <span className="my-4 inline-block border-b-4 border-yellow-500 text-center font-montserrat text-4xl text-white">
                What is your student OSIS?
              </span>
            </div>
            <div className="">
              <input
                className="flex w-full grow flex-row items-center rounded-lg border-2 border-white bg-transparent p-4 text-left text-xl focus:border-green-500 md:text-sm"
                type="text"
                value={osis}
                id="osis"
                name="osis"
                onInput={(e) => setOsis((e.target as HTMLInputElement).value)}
                autoComplete="OSIS"
                placeholder="9-digit number"
              />
            </div>
          </div>
          <RadioGroup value={experience} onChange={setExperience} className="my-8">
            <RadioGroup.Label>
              <div className="flex items-center justify-center">
                {" "}
                <span className="my-4 inline-block border-b-4 border-yellow-500 text-center font-montserrat text-4xl text-white">
                  What is your level of programming experience?
                </span>
              </div>
            </RadioGroup.Label>
            <div className="space-y-2">
              {experienceLevels.map((experience, i) => (
                <RadioGroup.Option
                  key={i}
                  id={experience.toLowerCase()}
                  value={experience.toUpperCase()}
                  className={({ checked }) =>
                    `${checked ? "border-green-500" : "border-white-500"}
                    flex w-full flex-row items-center rounded-lg border-2 bg-transparent p-4`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full cursor-pointer items-center justify-between">
                        <div className="flex items-center">
                          <RadioGroup.Label as="h1" className=" grow text-left text-xl md:text-sm">
                            {experience}
                          </RadioGroup.Label>
                        </div>
                        <div className="h-8 w-8 object-contain md:h-5 md:w-5">
                          <CheckCircleIcon className={!checked ? `hidden` : ``} />
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={year} onChange={setYear} className="my-8">
            <RadioGroup.Label>
              <div className="flex items-center justify-center">
                {" "}
                <span className="my-4 inline-block border-b-4 border-yellow-500 text-center font-montserrat text-4xl text-white">
                  What is your graduation year?
                </span>
              </div>
            </RadioGroup.Label>
            <div className="space-y-2">
              {graduationYears.map((year, i) => (
                <RadioGroup.Option
                  key={i}
                  id={year.toLowerCase()}
                  value={+year}
                  className={({ checked }) =>
                    `${checked ? "border-green-500" : "border-white-500"}
                    flex w-full flex-row items-center rounded-lg border-2 bg-transparent p-4`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full cursor-pointer items-center justify-between">
                        <div className="flex items-center">
                          <RadioGroup.Label as="h1" className=" grow text-left text-xl md:text-sm">
                            {year}
                          </RadioGroup.Label>
                        </div>
                        <div className="h-8 w-8  object-contain md:h-5 md:w-5">
                          <CheckCircleIcon className={!checked ? `hidden` : ``} />
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={confirmation} onChange={setConfirmation} className="my-8">
            <RadioGroup.Label>
              <div className="flex items-center justify-center">
                {" "}
                <span className="my-4 inline-block border-b-4 border-yellow-500 text-center font-montserrat text-4xl text-white">
                  I have read and I will comply with the{" "}
                  <a
                    className="text-green-500"
                    href="https://docs.google.com/document/d/1fMx-8iApjgRuAs0mH2T4yCz6WGrwTwNGHS854C-fmKQ/edit"
                  >
                    AtomHacks Code of Conduct
                  </a>{" "}
                </span>
              </div>
            </RadioGroup.Label>
            <div className="space-y-2">
              {confirmations.map((option, i) => (
                <RadioGroup.Option
                  key={i}
                  id={option.toLowerCase()}
                  value={option}
                  className={({ checked }) =>
                    `${checked ? "border-green-500" : "border-white-500"}
                    flex w-full flex-row items-center rounded-lg border-2 bg-transparent p-4`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full cursor-pointer items-center justify-between">
                        <div className="flex items-center">
                          <RadioGroup.Label as="h1" className=" grow text-left text-xl md:text-sm">
                            {option}
                          </RadioGroup.Label>
                        </div>
                        <div className="h-8 w-8  object-contain md:h-5 md:w-5">
                          <CheckCircleIcon className={!checked ? `hidden` : ``} />
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="mt-4">
            <SubmitButton type="submit" disabled={submitting || (isValid() ? false : true)} loading={submitting}>
              Submit
            </SubmitButton>
          </div>
        </form>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-[.82] " />
          </Transition.Child>

          <div className="fixed inset-0 bg-black/30 blur" aria-hidden="true" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform space-y-4 overflow-hidden rounded-2xl bg-zinc-300 p-6 text-left align-middle text-black transition-all">
                  <Dialog.Title as="h1" className="text-2xl">
                    You have completed the registration form
                  </Dialog.Title>
                  <p>
                    If you need to change anything, please email{" "}
                    <a className="text-blue-700" href="mailto: atomhacks@bxscience.edu">
                      atomhacks@bxscience.edu
                    </a>
                  </p>
                  <button
                    type="button"
                    className="relative rounded-lg border-2 border-green-500 bg-transparent py-2.5 px-5 font-bold uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-500 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
                    onClick={closeModal}
                  >
                    Back to Dashboard
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
