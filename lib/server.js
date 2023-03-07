/* Utility functions for common server-side actions*/
import { getToken } from "next-auth/jwt";
import prisma from "./prisma";

export const wrongMethod = (res) => res.status(405).json({ message: "Method Not Allowed" });
export const unauthorized = (res) => res.status(401).json({ message: "Unauthorized" });
export const missingFields = (res) => res.status(400).json({ message: "Bad Request - Missing required fields" });
export const duplicateEntry = (res) => res.status(409).json({ message: "Conflict" });
// this should probably be a dedicated page
export const notFound = (res) => res.status(404).json({ message: "Not Found" });

// only to be used in reading, for updating just call prisma manually
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
      submission: true,
      accounts: true,
      formInfo: true,
    },
  });
  if (!user) {
    return null;
  }
  return user;
}

export async function getSubmission(req, id) {
  const jwt = await getToken({ req });
  // extremely common prisma W
  const submission = await prisma.submission.findFirst({
    where: {
      id,
      OR: [
        {
          public: true,
        },
        {
          members: {
            some: {
              id: jwt.sub,
            },
          },
        },
      ],
    },
    include: {
      members: true,
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
export function filterBody(body, validFields) {
  return Object.fromEntries(
    validFields.filter((field) => body[field] != undefined).map((field) => [field, body[field]]),
  );
}

export function filterBodyAndValidate(body, validFields, requiredFields) {
  const filteredBody = filterBody(body, validFields);
  console.log(filteredBody);
  if (!requiredFields.every((field) => filteredBody[field] != undefined)) {
    return null;
  }
  return filteredBody;
}
