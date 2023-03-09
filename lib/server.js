import { getToken } from "next-auth/jwt";

import prisma from "./prisma";

export const wrongMethod = (res) => res.status(405).json({ message: "Method Not Allowed" });
export const unauthorized = (res) => res.status(401).json({ message: "Unauthorized" });
export const missingFields = (res) => res.status(400).json({ message: "Bad Request - Missing required fields" });
export const duplicateEntry = (res) => res.status(409).json({ message: "Conflict" });
export const notFound = (res) => res.status(404).json({ message: "Not Found" });

export async function getUser(req) {
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

export function filterBody(body, validFields) {
  return Object.fromEntries(
    validFields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]),
  );
}

export function filterBodyAndValidate(body, validFields, requiredFields) {
  const filteredBody = filterBody(body, validFields);
  if (!requiredFields.every((field) => filteredBody[field] !== undefined)) {
    return null;
  }
  return filteredBody;
}
