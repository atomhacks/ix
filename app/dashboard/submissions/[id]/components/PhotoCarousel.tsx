"use client";

import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function PhotoCarousel({ images }: { images: string[] }) {
  const [index, _setIndex] = useState(0);

  const setIndex = (idx: number) => {
    if (images.length == 0) {
      return;
    }
    if (idx < 0) {
      idx = images.length + idx;
    }
    _setIndex(idx % images.length);
  };

  return (
    <div className="flex h-96 w-full items-center justify-center bg-black py-8 sm:h-80">
      <button>
        <ChevronLeftIcon className="mr-8 h-8 w-8 text-white" onClick={() => setIndex(index - 1)} />
      </button>
      <div className="relative flex h-full w-2/6 min-w-[600px] items-center justify-center rounded-xl bg-neutral-900">
        {images && images[index % images.length] ? (
          <Image className="absolute rounded-xl object-cover" src={images[index]} fill alt="image" />
        ) : (
          <PhotoIcon className="h-8 w-8 text-neutral-400" />
        )}
      </div>
      <button>
        <ChevronRightIcon className="ml-8 h-8 w-8 text-white" onClick={() => setIndex(index + 1)} />
      </button>
    </div>
  );
}
