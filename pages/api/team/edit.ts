import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import bucket from "../../../lib/bucket";
import prisma from "../../../lib/prisma";
import { duplicateEntry, filterBody, getUser, missingFields, unauthorized, wrongMethod } from "../../../lib/server";

const fields = ["name", "users", "image"] as const;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }
  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized(res);
  }

  const user = await getUser(req);
  if (!user) {
    return unauthorized(res);
  }
  if (!user.team || !user.teamId) {
    return unauthorized(res);
  }

  let body = filterBody(req.body, fields);
  if (!body) {
    return missingFields(res);
  }
  if (body.image) {
    try {
      const base64Data = Buffer.from(body.image.replace(/^data:image\/\w+;base64,/, ""), "base64");
      const ext = body.image.split(";")[0].split("/")[1];

      const upload = await bucket.send(
        new PutObjectCommand({
          Key: `Teams/${body.name}.${ext}`,
          Bucket: "atomhacks",
          Body: base64Data,
          ACL: "public-read",
          ContentEncoding: "base64",
          ContentType: `image/${ext}`,
        }),
      );
      if (upload.$metadata.httpStatusCode == 200) {
        body.image = `${process.env.SPACES_CDN_ENDPOINT!}/Teams/${body.name}.${ext}`;
      } else {
        body.image = null;
      }
    } catch (e) {
      console.warn("Image failed to upload,", e);
      body.image = null;
    }
  }
  console.log(body);

  let { users: ids, ...restOfBody } = body;
  // if the users in body are also currently in team, that is deletion
  // if not add it
  // Hackathon level code
  ids = user.team.users
    .map((user) => user.id)
    .filter((id) => !ids.some((new_id: string) => id == new_id))
    .concat(ids.filter((id: string) => !user.team!.users.some((user) => user.id == id)));
  console.log(ids);

  try {
    const submission = await prisma.team.update({
      where: {
        id: user.teamId,
      },
      data: {
        ...restOfBody,
        users: {
          set: ids.map((id: string) => ({
            id,
          })),
        },
      },
      include: {
        users: true,
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
  }
}
