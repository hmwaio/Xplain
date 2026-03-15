import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchAPI } from "../../api/search.api";
import PostCard from "../../components/posts/PostCard";
import Spinner from "../../components/ui/Spinner";

type TabType = "posts" | "users";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [tab, setTab] = useState<TabType>("posts");
  const [loading, setLoading] = useState(false);

  // 🔥 Separate states (important)
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    setPosts([]);
    setUsers([]);
  }, [query, tab]);

  useEffect(() => {
    if (!query || query.length < 2) return;

    let isMounted = true; // prevents race condition

    const fetchResults = async () => {
      setLoading(true);

      try {
        if (tab === "posts") {
          const res = await searchAPI.searchPosts({ q: query, page });
          if (isMounted) {
            setPosts(res.data.items || []);
          }
        } else {
          const res = await searchAPI.searchUsers(query, page);
          if (isMounted) {
            setUsers(res.data.items || []);
          }
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      isMounted = false;
    };
  }, [query, tab, page]);

  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Results for "{query}"</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setTab("posts")}
            className={`pb-2 transition ${
              tab === "posts"
                ? "border-b-2 border-orange-500 font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Posts
          </button>

          <button
            onClick={() => setTab("users")}
            className={`pb-2 transition ${
              tab === "users"
                ? "border-b-2 border-orange-500 font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Users
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <Spinner />
        ) : tab === "posts" ? (
          posts.length === 0 ? (
            <p className="text-gray-500">No posts found.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) =>
                post?.post_id ? (
                  <PostCard
                    key={post.post_id}
                    post={post}
                    isProfileView={false}
                  />
                ) : null,
              )}
            </div>
          )
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) =>
              user?.user_id ? (
                <Link
                  key={user.user_id}
                  to={`/users/${user.user_id}`}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  {user.profile?.profile_picture ? (
                    <img
                      src={user.profile.profile_picture}
                      className="w-12 h-12 rounded-full object-cover"
                      alt={user.name}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}

                  <p className="font-semibold">{user.name}</p>
                </Link>
              ) : null,
            )}
          </div>
        )}
      </div>
    </>
  );
}
