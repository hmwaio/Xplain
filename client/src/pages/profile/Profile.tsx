import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userAPI } from "../../api/user.api";
import Navbar from "../../components/layout/Navbar";
import PostCard from "../../components/posts/PostCard";

export default function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getUserProfile(Number(id));
      setProfile(response.data.profile);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (profile.isFollowing) {
        await userAPI.unfollowUser(Number(id));
      } else {
        await userAPI.followUser(Number(id));
      }
      fetchProfile();
    } catch (error) {
      console.error("Failed to follow");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative h-64 bg-linear-to-r from-blue-500 to-purple-600 rounded-t-lg">
          {profile?.cover_picture && (
            <img
              src={profile.cover_picture}
              className="w-full h-full object-cover rounded-t-lg"
              alt="Cover"
            />
          )}
        </div>

        <div className="bg-white rounded-b-lg shadow p-6 -mt-20 relative">
          <div className="flex items-end gap-6">
            <div className="rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {profile?.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  alt="Profile"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold border-4 border-gray-200">
                  {profile?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 mb-4">
              <h1 className="text-3xl font-bold">{profile?.name}</h1>
              <p className="text-gray-500">
                Joined {new Date(profile?.joined).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={handleFollow}
              className={`mb-4 px-6 py-2 rounded-lg ${profile?.isFollowing ? "bg-gray-200" : "bg-blue-600 text-white"}`}
            >
              {profile?.isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          <div className="flex gap-8 mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold">{profile?.stats.posts}</p>
              <p className="text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{profile?.stats.followers}</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{profile?.stats.following}</p>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">Posts</h2>
          {posts.map((post) => (
            <PostCard key={post.post_id} post={post} isProfileView={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
