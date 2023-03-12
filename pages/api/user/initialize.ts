import { getToken } from "next-auth/jwt";
import { wrongMethod, unauthorized, missingFields, filterBodyAndValidate } from "../../../lib/server";

import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const requiredFields = ["osis", "experience", "year"] as const;
const fields = [...requiredFields, "hasTeam", "shouldMatchTeam", "teamMembers"] as const;

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }
  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  const body = filterBodyAndValidate(req.body, fields, requiredFields);
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
