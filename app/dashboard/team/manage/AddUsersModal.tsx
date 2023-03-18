"use client";

import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import SubmitButton from "../../components/Submit";

type Props = {
  users: User[];
  closed: boolean;
  disabled: boolean;
  currentLength: number;
  setClose: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export default function AddUsersModal({ users, closed, disabled, currentLength, setClose, setDisabled }: Props) {
  const router = useRouter();
  const [selectedUsers, _setSelectedUsers] = useState<string[]>([]);

  const setSelectedUsers = (people: any) => {
    if (people.length + currentLength >= 4) {
      return;
    }
    _setSelectedUsers(people);
  };

  const onAdd = async () => {
    if (selectedUsers.length + currentLength >= 4) {
      return;
    }
    const body = {
      users: selectedUsers,
    };

    const res = await fetch("/api/team/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      setClose(true);
      router.refresh();
      setDisabled(false);
    }
  };

  return (
    <Transition appear show={!closed} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setClose(true)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                  Add Users
                </Dialog.Title>
                <Listbox value={selectedUsers} onChange={setSelectedUsers} multiple>
                  <div className="relative mt-4 mb-4">
                    <Listbox.Button className="relative h-12 w-fit min-w-[25%] cursor-pointer rounded-lg bg-neutral-700 py-2 pl-3 pr-10 text-left text-lg shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-neutral-200">
                        {selectedUsers.map((id) => users.find((user) => user.id == id)!.name).join(", ")}
                      </span>
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
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {user.name}
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

                <div className="mt-4">
                  <SubmitButton
                    loading={disabled}
                    disabled={disabled || selectedUsers.length == 0 || selectedUsers.length + currentLength >= 4}
                    onClick={() => onAdd()}
                  >
                    Add
                  </SubmitButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
