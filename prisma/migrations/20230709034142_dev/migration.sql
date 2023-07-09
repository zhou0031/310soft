/*
  Warnings:

  - You are about to drop the column `verified` on the `FacebookUser` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `GoogleUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FacebookUser" DROP COLUMN "verified";

-- AlterTable
ALTER TABLE "GoogleUser" DROP COLUMN "verified";
