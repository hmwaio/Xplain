import { prisma } from "../../lib/prisma.js";
import { cursorPaginate } from "../pagination/cursorScroll.service.js";

// Get PUBLIC profile (others viewing)
export const getUserProfile = async (
  userId: number,
  viewerId?: number,
  cursor?: { id: number; created_at: Date },
  limit: number = 20,
) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
    select: {
      user_id: true,
      name: true,
      created_at: true,
      profile: {
        select: {
          profile_picture: true,
          cover_picture: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  // Get stats
  const [postCount, followerCount, followingCount, isFollowing] =
    await Promise.all([
      prisma.post.count({
        where: { author_id: userId, status: "published" },
      }),
      prisma.follow.count({ where: { following_id: userId } }),
      prisma.follow.count({ where: { follower_id: userId } }),
      viewerId
        ? prisma.follow.findUnique({
            where: {
              follower_id_following_id: {
                follower_id: viewerId,
                following_id: userId,
              },
            },
          })
        : null,
    ]);

  const getUserPosts = await cursorPaginate({
    model: prisma.post,
    idField: "post_id",
    dateField: "created_at",
    uniqueName: "created_at_post_id",
    ...(cursor && { cursor }),
    limit,
    where: { author_id: userId, status: "published" },
    include: {
      _count: { select: { likes: true, comments: true } },
    },
  });

  return {
    profile: {
      user_id: user.user_id,
      name: user.name,
      profile_picture: user.profile?.profile_picture || null,
      cover_picture: user.profile?.cover_picture || null,
      joined: user.created_at,
      stats: {
        posts: postCount,
        followers: followerCount,
        following: followingCount,
      },
      isFollowing: !!isFollowing,
    },
    posts: getUserPosts.items,
    nextCursor: getUserPosts.nextCursor,
    hasMore: getUserPosts.hasMore,
  };
};
