import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { wrongMethod, unauthorized, missingFields, filterBodyAndValidate } from "../../../lib/server";

const requiredFields = ["osis", "experience", "year"] as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  const body = filterBodyAndValidate(req.body, requiredFields, requiredFields);
  if (!body) {
    return missingFields(res);
  }

  const updateUser = await prisma.user.update({
    where: {
      id: jwt.sub,
    },
    data: {
      formInfo: {
        upsert: {
          create: {
            ...body,
          },
          update: {
            ...body,
          },
        },
      },
    },
  });
  return res.status(201).json(updateUser);
}
