import { getAllSubmissions } from "../../../lib/server";

export default async function Submissions() {
  const fetchedSubmissions = await getAllSubmissions();
  return (
    <div>
      <h1 className="p-8 mb-4 text-4xl font-bold">Submissions</h1>
      <div className="grid grid-cols-3 gap-12 px-12">
        {fetchedSubmissions.map((submission, i) => (
          <div key={i}>{submission.name}</div>
        ))}
      </div>
    </div>
  );
}
