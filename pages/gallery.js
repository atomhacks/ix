import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import bucket from "../lib/bucket";
import { useState, Fragment } from "react";

function GalleryPage({ photos }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-zinc-900 p-8 text-white font-montserrat">
      <Transition appear show={selectedImage != null} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setSelectedImage(null)}>
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
            <div className="flex mt-[56px] min-h-screen items-center justify-center p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl flex justify-center items-center shadow-xl transition-all">
                  {selectedImage && (
                    <Image className="rounded-2xl" src={selectedImage} width={1000} height={400} alt={""} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="flex items-center justify-center mb-8">
        <span className="py-6 border-b-4 border-green-500 md:text-5xl text-7xl font-morro">GALLERY</span>
      </div>
      <h1 className="text-4xl mb-3 border-b-4 border-yellow-500 inline-block">2022</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-8">
          {photos[0].map((photo, i) => (
            <Image
              className="box-border transition duration-200 hover:border-box hover:outline hover:outline-3 outline-solid outline-green-500 rounded-xl cursor-pointer"
              src={photo}
              width={620}
              height={200}
              key={i}
              onClick={() => setSelectedImage(photo)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              alt={""}
            />
          ))}
        </div>
      </div>
      <h1 className="text-4xl mb-3 border-b-4 border-yellow-500 inline-block mt-4">2019</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-8">
          {photos[1].map((photo, i) => (
            <Image
              className="box-border transition duration-200 hover:border-box hover:outline hover:outline-3 outline-solid outline-green-500 rounded-xl cursor-pointer"
              src={photo}
              width={620}
              height={200}
              key={i}
              onClick={() => setSelectedImage(photo)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              alt={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const items_2022 = await bucket.send(new ListObjectsV2Command({ Bucket: "atomhacks", Prefix: "Photos/2022/" }));
  const items_2019 = await bucket.send(new ListObjectsV2Command({ Bucket: "atomhacks", Prefix: "Photos/2019/" }));
  const photos = [
    items_2022.Contents.slice(1)
      .filter((item) => item.Key.endsWith("JPG"))
      .map((item) => `${process.env.SPACES_CDN_ENDPOINT}/${item.Key}`),
    items_2019.Contents.slice(1)
      .filter((item) => item.Key.endsWith("JPG"))
      .map((item) => `${process.env.SPACES_CDN_ENDPOINT}/${item.Key}`),
  ];

  return {
    props: {
      photos,
    },
    revalidate: 600,
  };
}

export default GalleryPage;
