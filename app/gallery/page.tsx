import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import Image from "next/image";
import bucket from "../../lib/bucket";
import { Key } from "react";

async function getPhotos() {
  const [items_2022, items_2019] = await Promise.all([
    bucket.send(new ListObjectsV2Command({ Bucket: "atomhacks", Prefix: "Photos/2022/" })),
    bucket.send(new ListObjectsV2Command({ Bucket: "atomhacks", Prefix: "Photos/2022/" })),
  ]);
  const photos = [
    items_2022!
      .Contents!.slice(1)
      .filter((item) => item!.Key!.endsWith("JPG"))
      .map((item) => `${process.env.SPACES_CDN_ENDPOINT}/${item.Key}`),
    items_2019!
      .Contents!.slice(1)
      .filter((item) => item!.Key!.endsWith("JPG"))
      .map((item) => `${process.env.SPACES_CDN_ENDPOINT}/${item.Key}`),
  ];

  return photos;
}

export default async function Gallery() {
  const photos = await getPhotos();
  // const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-zinc-900 p-8 font-montserrat text-white">
      {/* <Transition appear show={selectedImage != null} as={Fragment}>
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
            <div className="mt-[56px] flex min-h-screen items-center justify-center p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex transform items-center justify-center overflow-hidden rounded-2xl shadow-xl transition-all">
                  {selectedImage && (
                    <Image className="rounded-2xl" src={selectedImage} width={1000} height={400} alt="Gallery Photo" />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
      <div className="mb-8 flex items-center justify-center">
        <span className="border-b-4 border-green-500 py-6 font-morro text-7xl md:text-5xl">GALLERY</span>
      </div>
      <h1 className="mb-3 inline-block border-b-4 border-yellow-500 text-4xl">2022</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-1">
          {photos[0].map((photo: string, i: Key) => (
            <Image
              className="hover:border-box hover:outline-3 outline-solid box-border rounded-xl outline-green-500 transition duration-200 hover:outline"
              src={photo}
              width={620}
              height={200}
              alt="Gallery Photo"
              key={i}
              // onClick={() => setSelectedImage(photo)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-4 inline-block border-b-4 border-yellow-500 text-4xl">2019</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-1">
          {photos[1].map((photo: string, i: Key) => (
            <Image
              className="hover:border-box hover:outline-3 outline-solid box-border rounded-xl outline-green-500 transition duration-200 hover:outline"
              src={photo}
              width={620}
              height={200}
              alt="Gallery Photo"
              key={i}
              // onClick={() => setSelectedImage(photo)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
