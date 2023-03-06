import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "../../lib/prisma";

async function getUser() {
  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt) {
    redirect("/api/auth/signin")
  }
  
  const user = await prisma.user.findUnique({
    where: {
      id: jwt.sub,
    },
    include: {
      submission: true,
    },
  });
  if (!user) {
    return redirect("/api/auth/signin");
  }
  return user;
  
}

const DashboardLanding = async () => {
  const user = await getUser();

  return (
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
    </div>
  );
};

export default DashboardLanding;
