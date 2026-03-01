import { useEffect, useRef, useState } from "react";
import { postAPI } from "../../api/post.api";
import PostCard from "../../components/posts/PostCard";
import Spinner from "../../components/ui/Spinner";

export default function SavedPage() {
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<{ id: number; saved_at: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchSaved = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const params: any = { limit: 10 };
      if (cursor) {
        params.cursorId = cursor.id;
        params.cursorDate = cursor.saved_at;
      }

      const res = await postAPI.getSavedPosts(params);
      const data = res.data.result;
      console.log(data)

      setSavedPosts((prev) => {
        const newItems = data.items.filter(
          (item: any) => !prev.some((p) => p.saved_id === item.saved_id),
        );
        return [...prev, ...newItems];
      });
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to load saved posts:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    if (savedPosts.length === 0) {
      fetchSaved();
    }
  }, []);

  useEffect(() => {
    if (!observerRef.current || !hasMore || initialLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchSaved();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, initialLoad]);

  // Handle unsave (optimistic)
  const handleUnsave = async (postId: number) => {
    const previous = savedPosts;

    setSavedPosts((prev) =>
      prev.filter((item) => item.post.post_id !== postId),
    );

    try {
      await postAPI.unsavePost(postId);
    } catch (error) {
      console.error("Failed to unsave");
      setSavedPosts(previous); // rollback instead of refetch
    }
  };

  if (initialLoad && loading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>

      {savedPosts.length === 0 && !loading ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg font-medium">No saved posts yet.</p>
          <p className="text-sm mt-2">Bookmark posts to read them later.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {savedPosts.map((item) => (
            <PostCard
              key={item.saved_id}
              post={item.post}
              onUnSave={() => handleUnsave(item.post.post_id)}
              isSavedPage={true}
            />
          ))}
        </div>
      )}

      {loading && <Spinner />}

      <div ref={observerRef} className="h-10" />
    </div>
  );
}
