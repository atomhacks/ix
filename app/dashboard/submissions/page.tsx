import { getAllSubmissions } from "../../../lib/server";
import Image from "next/image";

export default async function Submissions() {
  const fetchedSubmissions = await getAllSubmissions();
  console.log(fetchedSubmissions)
  return (
    <div>
      <h1 className="p-8 mb-4 text-4xl font-bold">Submissions</h1>
      <div className="grid grid-cols-3 gap-12 px-12">
        {fetchedSubmissions.map((submission, i) => (
          <div key={i} className="overflow-hidden rounded-xl bg-zinc-700">
            <img className="w-full" src={submission.media[0]}></img>
            {/* <Image className="object-fill " fill src={submission.media[0]} alt={submission.name} /> */}
            <div className="px-6 py-6 mt-4">
              <h1 className="mb-2 text-2xl font-semibold">{submission.name}</h1>
              <h1 className="text-base">{submission.description}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
