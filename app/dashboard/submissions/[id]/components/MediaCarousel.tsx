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
      {media && media[index % media.length] ? (
        media[index].type === "image" ? (
          <Image className="absolute z-0 object-fill" src={media[index].src} fill alt="image" />
        ) : (
          <iframe
            className="absolute z-0 h-full w-full object-fill"
            src={media[index].src.replace("watch?v=", "embed/")}
          />
        )
      ) : (
        <PhotoIcon className="h-8 w-8 text-neutral-400" />
      )}
      <button className="absolute left-4 z-10 rounded-full bg-black p-2 opacity-0 transition duration-700 group-hover:opacity-80 group-hover:transition-opacity">
        <ChevronLeftIcon className="h-7 w-7 text-zinc-400" onClick={() => setIndex(index - 1)} />
      </button>
      <button className="absolute right-4 z-10 rounded-full bg-black p-2 opacity-0 transition duration-700 group-hover:opacity-80 group-hover:transition-opacity">
        <ChevronRightIcon className="h-7 w-7 text-zinc-400" onClick={() => setIndex(index + 1)} />
      </button>
    </div>
  );
}
