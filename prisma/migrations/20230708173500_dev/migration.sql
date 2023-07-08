/*
  Warnings:

  - A unique constraint covering the columns `[facebookUserId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facebookUserId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "facebookUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FacebookUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isAllowed" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "FacebookUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FacebookUser_email_key" ON "FacebookUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookUser_id_email_key" ON "FacebookUser"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_facebookUserId_key" ON "Address"("facebookUserId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_facebookUserId_fkey" FOREIGN KEY ("facebookUserId") REFERENCES "FacebookUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
