/*
  Warnings:

  - You are about to drop the column `contact` on the `DonationRecord` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DonationRecord` table. All the data in the column will be lost.
  - Added the required column `donorContact` to the `DonationRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donorName` to the `DonationRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DonationRecord" DROP COLUMN "contact",
DROP COLUMN "name",
ADD COLUMN     "donorContact" TEXT NOT NULL,
ADD COLUMN     "donorName" TEXT NOT NULL;
