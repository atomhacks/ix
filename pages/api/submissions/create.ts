import prisma from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import { duplicateEntry, filterBodyAndValidate, getUser, missingFields, redirect, unauthorized, wrongMethod } from "../../../lib/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

const fields = ["name", "description", "tracks"] as const;
const req_fields = ["name", "description"] as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  const body = filterBodyAndValidate(req.body, fields, req_fields);
  if (!body) {
    return missingFields(res);
  }

  const user = await getUser(req);
  if (!user) {
    return redirect("/api/auth/signin");
  }

  if (!user.teamId) {
    return redirect("/dashboard/team/create")
  }

  try {
    const submission = await prisma.submission.create({
      data: {
        ...body,
        team: {
          connect: 
            {
              id: user.teamId
            },
        },
      },
      include: {
        team: {
          include: {
            users: true,
            submission: true,
          }
        }
      },
    });
    return res.status(201).json(submission);
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return duplicateEntry(res);
      }
    }
    return res.status(400).json({ message: "Unknown Error" });
  }
}
