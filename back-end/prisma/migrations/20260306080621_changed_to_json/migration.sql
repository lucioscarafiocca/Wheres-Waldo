/*
  Warnings:

  - You are about to drop the `Coordinate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coordinates` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coordinate" DROP CONSTRAINT "Coordinate_characterId_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "coordinates" JSONB NOT NULL;

-- DropTable
DROP TABLE "Coordinate";
