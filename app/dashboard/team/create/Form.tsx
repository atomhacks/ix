"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEventHandler, Fragment, useRef, useState } from "react";
import SubmitButton from "../../../components/SubmitButton";

type Props = {
  users: User[];
};

export default function CreateTeamForm({ users }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedUsers, _setSelectedUsers] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File>();

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const setSelectedUsers = (people: any) => {
    if (people.length >= 4) {
      return;
    }
    _setSelectedUsers(people);
  };

  const isValid = () => name != "" && selectedUsers.length <= 3;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!isValid()) {
      return;
    }

    let body: any = {
      name,
      users: selectedUsers,
    };
    if (image) {
      const imageBase64 = await toBase64(image);
      body = {
        ...body,
        image: imageBase64,
      };
    }
    const res = await fetch("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      router.push("/dashboard?complete");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-xl" htmlFor="name">
        Team Name
      </label>
      <input
        className="w-96"
        type="text"
        id="name"
        name="name"
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
        placeholder="School Appropriate Please"
      ></input>
      <label className="w-full text-base">Other Team Members (leave blank if none)</label>
      <Listbox value={selectedUsers} onChange={setSelectedUsers} multiple>
        <div className="relative mt-1 mb-4">
          <Listbox.Button className="relative h-12 w-fit min-w-[25%] cursor-pointer rounded-lg bg-neutral-700 py-2 pl-3 pr-10 text-left text-lg shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selectedUsers.map((id) => users.find((user) => user.id == id)!.name).join(", ")}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-96 overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {users.map((user) => (
                <Listbox.Option
                  key={user.id}
                  className={({ active }) =>
                    `relative cursor-default cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-neutral-600 text-teal-300" : "text-neutral-200"
                    }`
                  }
                  value={user.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{user.name}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5 text-teal-400" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <label htmlFor="image">Choose an optional image for your team</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => setImage(e.target.files![0])}
      ></input>
      <div className="mt-4 py-2">
        <SubmitButton
          disabled={submitting || (isValid() ? false : true)}
          loading={submitting}
        >
          Create
        </SubmitButton>
      </div>
    </form>
  );
}
