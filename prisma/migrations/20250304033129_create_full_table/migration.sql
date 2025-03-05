/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `users` table. All the data in the column will be lost.
  - Made the column `major_id` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `image` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "DependentType" AS ENUM ('Father', 'Mother');

-- CreateEnum
CREATE TYPE "MimeType" AS ENUM ('IMAGE_JPEG', 'IMAGE_PNG', 'APPLICATION_PDF', 'TEXT_PLAIN', 'OTHER');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'READ', 'UNREAD');

-- CreateEnum
CREATE TYPE "SubjectPrequisiteType" AS ENUM ('REQUIRED', 'OPTIONAL');

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_userId_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_user_id_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "major_id" SET NOT NULL,
ALTER COLUMN "major_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "image_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "current_refresh_token" TEXT,
    "phone_number" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificate_files" (
    "certificate_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "certificate_files_pkey" PRIMARY KEY ("certificate_id","file_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "max_student_quantity" INTEGER NOT NULL,
    "current_student_quantity" INTEGER NOT NULL,
    "room" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "semester" TEXT NOT NULL,
    "teacher_id" TEXT,
    "subject_id" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_schedules" (
    "course_id" TEXT NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,
    "session" INTEGER NOT NULL,

    CONSTRAINT "course_schedules_pkey" PRIMARY KEY ("course_id","day_of_week","session")
);

-- CreateTable
CREATE TABLE "course_students" (
    "course_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "assignment_score" DOUBLE PRECISION,
    "exercise_score" DOUBLE PRECISION,
    "exam_score" DOUBLE PRECISION,
    "test_score" DOUBLE PRECISION,
    "avg_score" DOUBLE PRECISION,

    CONSTRAINT "course_students_pkey" PRIMARY KEY ("course_id","student_id")
);

-- CreateTable
CREATE TABLE "dependents" (
    "id" TEXT NOT NULL,
    "dependent_type" "DependentType" NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "dependents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "faculities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculity_teachers" (
    "teacher_id" TEXT NOT NULL,
    "faculity_id" TEXT NOT NULL,

    CONSTRAINT "faculity_teachers_pkey" PRIMARY KEY ("teacher_id","faculity_id")
);

-- CreateTable
CREATE TABLE "files" (
    "file_id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "mime_type" "MimeType" NOT NULL,
    "size" INTEGER NOT NULL,
    "is_uploaded" BOOLEAN NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("file_id")
);

-- CreateTable
CREATE TABLE "majors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "faculity_id" TEXT,

    CONSTRAINT "majors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "major_teachers" (
    "major_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,

    CONSTRAINT "major_teachers_pkey" PRIMARY KEY ("major_id","teacher_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "action_url" TEXT,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_subjects" (
    "student_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "assignment_score" DOUBLE PRECISION,
    "exercise_score" DOUBLE PRECISION,
    "exam_score" DOUBLE PRECISION,
    "test_score" DOUBLE PRECISION,
    "avg_score" DOUBLE PRECISION,
    "semester" TEXT NOT NULL,

    CONSTRAINT "student_subjects_pkey" PRIMARY KEY ("student_id","subject_id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "subject_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "description" TEXT,
    "exam_ratio" INTEGER,
    "test_ratio" INTEGER,
    "assignment_ratio" INTEGER,
    "exercise_ratio" INTEGER,
    "major_id" TEXT,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "subject_prequisites" (
    "subject_id" TEXT NOT NULL,
    "prequisite_subject_id" TEXT NOT NULL,
    "prerequisite_type" "SubjectPrequisiteType",

    CONSTRAINT "subject_prequisites_pkey" PRIMARY KEY ("subject_id","prequisite_subject_id")
);

-- CreateTable
CREATE TABLE "subject_teachers" (
    "subject_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,

    CONSTRAINT "subject_teachers_pkey" PRIMARY KEY ("subject_id","teacher_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificate_files" ADD CONSTRAINT "certificate_files_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "certificates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificate_files" ADD CONSTRAINT "certificate_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("file_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_schedules" ADD CONSTRAINT "course_schedules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_students" ADD CONSTRAINT "course_students_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_students" ADD CONSTRAINT "course_students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependents" ADD CONSTRAINT "dependents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculity_teachers" ADD CONSTRAINT "faculity_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculity_teachers" ADD CONSTRAINT "faculity_teachers_faculity_id_fkey" FOREIGN KEY ("faculity_id") REFERENCES "faculities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "majors" ADD CONSTRAINT "majors_faculity_id_fkey" FOREIGN KEY ("faculity_id") REFERENCES "faculities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "major_teachers" ADD CONSTRAINT "major_teachers_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "major_teachers" ADD CONSTRAINT "major_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_subjects" ADD CONSTRAINT "student_subjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_subjects" ADD CONSTRAINT "student_subjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_prequisites" ADD CONSTRAINT "subject_prequisites_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_prequisites" ADD CONSTRAINT "subject_prequisites_prequisite_subject_id_fkey" FOREIGN KEY ("prequisite_subject_id") REFERENCES "subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teachers" ADD CONSTRAINT "subject_teachers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teachers" ADD CONSTRAINT "subject_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
