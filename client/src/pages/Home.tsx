import { useEffect, useState } from "react";
import { postAPI } from "../api/post.api";
import PostCard from "../components/posts/PostCard";
import type { FeedPostCardType } from "../types/post.types";

export default function Home() {
  const [posts, setPosts] = useState<FeedPostCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<{
    id: number;
    created_at: string;
  } | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = cursor
        ? { cursorId: cursor.id, cursorDate: cursor.created_at, limit: 20 }
        : { limit: 20 };

      const response = await postAPI.getHomeFeed(params);
      const { items, nextCursor, hasMore: more } = response.data;

      setPosts((prev) => (cursor ? [...prev, ...items] : items));
      setCursor(nextCursor);
      setHasMore(more);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full flex flex-col justify-center items-center">
          {/* Posts List */}
          <div className="w-full flex flex-col justify-center items-center gap-20">
            {posts.map((post) => (
              <PostCard key={post.post_id} post={post} isProfileView={false} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <p className="text-center text-gray-500 mt-8">No more posts</p>
          )}

          {!loading && posts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No posts yet</p>
          )}
        </div>
      </div>
    </>
  );
}
