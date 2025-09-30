/*
  Warnings:

  - You are about to drop the column `durationNights` on the `TourismRate` table. All the data in the column will be lost.
  - You are about to drop the column `includes` on the `TourismRate` table. All the data in the column will be lost.
  - You are about to drop the column `packageName` on the `TourismRate` table. All the data in the column will be lost.
  - You are about to drop the column `priceAud` on the `TourismRate` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `TourismRate` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `TourismRate` table. All the data in the column will be lost.
  - Added the required column `currency` to the `TourismRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `TourismRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `TourismRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."TourismRate_priceAud_idx";

-- DropIndex
DROP INDEX "public"."TourismRate_supplierId_idx";

-- DropIndex
DROP INDEX "public"."TourismRate_validFrom_validTo_idx";

-- AlterTable
ALTER TABLE "public"."TourismRate" DROP COLUMN "durationNights",
DROP COLUMN "includes",
DROP COLUMN "packageName",
DROP COLUMN "priceAud",
DROP COLUMN "validFrom",
DROP COLUMN "validTo",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
