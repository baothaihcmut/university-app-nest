/*
  Warnings:

  - You are about to drop the column `image_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_major_id_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "major_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image_id",
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
