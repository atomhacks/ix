import { getSubmission } from "../../../lib/server";

export default function Submission({ submission }) {
  return (
    <div className="max-w-screen-md p-2 py-6 mx-auto">
      <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.title}</h1>
      <p className="text-xl">{submission.description}</p>
    </div>
  );
}

export async function getServerSideProps({ req, query: { id } }) {
  const submission = await getSubmission(req, id);
  if (!submission) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      submission,
    },
  };
}
