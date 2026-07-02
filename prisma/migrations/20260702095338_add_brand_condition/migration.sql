/*
  Warnings:

  - Added the required column `brand` to the `Laptop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Laptop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Laptop" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL;
