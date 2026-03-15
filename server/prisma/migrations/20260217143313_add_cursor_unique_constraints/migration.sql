/*
  Warnings:

  - A unique constraint covering the columns `[commented_at,comment_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created_at,post_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[saved_at,saved_id]` on the table `SavedPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment_commented_at_comment_id_key" ON "Comment"("commented_at", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_created_at_post_id_key" ON "Post"("created_at", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "SavedPost_saved_at_saved_id_key" ON "SavedPost"("saved_at", "saved_id");
