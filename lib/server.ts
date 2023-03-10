import "server-only";

import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "./prisma";

export const wrongMethod = (res: NextApiResponse) => res.status(405).json({ message: "Method Not Allowed" });
export const unauthorized = (res: NextApiResponse) => res.status(401).json({ message: "Unauthorized" });
export const missingFields = (res: NextApiResponse) =>
  res.status(400).json({ message: "Bad Request - Missing required fields" });
export const duplicateEntry = (res: NextApiResponse) => res.status(409).json({ message: "Conflict" });
export const notFound = (res: NextApiResponse) => res.status(404).json({ message: "Not Found" });

export async function getUser(req: NextApiRequest) {
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

export async function redirect(destination = "/") {
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

export function filterBody<T extends { [k: string]: unknown }, U extends string>(
  body: T,
  validFields: readonly U[],
): Partial<Pick<T, U>> {
  return Object.fromEntries(
    validFields.filter((field) => body[field] != undefined).map((field) => [field, body[field]]),
  ) as Partial<Pick<T, U>>;
}

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
