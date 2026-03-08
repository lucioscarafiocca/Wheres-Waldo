/*
  Warnings:

  - The `cord` column on the `Coordinate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Coordinate" DROP COLUMN "cord",
ADD COLUMN     "cord" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_cord_key" ON "Coordinate"("cord");
