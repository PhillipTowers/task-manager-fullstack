/*
  Warnings:

  - The primary key for the `Tarea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creadaEn` on the `Tarea` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tarea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_pkey",
DROP COLUMN "creadaEn",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tarea_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
