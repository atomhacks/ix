import { getAllSubmissions } from "../../../lib/server";
import Image from "next/image";
import Link from "next/link";

import { HandThumbUpIcon, EyeIcon } from "@heroicons/react/24/solid";

const shortNumber = require("short-number");

export default async function Submissions() {
  const fetchedSubmissions = await getAllSubmissions();
  console.log(fetchedSubmissions);
  return (
    <div className="font-montserrat text-white">
      <h1 className="mx-3 mt-6 mb-4 text-4xl font-bold">Submissions</h1>
      <div className="mx-3">
        <div className="flex flex-row gap-1.5">
          {fetchedSubmissions.map((submission, i) => (
            <Link
              key={i}
              className="flex w-36 cursor-pointer flex-col overflow-hidden"
              href={`/dashboard/submissions/${submission.id}`}
            >
              <div className="relative h-36 w-full overflow-auto rounded-md">
                <span>
                  <Image className="object-fill" alt="" fill src={submission.media[0]}></Image>
                </span>
              </div>
              <div className="relative mt-1.5 mb-1 max-h-11 w-full overflow-hidden text-ellipsis text-start">
                <h1 className="text-base font-medium">{submission.name}</h1>
              </div>
              <div className="relative text-start text-base font-normal">
                {" "}
                <HandThumbUpIcon className="inline-block h-4 w-4" />
                <span className="pl-1 pr-3">85%</span>
                <EyeIcon className="inline-block h-4 w-4" />
                <span className="pl-1 pr-3">{shortNumber(1213)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
