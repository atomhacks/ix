import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSignedUsers } from "../lib/server";

export default function Admin(props: InferGetServerSidePropsType<typeof getServerSideProps>) { 

  {/** calls props obj from getServerSidePromps to display data in frontend */}
  const users = props.users;

  return (
    <div>
      <h1>
        <div>
          <h2>Admin</h2>
        </div>
      </h1>

      <div>
        {users.map((user: any, i: number) => ( // .map loops the array
          <div key={i}> { /** when running loops with react, include a key (in this case it's a counter) */ }
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => { // method ran before website loads use to pre-fetch data
  const fetchedUsers = await getSignedUsers(); { /** async function; requires await before it */}

  return {
    props: {
      users: fetchedUsers,
    },
  };
};
