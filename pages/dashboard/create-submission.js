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
      router.push(`/dashboard/submissions/${json.id}`);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-screen-xl px-4 py-2 mx-8 rounded-lg grow bg-neutral-800">
      <div className="flex flex-col items-end justify-end mr-12 basis-1/2">
        <h1 className="text-4xl">Create a submission</h1>
        <h2 className="text-neutral-400">None of these options are permanant</h2>
      </div>
      <div className="flex items-start justify-start mt-2 ml-6 basis-1/2 text-neutral-300">
        <form onSubmit={handleSubmit}>
          <label className="block text-base text-neutral-400" htmlFor="title">
            Title *
          </label>
          <input
            className="block p-2 mt-1 mb-4 text-lg rounded-md shadow-lg bg-neutral-700 focus:outline-none focus:ring focus:border-teal-600 focus:ring-teal-500"
            type="text"
            id="title"
            name="title"
          />
          <label className="block text-base text-neutral-400" htmlFor="description">
            Description
          </label>
          <textarea
            className="block p-2 mt-1 mb-4 rounded-lg shadow-lg text-m bg-neutral-700 focus:outline-none focus:ring focus:border-teal-600 focus:ring-teal-500"
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
          <div className="py-2 mt-4">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition duration-200 bg-teal-500 border border-transparent rounded-md hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
