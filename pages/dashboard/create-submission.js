/*
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Layout from "../../components/dashboard/Layout";

// TODO: form validation - handle duplicate titles
export default function CreateSubmission() {
  const [selectedTracks, selectTrack] = useState(["GENERAL"]);
  const router = useRouter();

  const tracks = [
    {
      name: "GENERAL",
      description:
        "Everyone is automatically registered for the regular track. Do your best to stick to the theme of CENSORED.",
      prizes: ["Airpods Pro?", "Air Fryer?", "Amazon Gift Card?"],
      value: "GENERAL",
    },
    {
      name: "Beginner",
      description: "Your project will be up against other beginners. All groupmates must be beginners.",
      prizes: ["Arduino Kit"],
      value: "BEGINNER",
    },
    {
      name: "Sponsorship Track",
      description: "Courtesy of SPONSOR_PENDING! Your project must feature TECHNOLOGY_PENDING.",
      prizes: ["SPONSOR_CREDITS"],
      value: "SPONSOR_PENDING",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    if (!title || !description) return;

    const body = JSON.stringify({
      title,
      description,
      tracks: selectedTracks,
    });

    const res = await fetch("/api/submissions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (res.status == 201) {
      const json = await res.json();
      console.log(json);
      console.log("submission created");
      router.push(`/dashboard/submissions/${json.id}`);
    }
  };

  return (
    <div className="flex grow justify-center items-center bg-neutral-800 mx-8 px-4 py-2 rounded-lg max-w-screen-xl">
      <div className="flex basis-1/2 items-end justify-end mr-12 flex-col">
        <h1 className="text-4xl">Create a submission</h1>
        <h2 className="text-neutral-400">None of these options are permanant</h2>
      </div>
      <div className="flex basis-1/2 items-start justify-start ml-6 text-neutral-300 mt-2">
        <form onSubmit={handleSubmit}>
          <label className="block text-base text-neutral-400" htmlFor="title">
            Title *
          </label>
          <input
            className="mt-1 mb-4 block text-lg p-2 rounded-md bg-neutral-700 focus:outline-none shadow-lg focus:ring focus:border-teal-600 focus:ring-teal-500"
            type="text"
            id="title"
            name="title"
          />
          <label className="block text-base text-neutral-400" htmlFor="description">
            Description
          </label>
          <textarea
            className="mt-1 mb-4 block text-m p-2 rounded-lg bg-neutral-700 focus:outline-none shadow-lg focus:ring focus:border-teal-600 focus:ring-teal-500"
            type="text"
            id="description"
            name="description"
            rows="10"
            cols="55"
          />
          <p className="mb-2 text-neutral-400">Which track(s) would you like to compete in?</p>
          <div id="tracks" className="space-y-2">
            {tracks.map((track, index) => (
              <Switch
                className={({ checked }) =>
                  `${checked ? "bg-teal-600" : "bg-neutral-700"}
                    block text-left ${
                      index == 0 ? "cursor-not-allowed" : "cursor-pointer"
                    } flex items-center rounded-lg px-4 py-2 shadow-md`
                }
                disabled={index == 0}
                checked={selectedTracks.includes(track.value)}
                key={index}
                onChange={(state) =>
                  state
                    ? selectTrack([...selectedTracks, track.value])
                    : selectTrack(selectedTracks.filter((t) => t !== track.value))
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex flex-col">
                      <span className={`text-sm ${checked ? "text-white" : ""}`}>{track.name}</span>
                      <div className={`text-sm max-w-md ${checked ? "text-neutral-200" : "text-neutral-400"}`}>
                        <span>{track.description}</span>
                        <span className={`flex space-x-2 ${checked ? "" : "text-cyan-200"}`}>
                          <span>Prizes: </span>
                          <ol className="flex space-x-2 list-decimal list-inside">
                            {track.prizes.map((prize, index) => (
                              <li key={index}>{prize}</li>
                            ))}
                          </ol>
                        </span>
                      </div>
                    </div>
                    <CheckIcon className={`w-8 h-8 mr-4 ${checked ? "visible" : "invisible"}`} />
                  </>
                )}
              </Switch>
            ))}
          </div>
          <div className="mt-4 py-2">
            <button
              type="submit"
              className="transition duration-200 inline-flex justify-center rounded-md border border-transparent bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateSubmission.Layout = Layout;
*/