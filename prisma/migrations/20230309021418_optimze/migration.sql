/*
  Warnings:

  - You are about to drop the column `discordHandle` on the `FormInfo` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `initialized` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `osis` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ExamplePerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamplePost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamplePost" DROP CONSTRAINT "ExamplePost_posterId_fkey";

-- DropIndex
DROP INDEX "FormInfo_discordHandle_key";

-- AlterTable
ALTER TABLE "FormInfo" DROP COLUMN "discordHandle";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "experience",
DROP COLUMN "initialized",
DROP COLUMN "osis";

-- DropTable
DROP TABLE "ExamplePerson";

-- DropTable
DROP TABLE "ExamplePost";
