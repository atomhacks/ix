"use client";

import { ArrowLongLeftIcon, ArrowLongRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import SubmitButton from "../../components/Submit";
import ActionsMenu from "./ActionsMenu";

type Props = {
  submission: Prisma.SubmissionGetPayload<{
    include: {
      team: {
        include: {
          users: true;
        };
      };
    };
  }>;
};

export default function EditableSubmission({ submission }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(submission.name);
  const [description, setDescription] = useState(submission.description);
  const [submitting, setSubmitting] = useState(false);

  const isValid = () => name != "" && description != "";

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    setSubmitting(true);

    const body = JSON.stringify({
      name,
      description,
    });

    const res = await fetch("/api/submissions/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (res.status == 201) {
      router.refresh();
      setSubmitting(false);
      setEditing(false);
    }
  };

  return (
    <>
      <div className="flex h-96 w-full items-center justify-center bg-black py-8 sm:h-80">
        <button>
          <ArrowLongLeftIcon className="mr-8 h-8 w-8 text-white" />
        </button>
        <div className="flex h-full w-2/6 min-w-[600px] items-center justify-center rounded-xl bg-neutral-900">
          <PhotoIcon className="h-8 w-8 text-neutral-400" />
        </div>
        <button>
          <ArrowLongRightIcon className="ml-8 h-8 w-8 text-white" />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-screen-md ml-auto p-4">
          {!editing ? (
            <>
              <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.name}</h1>
              <p className="text-xl whitespace-pre-line">{submission.description}</p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="block text-base text-neutral-400" htmlFor="name">
                Name *
              </label>
              <input
                className="mb-4 block w-full rounded-md bg-neutral-700 p-2 text-5xl font-bold shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
                type="text"
                id="name"
                name="name"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
              />
              <label className="block text-base text-neutral-400" htmlFor="description">
                Description
              </label>
              <textarea
                className="text-m mt-1 mb-4 block w-full rounded-lg bg-neutral-700 p-2 shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
                id="description"
                name="description"
                rows={10}
                cols={55}
                value={description}
                onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
              />
              <div className="mt-4 py-2">
                <SubmitButton loading={submitting} disabled={submitting || (isValid() ? false : true)}>
                  Update
                </SubmitButton>
              </div>
            </form>
          )}
        </div>
        <div className="m-4 ml-auto">
          <ActionsMenu setEditing={setEditing} />
        </div>
      </div>
    </>
  );
}
