/*
  Warnings:

  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rate` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `country` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Supplier" DROP CONSTRAINT "Supplier_pkey",
DROP COLUMN "rate",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Supplier_id_seq";

-- CreateTable
CREATE TABLE "public"."TourismRate" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "durationNights" INTEGER NOT NULL,
    "priceAud" DECIMAL(10,2) NOT NULL,
    "includes" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TourismRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TourismRate_supplierId_idx" ON "public"."TourismRate"("supplierId");

-- CreateIndex
CREATE INDEX "TourismRate_priceAud_idx" ON "public"."TourismRate"("priceAud");

-- CreateIndex
CREATE INDEX "TourismRate_validFrom_validTo_idx" ON "public"."TourismRate"("validFrom", "validTo");

-- AddForeignKey
ALTER TABLE "public"."TourismRate" ADD CONSTRAINT "TourismRate_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
