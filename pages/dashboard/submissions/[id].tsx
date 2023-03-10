import { Submission } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSubmission } from "../../../lib/server";

type Props = {
  submission: Submission;
};

export const SubmissionPage: React.FC<Props> = ({ submission }) => {
  return (
    <div className="max-w-screen-md p-2 py-6 mx-auto">
      <h1 className="mb-4 text-6xl font-bold text-teal-300">{submission.title}</h1>
      <p className="text-xl">{submission.description}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query: { id } }) => {
  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }
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
};
