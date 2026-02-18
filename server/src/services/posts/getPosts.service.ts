import { prisma } from "../../lib/prisma.js";
import { cursorPaginate } from "../pagination/cursorScroll.service.js";

/* get single post */
export const getPostById = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { post_id: postId },
    include: {
      author: {
        select: { user_id: true, name: true },
      },
      category: true,
      tags: true,
      _count: {
        select: { likes: true, comments: true },
      },
    },
  });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

/* get all posts */
export const getAllPosts = async (
  cursor?: { id: number; created_at: Date },
  limit: number = 20,
) => {
  return await cursorPaginate({
    model: prisma.post,
    idField: "post_id",
    uniqueName: "created_at_post_id",
    ...(cursor && { cursor }),
    limit,
    where: { status: "published" },
    include: {
      author: { select: { user_id: true, name: true } },
      tags: { select: { name: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });
};
