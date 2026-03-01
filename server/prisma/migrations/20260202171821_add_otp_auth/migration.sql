/*
  Warnings:

  - Added the required column `otp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "otp_expires_at" TIMESTAMP(3),
ADD COLUMN     "registration_step" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
