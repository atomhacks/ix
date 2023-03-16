"use client";

import { FormEventHandler, useState } from "react";
import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import SubmitButton from "../../components/Submit";

type Props = {
  tracks: {
    name: string;
    description: string;
    prizes: string[];
    value: string;
  }[];
};

// TODO: form validation - handle duplicate titles
export default function CreateSubmissionForm({ tracks }: Props) {
  const [selectedTracks, selectTrack] = useState(["GENERAL"]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const isValid = () => name != "" && description != "" && selectedTracks.length != 0;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    setSubmitting(true);

    const body = JSON.stringify({
      name,
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
      router.refresh();
      router.push(`/dashboard/submissions/${json.id}`);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-base text-neutral-400" htmlFor="title">
        Title *
      </label>
      <input
        className="mt-1 mb-4 block w-full rounded-md bg-neutral-700 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
        type="text"
        id="name"
        name="name"
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
      />
      <label className="block text-base text-neutral-400" htmlFor="description">
        Description
      </label>
      <textarea
        className="text-m mt-1 mb-4 block rounded-lg bg-neutral-700 p-2 shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
        id="description"
        name="description"
        rows={10}
        cols={55}
        onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
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
                  <div className={`max-w-md text-sm ${checked ? "text-neutral-200" : "text-neutral-400"}`}>
                    <span>{track.description}</span>
                    <span className={`flex space-x-2 ${checked ? "" : "text-cyan-200"}`}>
                      <span>Prizes: </span>
                      <ol className="flex list-inside list-decimal space-x-2">
                        {track.prizes.map((prize, index) => (
                          <li key={index}>{prize}</li>
                        ))}
                      </ol>
                    </span>
                  </div>
                </div>
                <CheckIcon className={`mr-4 h-8 w-8 ${checked ? "visible" : "invisible"}`} />
              </>
            )}
          </Switch>
        ))}
      </div>
      <div className="mt-4 py-2">
        <SubmitButton loading={submitting} disabled={submitting || (isValid() ? false : true)}>
          Create
        </SubmitButton>
      </div>
    </form>
  );
}
