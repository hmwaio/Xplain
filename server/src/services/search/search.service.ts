import { prisma } from "../../lib/prisma.js";
import { offsetPaginate } from "../pagination/offsetScroll.service.js";

type SearchFilters = {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
};

export const searchPosts = async (
  filters: SearchFilters,
  page: number = 1,
  limit: number = 20,
) => {
  const skip = (page - 1) * limit;

  /* build where clause */
  const where: any = { status: "published" };

  /* text search (title or content) */
  if (filters.query) {
    where.OR = [
      { title: { contains: filters.query, mode: "insensitive" } },
      { content: { contains: filters.query, mode: "insensitive" } },
    ];
  }

  /* filter by category */
  if (filters.category) {
    where.category = filters.category;
  }

  /* filter by tag */
  if (filters.tag) {
    where.tags = {
      some: { name: filters.tag.toLowerCase() },
    };
  }

  /* filter by author */
  if (filters.author) {
    where.author = {
      name: { contains: filters.author, mode: "insensitive" },
    };
  }

  return await offsetPaginate({
    model: prisma.post,
    page,
    limit,
    where,
    include: {
      author: { select: { user_id: true, name: true } },
      tags: { select: { name: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });
};

/* search users */
export const searchUsers = async (
  query: string,
  page: number = 1,
  limit: number = 20,
) => {
  return await offsetPaginate({
    model: prisma.user,
    page,
    limit,
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    include: {
      profile: { select: { profile_picture: true } },
    },
  });
};
