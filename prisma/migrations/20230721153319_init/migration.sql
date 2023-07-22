-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_facebookUserId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_googleUserId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "googleUserId" DROP NOT NULL,
ALTER COLUMN "facebookUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_facebookUserId_fkey" FOREIGN KEY ("facebookUserId") REFERENCES "FacebookUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
