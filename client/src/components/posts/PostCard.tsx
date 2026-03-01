import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../api/post.api";
import { useAuth } from "../../context/auth";
import type { FeedPostCardType } from "../../types/post.types";
import PostComments from "../comment/AddComment";

type Props = {
  post: FeedPostCardType;
  isProfileView?: boolean;
  onUnSave?: (postId: number) => void;
  isSavedPage?: boolean;
};

export default function PostCard({
  post,
  isProfileView = false,
  onUnSave,
  isSavedPage = false,
}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isOwner = user?.user_id === post.author?.user_id;
  console.log(isOwner);

  console.log(post.author.profile.profile_picture);

  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post._count.likes);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fullPost, setFullPost] = useState<any>(null);
  const [loadingPost, setLoadingPost] = useState(false);
  // const [loading, setLoading] = useState(true);

  // Truncate content
  const truncateContent = (text: string, wordLimit: number = 20) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ");
  };

  const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, "") || "";

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Like handler
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    try {
      if (newLiked) {
        await postAPI.likePost(post.post_id);
      } else {
        await postAPI.unlikePost(post.post_id);
      }
    } catch (error) {
      setIsLiked(!newLiked);
      setLikesCount((prev) => (newLiked ? prev - 1 : prev + 1));
    }
  };

  // Save handler
  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      // If this card is rendered inside Saved Page
      if (isSavedPage) {
        await postAPI.unsavePost(post.post_id);

        // Tell parent to remove it from list
        onUnSave?.(post.post_id);
        return;
      }

      // Normal feed toggle behavior
      if (isSaved) {
        await postAPI.unsavePost(post.post_id);
      } else {
        await postAPI.savePost(post.post_id);
      }

      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to save");
    }
  };

  // Share handler
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const url = `${window.location.origin}/posts/${post.post_id}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch (error) {
        // User cancelled, ignore
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      } catch {
        // Manual copy
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        alert("Link copied!");
      }
    }
  };

  // Read more - fetch full post
  const handleReadMore = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    setLoadingPost(true);

    try {
      const response = await postAPI.getPost(post.post_id);
      setFullPost(response.data.post);
    } catch (error) {
      console.error("Failed to fetch post");
    } finally {
      setLoadingPost(false);
    }
  };

  // Delete handler
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Delete this post?")) return;

    try {
      await postAPI.deletePost(post.post_id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete");
    }
  };

  // Navigate to author
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOwner) {
      navigate("/me");
    } else {
      navigate(`/users/${post.author.user_id}`);
    }
  };

  const contentPreview = truncateContent(stripHtml(post.content));
  const hasMoreContent = stripHtml(post.content).split(" ").length > 20;

  // if (loading)
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );

  return (
    <>
      <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            onClick={handleAuthorClick}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80"
          >
            <div className="rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {post.author.profile.profile_picture ? (
                <img
                  src={post.author.profile.profile_picture}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="Profile"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold border-gray-200">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author?.name}</p>
              <p className="text-sm text-gray-500">
                {formatDate(post.created_at)}
              </p>
            </div>
          </div>

          {/* Owner controls - ONLY in profile view */}
          {isOwner && isProfileView && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                    {post.status === "draft" ? (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await postAPI.publishPost(post.post_id);
                            window.location.reload();
                          } catch (error) {
                            alert("Failed to publish");
                          }
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-green-50 transition text-green-600"
                      >
                        Publish Now
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/post/${post.post_id}/edit`);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition text-gray-700"
                      >
                        Edit Post
                      </button>
                    )}
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 transition text-red-600"
                    >
                      Delete Post
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Category */}
        {post.category && (
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-3">
            {post.category}
          </span>
        )}

        {/* Draft Badge */}
        {post.status === "draft" && isOwner && (
          <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full mb-3 ml-2">
            📝 DRAFT
          </span>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h2>

        {/* Content Preview */}
        <div className="mb-4">
          <p className="text-gray-600 leading-relaxed">
            {contentPreview}
            {hasMoreContent && <span className="text-gray-400">...</span>}
          </p>
          {hasMoreContent && (
            <button
              onClick={handleReadMore}
              className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition"
            >
              Read more →
            </button>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/search?tag=${tag.name}`);
                }}
                className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer transition"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Interactions - For non-owners OR feed view */}
        {(isOwner || !isProfileView) && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition group"
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "group-hover:scale-110 transition-transform"}`}
                />
                <span className="text-sm font-medium">{likesCount}</span>
              </button>

              <button
                onClick={handleReadMore}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  {post._count.comments}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition group"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <button
              onClick={handleSave}
              className="text-gray-600 hover:text-blue-500 transition group"
            >
              <Bookmark
                className={`w-5 h-5 ${isSaved ? "fill-blue-500 text-blue-500" : "group-hover:scale-110 transition-transform"}`}
              />
            </button>
          </div>
        )}
      </article>

      {/* Modal - Animated */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 p-4 flex justify-end border-b">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {loadingPost ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : fullPost ? (
                <>
                  {/* Author */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {fullPost.author.profile.profile_picture ? (
                        <img
                          src={fullPost.author.profile.profile_picture}
                          className="w-14 h-14 rounded-full object-cover"
                          alt="Profile"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-gray-200">
                          {fullPost.author.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        {fullPost.author.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(fullPost.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  {fullPost.category && (
                    <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-6">
                      {fullPost.category}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {fullPost.title}
                  </h1>

                  {/* Image */}
                  {fullPost.post_picture && (
                    <img
                      src={fullPost.post_picture}
                      alt={fullPost.title}
                      className="w-full rounded-xl mb-6 shadow-lg"
                    />
                  )}

                  {/* Content */}
                  <div
                    className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: fullPost.content }}
                  />

                  {/* Tags */}
                  {fullPost.tags && fullPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 py-6 border-t border-gray-200">
                      {fullPost.tags.map((tag: any, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 cursor-pointer transition"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactions in Modal */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={handleLike}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
                      >
                        <Heart
                          className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                        />
                        <span className="font-medium">{likesCount}</span>
                      </button>

                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition">
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-medium">
                          {fullPost._count.comments}
                        </span>
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition"
                      >
                        <Share2 className="w-6 h-6" />
                      </button>
                    </div>

                    <button
                      onClick={handleSave}
                      className="text-gray-600 hover:text-blue-500 transition"
                    >
                      <Bookmark
                        className={`w-6 h-6 ${isSaved ? "fill-blue-500 text-blue-500" : ""}`}
                      />
                    </button>
                  </div>
                  <PostComments postId={fullPost.post_id} />
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
