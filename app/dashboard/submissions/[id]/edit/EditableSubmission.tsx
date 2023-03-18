"use client";

import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import SubmitButton from "../../../components/Submit";
import PublishMenu from "../components/PublishMenu";

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
  const [name, setName] = useState(submission.name);
  const [description, setDescription] = useState(submission.description);
  const [srcLink, setSrcLink] = useState<string>(submission.srcLink as string);
  const [videoLink, setVideoLink] = useState<string>(submission.videoLink as string);
  const [submitting, setSubmitting] = useState(false);
  const [icon, setIcon] = useState<File>();
  const [currentImage, _setCurrentImage] = useState(0);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>(submission.media);
  const inputFileElement = useRef<null | HTMLInputElement>(null);

  let iconChanged = false;

  const isValid = () => name != "" && description != "";

  const setCurrentImage = (i: number) => {
    if (selectedImages.length <= 0) return;
    if (i < 0) {
      i = selectedImages.length + i;
    }
    _setCurrentImage(i % selectedImages.length);
  };

  const onSelectImages: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.files!);
    setNewImages(Array.from(e.target.files!));
    setSelectedImages(Array.from(e.target.files!).map((file) => URL.createObjectURL(file)));
  };

  const onSelectIcon: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.files![0]);
    setIcon(e.target.files![0]);
    iconChanged = true;
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
      body = {
        ...body,
        media: imagesBase64,
      };
    }

    if (iconChanged && icon) {
      const imagesBase64 = await toBase64(icon);
      body = {
        ...body,
        icon: imagesBase64,
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
      setCurrentImage(0);
      setNewImages([]);
      router.push(`/dashboard/submissions/${submission.id}`);
      return router.refresh();
    }
  };

  const publish = async () => {
    let body = {
      name,
      description, // this is so cursed
      public: true,
    };

    const res = await fetch("/api/submissions/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      router.push("/dashboard/submissions");
    }
  };

  return (
    <>
      <div className="flex h-96 w-full items-center justify-center bg-black py-8 sm:h-80">
        <button>
          <ArrowLongLeftIcon className="mr-8 h-8 w-8 text-white" onClick={() => setCurrentImage(currentImage - 1)} />
        </button>
        <div className="relative flex h-full w-2/6 min-w-[600px] flex-col items-center justify-center rounded-xl bg-neutral-900">
          <>
            <div className="absolute z-10 flex flex-col items-center justify-center space-y-2">
              <button
                className="rounded-2xl bg-neutral-700 px-4 py-2 transition duration-200 hover:bg-neutral-600"
                onClick={() => inputFileElement.current!.click()}
              >
                Replace Images
              </button>
            </div>
            <>
              {selectedImages && selectedImages[currentImage] && (
                <Image
                  className="absolute rounded-xl object-cover"
                  src={selectedImages[currentImage]}
                  fill
                  alt="image"
                ></Image>
              )}
            </>
          </>
        </div>
        <button>
          <ArrowLongRightIcon className="ml-8 h-8 w-8 text-white" onClick={() => setCurrentImage(currentImage + 1)} />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="max-w-screen-md ml-auto p-4">
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
              className="mb-4 block w-full rounded-md bg-neutral-700 p-2 text-5xl font-bold shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
            />
            <label className="block text-base text-neutral-400" htmlFor="description">
              Description *
            </label>
            <textarea
              className="text-m mt-1 mb-4 block w-full rounded-lg bg-neutral-700 p-2 shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
              id="description"
              name="description"
              rows={10}
              cols={55}
              value={description}
              autoComplete="off"
              onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
            />
            <label htmlFor="image">Icon (For best results, image should be a square)</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/webp"
              onChange={onSelectIcon}
            ></input>
            <label className="block text-base text-neutral-400" htmlFor="name">
              Source Code (Google Drive Link, GitHub repository, etc)
            </label>
            <input
              className="mb-4 block w-full rounded-md bg-neutral-700 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
              type="text"
              id="src"
              name="src"
              autoComplete="off"
              value={srcLink}
              onInput={(e) => setSrcLink((e.target as HTMLInputElement).value)}
            />
            <label className="bl ock text-base text-neutral-400" htmlFor="name">
              Video Link (YouTube)
            </label>
            <input
              className="mb-6 block w-full rounded-md bg-neutral-700 p-2 text-lg shadow-lg focus:border-teal-600 focus:outline-none focus:ring focus:ring-teal-500"
              type="text"
              id="vid"
              name="vid"
              autoComplete="off"
              value={videoLink}
              onInput={(e) => setVideoLink((e.target as HTMLInputElement).value)}
            />
            {videoLink !== null ? (
              <iframe className="rounded-3xl" src={videoLink.replace("watch?v=", "embed/")} width={1000} height={500} />
            ) : null}
            <div className="mt-4 py-2">
              <SubmitButton loading={submitting} disabled={submitting || (isValid() ? false : true)}>
                Update
              </SubmitButton>
            </div>
          </form>
        </div>
        <div className="m-4 ml-auto">
          <PublishMenu publish={publish} />
        </div>
      </div>
    </>
  );
}
