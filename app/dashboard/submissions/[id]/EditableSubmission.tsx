"use client";

import { ArrowLongLeftIcon, ArrowLongRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import SubmitButton from "../../components/Submit";
import ActionsMenu from "./ActionsMenu";

export const revalidate = 0;

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

export default function EditableSubmission({ submission }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(submission.name);
  const [description, setDescription] = useState(submission.description);
  const [srcLink, setSrcLink] = useState<string>(submission.srcLink as string);
  const [videoLink, setVideoLink] = useState<string>(submission.videoLink as string);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, _setCurrentImage] = useState(0);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const inputFileElement = useRef<null | HTMLInputElement>(null);

  const isValid = () => name != "" && description != "";

  const setCurrentImage = (i: number) => {
    if (selectedImages.length + submission.media.length <= 0) return;
    _setCurrentImage(i % (selectedImages.length + submission.media.length));
  };

  const onSelectImages: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.files!);
    setNewImages(Array.from(e.target.files!));
    setSelectedImages(submission.media.concat(Array.from(e.target.files!).map((file) => URL.createObjectURL(file))));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    setSubmitting(true);
    console.log(selectedImages);

    let body: any = {
      name,
      description,
      srcLink,
      videoLink,
    };

    if (newImages.length > 0) {
      const imagesBase64 = await Promise.all(newImages.map(async (file) => await toBase64(file)));
      console.log(imagesBase64);
      body = {
        ...body,
        media: imagesBase64,
      };
    }

    const res = await fetch("/api/submissions/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      setSubmitting(false);
      setEditing(false);
      return router.refresh();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full py-8 bg-black h-96 sm:h-80">
        <button>
          <ArrowLongLeftIcon className="w-8 h-8 mr-8 text-white" onClick={() => setCurrentImage(currentImage - 1)} />
        </button>
        <div className="relative flex h-full w-2/6 min-w-[600px] flex-col items-center justify-center rounded-xl bg-neutral-900">
          {!editing ? (
            <PhotoIcon className="w-8 h-8 text-neutral-400" />
          ) : (
            <>
              <div className="absolute z-10 flex flex-col items-center justify-center space-y-2">
                <button
                  className="px-4 py-2 transition duration-200 rounded-2xl bg-neutral-700 hover:bg-neutral-600"
                  onClick={() => inputFileElement.current!.click()}
                >
                  Add Images
                </button>
                <button className="px-4 py-2 text-red-400 transition duration-200 rounded-2xl bg-neutral-700 hover:bg-neutral-600">
                  Delete Image
                </button>
              </div>
              <>
                {selectedImages && selectedImages[currentImage] && (
                  <Image
                    className="absolute object-cover rounded-xl"
                    src={selectedImages[currentImage]}
                    fill
                    alt="image"
                  ></Image>
                )}
              </>
            </>
          )}
        </div>
        <button>
          <ArrowLongRightIcon className="w-8 h-8 ml-8 text-white" onClick={() => setCurrentImage(currentImage + 1)} />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-screen-md p-4 ml-auto">
          {!editing ? (
            <>
              <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.name}</h1>
              <p className="mb-4 text-xl whitespace-pre-line">{submission.description}</p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                ref={inputFileElement}
                multiple
                autoComplete="off"
                onChange={onSelectImages}
              ></input>
              <label className="block text-base text-neutral-400" htmlFor="name">
                Name *
              </label>
              <input
                className="block w-full p-2 mb-4 text-5xl font-bold rounded-md shadow-lg bg-neutral-700 focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
              />
              <label className="block text-base text-neutral-400" htmlFor="description">
                Description
              </label>
              <textarea
                className="block w-full p-2 mt-1 mb-4 rounded-lg shadow-lg text-m bg-neutral-700 focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
                id="description"
                name="description"
                rows={10}
                cols={55}
                value={description}
                autoComplete="off"
                onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
              />
              <label className="block text-base text-neutral-400" htmlFor="name">
                Source Code
              </label>
              <input
                className="block w-full p-2 mb-4 text-lg rounded-md shadow-lg bg-neutral-700 focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
                type="text"
                id="src"
                name="src"
                autoComplete="off"
                value={srcLink}
                onInput={(e) => setSrcLink((e.target as HTMLInputElement).value)}
              />
              <label className="text-base bl ock text-neutral-400" htmlFor="name">
                Video Link
              </label>
              <input
                className="block w-full p-2 mb-4 text-lg rounded-md shadow-lg bg-neutral-700 focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
                type="text"
                id="vid"
                name="vid"
                autoComplete="off"
                value={videoLink}
                onInput={(e) => setVideoLink((e.target as HTMLInputElement).value)}
              />
              <div className="py-2 mt-4">
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
