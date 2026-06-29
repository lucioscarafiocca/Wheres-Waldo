/*
  Warnings:

  - The primary key for the `Timer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Timer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Timer_id_seq";

-- CreateTable
CREATE TABLE "Highscores" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Highscores_pkey" PRIMARY KEY ("id")
);
