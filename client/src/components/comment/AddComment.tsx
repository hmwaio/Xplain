import { Send, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { commentAPI } from "../../api/comment.api";
import { useAuth } from "../../context/auth";

type Props = {
  postId: number;
};

type CursorType = {
  id: number;
  created_at: string;
} | null;

export default function PostComments({ postId }: Props) {
  const { user } = useAuth();

  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<CursorType>(null);
  const [newComment, setNewComment] = useState("");
  const [adding, setAdding] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    resetAndFetch();
  }, [postId]);

  const resetAndFetch = async () => {
    setComments([]);
    setCursor(null);
    setHasMore(true);
    await fetchComments();
  };

  const fetchComments = async (loadMore = false) => {
    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const params: any = { limit: 10 };
      if (cursor) {
        params.cursorId = cursor.id;
        params.cursorDate = cursor.created_at;
      }

      const response = await commentAPI.getComments(postId, params);
      const { items, nextCursor, hasMore: more } = response.data.result;

      setComments((prev) => (loadMore ? [...prev, ...items] : items));
      setCursor(nextCursor);
      setHasMore(more);
    } catch (error) {
      console.error("Failed to fetch comments");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          fetchComments(true);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadingMore, cursor]);

  /* ================= ADD COMMENT ================= */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setAdding(true);

    try {
      const res = await commentAPI.addComment(postId, newComment);
      setComments((prev) => [res.data.comment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment");
    } finally {
      setAdding(false);
    }
  };

  /* ================= DELETE COMMENT ================= */
  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await commentAPI.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.comment_id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="mt-10 border-t border-gray-200 pt-8">
      {/* Header */}
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* ================= ADD COMMENT ================= */}
      {user && (
        <div className="flex gap-4 mb-8">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a thoughtful comment..."
              className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <div className="flex justify-end mt-3">
              <button
                onClick={handleAddComment}
                disabled={adding || !newComment.trim()}
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50"
              >
                {adding ? "Posting..." : <Send />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= COMMENT LIST ================= */}
      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-400 py-6">
          No comments yet. Be the first one!
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {comments.map((comment) => {
              const isOwner = Number(user?.user_id) === Number(comment.user?.user_id);
              {
                isOwner;
              }

              return (
                <div key={comment.comment_id} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {comment.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition">
                      <p className="font-semibold text-sm text-gray-900">
                        {comment.user?.name}
                      </p>

                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 mt-2 text-xs text-gray-500">
                      <span>
                        {new Date(comment.commented_at).toLocaleDateString()}
                      </span>

                      {isOwner && (
                        <button
                          onClick={() =>
                            handleDeleteComment(comment.comment_id)
                          }
                          className=" text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2Icon />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Trigger */}
          {hasMore && (
            <div
              ref={observerRef}
              className="h-10 flex items-center justify-center mt-6"
            >
              {loadingMore && (
                <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
