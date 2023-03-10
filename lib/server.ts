/* Utility functions for common server-side actions*/
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextIncomingMessage } from "next/dist/server/request-meta";
import { NextRequest } from "next/server";
import prisma from "./prisma";

export const wrongMethod = (res: NextApiResponse) => res.status(405).json({ message: "Method Not Allowed" });
export const unauthorized = (res: NextApiResponse) => res.status(401).json({ message: "Unauthorized" });
export const missingFields = (res: NextApiResponse) =>
  res.status(400).json({ message: "Bad Request - Missing required fields" });
export const duplicateEntry = (res: NextApiResponse) => res.status(409).json({ message: "Conflict" });
// this should probably be a dedicated page
export const notFound = (res: NextApiResponse) => res.status(404).json({ message: "Not Found" });

// only to be used in reading, for updating just call prisma manually
export async function getUser(req: NextRequest | NextApiRequest | GetServerSidePropsContext["req"]) {
  const jwt = await getToken({ req });
  if (!jwt) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: jwt.sub,
    },
    include: {
      accounts: true,
      team: true,
      formInfo: true,
    },
  });
  if (!user) {
    return null;
  }
  return user;
}

export async function getSubmission(req: NextRequest | NextApiRequest | GetServerSidePropsContext["req"], id: string) {
  const jwt = await getToken({ req });
  if (!jwt) {
    return null;
  }
  // extremely common prisma W
  const submission = await prisma.submission.findFirst({
    where: {
      id,
      OR: [
        {
          public: true,
        },
        {
          team: {
            users: {
              some: {
                id: jwt.sub,
              },
            },
          },
        },
      ],
    },
    include: {
      team: true,
    },
  });
  if (!submission) {
    return null;
  }
  return submission;
}

export async function redirect(destination = "/") {
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

// https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
export function filterBody<T extends { [k: string]: unknown }, U extends string>(
  body: T,
  validFields: readonly U[],
): Partial<Pick<T, U>> {
  return Object.fromEntries(
    validFields.filter((field) => body[field] != undefined).map((field) => [field, body[field]]),
  ) as Partial<Pick<T, U>>;
}

// frick typescript
export function filterBodyAndValidate<T extends { [k: string]: unknown }, U extends string, V extends U>(
  body: T,
  validFields: readonly U[],
  requiredFields: readonly V[],
): (Pick<T, V> & Partial<Pick<T, U>>) | null {
  const filteredBody = filterBody(body, validFields);
  console.log(filteredBody);
  if (!requiredFields.every((field) => filteredBody[field] != undefined)) {
    return null;
  }
  return filteredBody as Pick<T, V> & Partial<Pick<T, U>>;
}
