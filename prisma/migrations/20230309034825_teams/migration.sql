/*
  Warnings:

  - You are about to drop the column `hasTeam` on the `FormInfo` table. All the data in the column will be lost.
  - You are about to drop the column `shouldMatchTeam` on the `FormInfo` table. All the data in the column will be lost.
  - You are about to drop the column `teamMembers` on the `FormInfo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `submissionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_submissionId_fkey";

-- DropIndex
DROP INDEX "Submission_title_key";

-- AlterTable
ALTER TABLE "FormInfo" DROP COLUMN "hasTeam",
DROP COLUMN "shouldMatchTeam",
DROP COLUMN "teamMembers";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "submissionId",
ADD COLUMN     "teamId" TEXT;

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_name_key" ON "Submission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_teamId_key" ON "Submission"("teamId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
