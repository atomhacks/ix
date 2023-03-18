/*
  Warnings:

  - The values [TASKADE] on the enum `Track` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Track_new" AS ENUM ('GENERAL', 'BEGINNER');
ALTER TABLE "Submission" ALTER COLUMN "tracks" DROP DEFAULT;
ALTER TABLE "Submission" ALTER COLUMN "tracks" TYPE "Track_new"[] USING ("tracks"::text::"Track_new"[]);
ALTER TYPE "Track" RENAME TO "Track_old";
ALTER TYPE "Track_new" RENAME TO "Track";
DROP TYPE "Track_old";
ALTER TABLE "Submission" ALTER COLUMN "tracks" SET DEFAULT ARRAY['GENERAL']::"Track"[];
COMMIT;
