/*
  Warnings:

  - You are about to drop the column `userId` on the `DonationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SalesRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SpendingRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DonationRecord" DROP CONSTRAINT "DonationRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "SalesRecord" DROP CONSTRAINT "SalesRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpendingRecord" DROP CONSTRAINT "SpendingRecord_userId_fkey";

-- AlterTable
ALTER TABLE "DonationRecord" DROP COLUMN "userId",
ADD COLUMN     "authorId" UUID;

-- AlterTable
ALTER TABLE "SalesRecord" DROP COLUMN "userId",
ADD COLUMN     "authorId" UUID;

-- AlterTable
ALTER TABLE "SpendingRecord" DROP COLUMN "userId",
ADD COLUMN     "authorId" UUID;

-- AddForeignKey
ALTER TABLE "DonationRecord" ADD CONSTRAINT "DonationRecord_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingRecord" ADD CONSTRAINT "SpendingRecord_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesRecord" ADD CONSTRAINT "SalesRecord_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
