/*
  Warnings:

  - A unique constraint covering the columns `[googleUserId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleUserId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "googleUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GoogleUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isAllowed" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "GoogleUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleUser_email_key" ON "GoogleUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleUser_id_email_key" ON "GoogleUser"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_googleUserId_key" ON "Address"("googleUserId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
