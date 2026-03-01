/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `AuthSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_email_key" ON "AuthSession"("email");
