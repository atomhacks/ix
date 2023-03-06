import { getUser, redirect } from "../../lib/server";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { Prisma } from "@prisma/client";

type Props = {
  user: Prisma.UserGetPayload<{
    include: {
      submission: true;
    };
  }>;
};

export default function Dashboard({ user }: Props) {
  // const router = useRouter();
  // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  // const setInitialized = (val) => {
  //   _setInitialized(val);
  //   router.replace(router.asPath);
  // };

  return (
    <>
      {/* {!initialized && <Setup setInitialized={setInitialized} />} */}
      <div className="flex flex-col items-center justify-center min-h-screen text-white font-montserrat">
        <h1 className="mb-2 text-6xl font-bold md:text-4xl">Dashboard</h1>
        <p className="text-2xl text-center md:my-2 md:text-base">
          The dashboard will be available when the hackathon begins!
        </p>
        {!user.initialized ? (
          <div>
            <h1 className="mt-2 text-xs text-center">
              (By the way, you haven&apos;t fully registered for the event yet. You can do so by going{" "}
              <div className="inline underline ">
                <Link href="/dashboard/setup" passHref>
                  here!
                </Link>
              </div>
              )
            </h1>
          </div>
        ) : null}
        {/* {user.submissionId ? (
            <Link href={`/dashboard/submissions/${user.submissionId}`} className="inline-block">
              <div className="p-4 mt-4 rounded-lg w-80 h-36 bg-neutral-900">
                <h2 className="mb-2 text-2xl font-bold text-teal-300">{user.submission.title}</h2>
                <p>{user.submission.description}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-center max-w-sm mt-4 rounded-lg h-36 bg-neutral-800">
              <Link href="/dashboard/create-submission">
                <button className="flex items-center justify-center w-16 h-16 duration-200 rounded-full group bg-neutral-700 hover:bg-sky-400">
                  <PlusIcon className="w-8 h-8 duration-200 fill-sky-400 group-hover:fill-white" />
                </button>
              </Link>
            </div>
          )} */}
        {/* <Image src={user.image} alt="Profile Picture" width={96} height={96} />
          <h1>
            {user.name} - {user.osis}
          </h1>
          <h1>Email: {user.email}</h1>
          <h1>Experience: {user.experience}</h1> */}
      </div>
    </>
  );
}

// wishing i had app directory rn
// Dashboard.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUser(req);
  if (!user) return redirect("/api/auth/signin");

  return {
    props: { user },
  };
};
