import prisma from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import {
  duplicateEntry,
  filterBodyAndValidate,
  getUser,
  missingFields,
  redirect,
  unauthorized,
  wrongMethod,
} from "../../../lib/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import bucket from "../../../lib/bucket";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16mb",
    },
  },
};

const fields = ["name", "description", "tracks", "media"] as const;
const req_fields = ["name", "description"] as const;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "PUT") {
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
    return redirect("/dashboard/team/create");
  }

  if (!user.team!.submission) {
    return redirect("/dashboard/submission/create");
  }

  if (body.media) {
    body.media = body.media.flatMap(async (image: any) => {
      try {
        const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const ext = image.split(";")[0].split("/")[1];
        const key = `Submissions/${user.team!.name}/${Math.random().toString(36).slice(2)}.${ext}`;
        console.log(key)

        const upload = await bucket.send(
          new PutObjectCommand({
            Key: key,
            Bucket: "atomhacks",
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${ext}`,
          }),
        );
        if (upload.$metadata.httpStatusCode == 200) {
          return `${process.env.SPACES_CDN_ENDPOINT!}/${key}`;
        } else {
          return [];
        }
      } catch (e) {
        console.warn("Image failed to upload,", e);
        return [];
      }
    });
  }

  try {
    const submission = await prisma.submission.update({
      where: {
        id: user.team?.submission.id,
      },
      data: {
        ...body,
        team: {
          connect: {
            id: user.teamId,
          },
        },
      },
      include: {
        team: {
          include: {
            users: true,
            submission: true,
          },
        },
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
