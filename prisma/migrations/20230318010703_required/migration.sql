/*
  Warnings:

  - Made the column `srcLink` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoLink` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "srcLink" SET NOT NULL,
ALTER COLUMN "srcLink" SET DEFAULT '',
ALTER COLUMN "videoLink" SET NOT NULL,
ALTER COLUMN "videoLink" SET DEFAULT '';
