/*
  Warnings:

  - You are about to drop the column `expires_at` on the `AuthSession` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `AuthSession` table. All the data in the column will be lost.
  - Added the required column `otp_expires_at` to the `AuthSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthSession" DROP COLUMN "expires_at",
DROP COLUMN "verified",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp_expires_at" TIMESTAMP(3) NOT NULL;
