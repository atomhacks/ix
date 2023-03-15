import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import bucket from "../../../lib/bucket";
import prisma from "../../../lib/prisma";
import { duplicateEntry, filterBodyAndValidate, missingFields, unauthorized, wrongMethod } from "../../../lib/server";

const requiredFields = ["name", "users"] as const;
const fields = [...requiredFields, "image"] as const;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    return wrongMethod(res);
  }
  console.log("loop1")
  const jwt = await getToken({ req });
  console.log("loop2")
  if (!jwt) {
    return unauthorized(res);
  }

  let body = filterBodyAndValidate(req.body, fields, requiredFields);
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

  const { users: ids, ...restOfBody } = body;

  try {
    const submission = await prisma.team.create({
      data: {
        ...restOfBody,
        users: {
          connect: ids
            .map((id: string) => ({
              id,
            }))
            .concat([{ id: jwt.sub! }]),
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
