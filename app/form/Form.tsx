"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";

export default function Form() {
  const router = useRouter();
  const [osis, setOsis] = useState("");
  const [experience, setExperience] = useState("BEGINNER");
  const [year, setYear] = useState("");
  const [confirmation, setConfirmation] = useState("NO");
  const experienceLevels = ["None", "Beginner", "Intermediate", "Advanced"];
  const graduationYears = ["2023", "2024", "2025", "2026"];
  const confirmations = ["YES", "NO"];

  // We gotta use Formik or something
  const isValid = () => {
    return experience && !isNaN(+year) && confirmation == "YES" && osis.length == 9 && !isNaN(+osis);
  };

  // to be updated
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }

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
      router.push("/dashboardnew/success");
    }
  };
  return (
    <div className="min-h-screen text-white bg-neutral-800 font-montserrat">
      <div className="max-w-screen-lg pt-4 p-4 mx-auto mt-2 text-neutral-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <h1 className="mt-4 text-6xl font-bold md:text-4xl">Atomhacks IX Registration</h1>
            <div className="space-y-4 md:text-sm">
              <p>It&apos;s that time of the year again — IT&apos;S ATOMHACKS SEASON!</p>

              <p>
                Our ninth annual hackathon is here! It&apos;s an amazing opportunity for everyone to unite and build
                something they have never thought of before. It will be a creative outlet for people to plug themselves
                in and start creating!
              </p>

              <p>
                NO PRIOR KNOWLEDGE NEEDED. If you don&apos;t know how to code, it&apos;s no problem at all. We welcome
                you to come and learn through our amazing workshops. We have prizes for beginner coders, so come on down
                and create something with your friends, have fun, and take home a grand prize. There will also be swag
                and free lunch and dinner for everyone participating!
              </p>

              <p>
                The event will take place March 18th from 8 AM to 8 PM at BRONX SCIENCE. You will be able to present to
                a panel of awesome judges for a chance to win PRIZES! Team up with your friends and learn how to make
                amazing things! There will be workshops and guest speakers as well so make sure to sign up!
              </p>

              <p>
                Please check atomhacks.org for more information about the schedule and FAQs. If you have any questions
                email atomhacks@bxscience.edu.
              </p>
            </div>
          </div>
          <label className="block text-base text-neutral-400" htmlFor="osis">
            OSIS:
          </label>
          <input
            className="block p-2 mt-1 mb-4 text-xl rounded-md shadow-lg bg-neutral-700 focus:outline-none focus:ring focus:border-teal-600 focus:ring-teal-500"
            type="text"
            value={osis}
            id="osis"
            name="osis"
            onInput={(e) => setOsis((e.target as HTMLInputElement).value)}
            autoComplete="OSIS"
          />
          <RadioGroup value={experience} onChange={setExperience}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">What is your level of programming experience?</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {experienceLevels.map((experience, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-teal-600" : "bg-neutral-700"} cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                  }
                  key={index}
                  id={experience.toLowerCase()}
                  value={experience.toUpperCase()}
                >
                  <span>{experience}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={year} onChange={setYear}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">Graduation Year</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {graduationYears.map((year, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-teal-600" : "bg-neutral-700"} cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                  }
                  key={index}
                  id={year.toLowerCase()}
                  value={+year}
                >
                  <span>{year}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={confirmation} onChange={setConfirmation}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">
                Do you agree to the terms of the{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-500 underline underline-offset-4 decoration-2"
                  href="https://docs.google.com/document/d/1fMx-8iApjgRuAs0mH2T4yCz6WGrwTwNGHS854C-fmKQ/edit"
                >
                  Bronx Science AtomHacks Code of Conduct?
                </a>{" "}
                If you do not agree to these terms, you may not participate in this event.
              </p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {confirmations.map((option, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-teal-600" : "bg-neutral-700"} cursor-pointer rounded-lg px-4 py-2 shadow-md w-2/5`
                  }
                  key={index}
                  id={option ? "yes" : "no"}
                  value={option}
                >
                  <span>{option ? "Yes" : "No"}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="mt-4">
            <button
              type="submit"
              disabled={isValid() ? false : true}
              className="inline-flex justify-center px-4 py-2 mt-4 mb-8 text-sm font-medium text-white transition duration-200 bg-teal-500 border border-transparent rounded-md hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-teal-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
