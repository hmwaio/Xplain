import { prisma } from "../../lib/prisma.js";
import type { CreatePostInput } from "../../types/type.js";

export const createPost = async (data: CreatePostInput, author_id: number) => {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content ?? null,
      post_picture: data.post_picture ?? null,
      post_picture_id: data.post_picture_id ?? null,
      category_id: data.category_id,
      status: data.status || "draft",
      author_id: author_id,
      published_at: data.status === "published" ? new Date() : null,
    },
  });

  return post;
};