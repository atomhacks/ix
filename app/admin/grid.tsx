import User from "@prisma/client";

export default function Grid({ fetchedUsers: User[] }) {
  return (
    <div className="flex flex-col min-h-screen px-8 py-8 rounded-3xl bg-neutral-800">
        {fetchedUsers.map(
          (
            user: User,
            i: number, // .map loops the array
          ) => (
            <h1
              key={i}
              onClick={() => {
                currentUser = user;
                console.log(currentUser)
              }}
              className="inline mb-2 text-xl duration-150 hover:cursor-pointer hover:text-teal-500"
            >
              {user.name}
            </h1>
          ),
        )}
      </div>
  );
}
