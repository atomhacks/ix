import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSignedUsers } from "../../lib/server";

export default async function Admin() {
  const fetchedUsers = await getSignedUsers();

  return (
    <div>
      <h1>
        <div>
          <h2>Admin</h2>
        </div>
      </h1>

      <div>
        {fetchedUsers.map(
          (
            user: any,
            i: number, // .map loops the array
          ) => (
            <div key={i}>
              {" "}
              {/** when running loops with react, include a key (in this case it's a counter) */}
              {user.name}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
