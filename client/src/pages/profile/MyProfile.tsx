import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { userAPI } from "../../api/user.api";
import PostCard from "../../components/posts/PostCard";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../context/auth";

export default function MyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getMyProfile();
      setProfile(response.data.profile);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Cover */}
        <div className="relative h-64 bg-linear-to-r from-blue-500 to-purple-600 rounded-t-lg">
          {profile?.cover_picture && (
            <img
              src={profile.cover_picture}
              className="w-full h-full object-cover rounded-t-lg"
              alt="Cover"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-b-lg shadow p-6 -mt-20 relative">
          <div className="flex items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className=" rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
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
            </div>

            {/* Info */}
            <div className="flex-1 mb-4">
              <h1 className="text-3xl font-bold">{profile?.name}</h1>
              <p className="text-gray-500">{profile?.email}</p>
            </div>

            <button className="hidden lg:flex lg:mb-4 px-4 py-2 border rounded-lg items-center gap-2">
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold">{profile?.stats.published}</p>
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

        {/* Posts */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">My Posts</h2>
          {posts.map((post) => (
            <PostCard key={post.post_id} post={post} isProfileView={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
