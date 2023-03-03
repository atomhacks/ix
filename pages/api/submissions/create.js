/*
import prisma from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import { duplicateEntry, filterBodyAndValidate, missingFields, unauthorized, wrongMethod } from "../../../lib/server";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  const fields = ["title", "description", "members", "tracks", "media"];
  const body = filterBodyAndValidate(req.body, fields, ["title", "description"]);
  if (!body) {
    return missingFields(res);
  }

  try {
    const submission = await prisma.submission.create({
      data: {
        ...body,
        members: {
          connect: [
            {
              id: jwt.sub,
            },
          ],
        },
      },
      include: {
        members: true,
      }
    });
    return res.status(201).json(submission);
  } catch (error) {
    console.log(error);
    if (error.code == "P2002") {
      return duplicateEntry(res);
    }
    return res.status(400).json({ message: "Unknown Error" });
  }
}
*/