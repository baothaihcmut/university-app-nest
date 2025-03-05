-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateTable
CREATE TABLE "students" (
    "userId" TEXT NOT NULL,
    "student_number" TEXT NOT NULL,
    "school_year" TEXT,
    "start_year" TIMESTAMP(3),
    "end_year" TIMESTAMP(3),
    "major_id" INTEGER,

    CONSTRAINT "students_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "teachers" (
    "user_id" TEXT NOT NULL,
    "teacher_number" TEXT NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "current_refresh_token" TEXT,
    "phone_number" TEXT,
    "image_id" INTEGER,
    "birthplace" TEXT,
    "birthday" TIMESTAMP(3),
    "social_network_info" TEXT,
    "address" TEXT,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_student_number_key" ON "students"("student_number");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacher_number_key" ON "teachers"("teacher_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
