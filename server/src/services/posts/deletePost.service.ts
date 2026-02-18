import { prisma } from "../../lib/prisma.js";

export const deletePost = async (postId: number, authorId: number) => {
  const existingPost = await prisma.post.findUnique({
    where: { post_id: postId },
  });

  if (!existingPost) {
    throw new Error("Post not found");
  }

  if (existingPost.author_id !== authorId) {
    throw new Error("Not authorized to delete this post");
  }

  if (existingPost.post_picture_id) {
    const { deleteImage } = await import("../uploads/cloudinary.service.js");
    await deleteImage(existingPost.post_picture_id);
  }

  await prisma.post.delete({
    where: { post_id: postId },
  });
  return { message: "Post deleted successfully" };
};
