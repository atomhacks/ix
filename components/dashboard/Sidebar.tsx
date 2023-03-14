"use client";

import { Route } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../styles/Sidebar.module.css";

export default function Sidebar() {
  const { data, status } = useSession();
  let [routes, setRoutes] = useState([
    {
      name: "Submissions",
      path: "/dashboard/submissions",
    },
    {
      name: "Create Submission",
      path: "/dashboard/submissions/create",
    },
  ]);
  useEffect(() => {
    fetch("/api/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((user) => {
          if (user.team && user.team.submission) {
            setRoutes(
              routes.map((route, index) => {
                if (index == 1) {
                  return {
                    name: "My Submission",
                    path: `/dashboard/submissions/${user.team.submission.id}`,
                  };
                } else {
                  return route;
                }
              }),
            );
          }
        });
      }
    });
  }, []);
  const isActive = (path: string) => usePathname() === path;

  return (
    <div
      className={`${styles.sidebar} h-[calc(100vh-56px)] w-56 bg-neutral-900 text-neutral-200 fixed flex space-y-4 flex-col text-lg`}
    >
      <ul className="flex flex-col h-full">
        <div className="p-4">
          <li className="mb-2">
            {/* DO NOT DELETE THE ?COMPLETE IT IS NECESSARY FOR DASHBOARD PAGE TO RELOAD AFTER FORM SUBMIT */}
            <Link href="/dashboard?complete">
              <h1
                className={`${
                  isActive("/dashboard") && "text-teal-300"
                } text-2xl font-bold hover:text-teal-300 transition duration-200`}
              >
                Dashboard
              </h1>
            </Link>
          </li>
          <span className="block w-full p-px bg-neutral-800 mb-4"></span>
          <div className="space-y-4">
            {routes.map((route, i) => (
              <li key={i}>
                <Link
                  href={`${(route.path as Route)}?fix${i}`}
                  className={`${
                    isActive(route.path) && "text-teal-300"
                  } hover:text-teal-300 transition duration-200 text-xl`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </div>
        </div>
        {status == "authenticated" && (
          <div className="mt-auto">
            <li className="flex items-center p-2">
              {data.user!.image && (
                <Image
                  src={data.user!.image}
                  className="mr-2 rounded-full"
                  width={48}
                  height={48}
                  alt="Profile Picture"
                />
              )}
              <h1 className="text-xl">{data.user!.name}</h1>
            </li>
            <li>
              <button className="w-full text-xl font-bold bg-black h-14" onClick={() => signOut({ callbackUrl: "/" })}>
                <p className="p-2">Sign Out</p>
              </button>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
