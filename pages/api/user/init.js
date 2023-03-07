import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { wrongMethod, unauthorized, missingFields, filterBodyAndValidate } from "../../../lib/server";

const requiredFields = ["osis", "experience", "year", "discordHandle", "hasTeam"];
const fields = [...requiredFields, "shouldMatchTeam", "teamMembers"];

export default async function handler(req, res) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  const body = filterBodyAndValidate(req.body, fields, requiredFields);
  console.log("New User: ", body)
  if (!body) {
    return missingFields(res);
  }

  const updateUser = await prisma.user.update({
    where: {
      id: jwt.sub,
    },
    data: {
      osis: body.osis,
      experience: body.experience,
      initialized: true,
      formInfo: {
        create: {
          ...body,
        },
      },
    },
  });
  return res.status(201).json(updateUser);
}
