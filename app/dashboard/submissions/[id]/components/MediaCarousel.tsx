"use client";

import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function PhotoCarousel({ media }: { media: Array<{ src: string; type: string }> }) {
  const [index, _setIndex] = useState(0);

  const setIndex = (idx: number) => {
    if (media.length == 0) {
      return;
    } else {
      console.log(media);
    }
    if (idx < 0) {
      idx = media.length + idx;
    }
    _setIndex(idx % media.length);
  };

  return (
    <div className="group relative flex h-96 w-[640px] min-w-[600px] items-center justify-center">
      {media && media[index % media.length] && media[index].src  ? (
        media[index].type === "image" ? (
          <Image className="absolute z-0 object-fill" src={media[index].src} fill alt="image" />
        ) : (
          <iframe
            className="absolute z-0 object-fill w-full h-full"
            src={media[index].src.replace("watch?v=", "embed/")}
          />
        )
      ) : (
        <PhotoIcon className="w-8 h-8 text-neutral-400" />
      )}
      <button className="absolute z-10 p-2 transition duration-700 bg-black rounded-full opacity-0 left-4 group-hover:opacity-80 group-hover:transition-opacity">
        <ChevronLeftIcon className="h-7 w-7 text-zinc-400" onClick={() => setIndex(index - 1)} />
      </button>
      <button className="absolute z-10 p-2 transition duration-700 bg-black rounded-full opacity-0 right-4 group-hover:opacity-80 group-hover:transition-opacity">
        <ChevronRightIcon className="h-7 w-7 text-zinc-400" onClick={() => setIndex(index + 1)} />
      </button>
    </div>
  );
}
