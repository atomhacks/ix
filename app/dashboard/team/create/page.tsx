"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef, useState } from "react";

export default function CreateTeam() {
  const people = useRef([
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [selected, _setSelected] = useState([people.current[0]]);

  const setSelected = (person: any) => {
    if (selected.length == 3) {
      return;
    }
    _setSelected(person);
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-2 flex p-4 pt-4">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-white">Create Team</h1>
        <div className="w-11/12">
          <form>
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
            <label className="text-xl">Team Members</label>
            <Listbox value={selected} onChange={setSelected} multiple>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-fit min-w-full cursor-pointer rounded-lg bg-neutral-700 py-2 pl-3 pr-10 text-left text-lg shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.map((person) => person.name).join(", ")}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.current.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-neutral-600 text-teal-300" : "text-neutral-200"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                              {`${person.name} ${selected}`}
                            </span>
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
          </form>
        </div>
      </div>
    </div>
  );
}
