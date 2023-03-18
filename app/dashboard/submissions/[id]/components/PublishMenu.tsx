"use client";

import { Popover, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";

export default function PublishMenu({ publish }: { publish: () => void }) {
  return (
    <Popover className="relative">
      <>
        <Popover.Button>
          <EllipsisHorizontalIcon className="h-8 w-8 text-white" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-full z-10 mt-3 max-w-xs -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-8 bg-neutral-700 p-7 lg:grid-cols-2">
                <button
                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  onClick={publish}
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-200">Publish</p>
                  </div>
                </button>
                <button className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-600 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div>
                    <p className="text-sm font-medium text-red-400">Delete</p>
                  </div>
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
}
