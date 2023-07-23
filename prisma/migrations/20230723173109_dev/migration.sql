-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT,
    "googleUserId" TEXT,
    "facebookUserId" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_googleUserId_key" ON "Contact"("googleUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_facebookUserId_key" ON "Contact"("facebookUserId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_facebookUserId_fkey" FOREIGN KEY ("facebookUserId") REFERENCES "FacebookUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
