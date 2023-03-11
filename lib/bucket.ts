import { S3Client } from "@aws-sdk/client-s3";

const bucket = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT!,
  forcePathStyle: false,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
  },
});

export default bucket;
