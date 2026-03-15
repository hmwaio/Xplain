import { Camera, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { uploadAPI } from "../../api/upload.api";
import { userAPI } from "../../api/user.api";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../context/auth";

export default function ProfileSettings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getMyProfile();
      const data = response.data.profile;
      setProfile(data);
      setName(data.name);
      setBio(data.bio || "");
    } catch (error) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Upload Profile Picture
  const handleProfilePicUpload = async (file: File) => {
    setUploadingProfile(true);
    try {
      const response = await uploadAPI.uploadProfilePicture(file);
      const imageUrl = response.data.url;
      const imageId = response.data.public_id;

      await userAPI.updateProfile({
        profile_picture: imageUrl,
        profile_picture_id: imageId,
      });

      setProfile((prev: any) => ({
        ...prev,
        profile_picture: imageUrl,
      }));

      fetchProfile();
      alert("Profile picture updated!");
    } catch (error) {
      console.log(error);
      // console.error("Upload failed");
      alert("Failed to upload");
    } finally {
      setUploadingProfile(false);
    }
  };

  // Upload Cover Picture
  const handleCoverPicUpload = async (file: File) => {
    setUploadingCover(true);
    try {
      const response = await uploadAPI.uploadCoverPicture(file);
      const imageUrl = response.data.url;
      const imageId = response.data.public_id;

      await userAPI.updateProfile({
        cover_picture: imageUrl,
        cover_picture_id: imageId,
      });

      setProfile((prev: any) => ({
        ...prev,
        cover_picture: imageUrl,
      }));

      fetchProfile();
      alert("Cover picture updated!");
    } catch (error) {
      console.log(error);
      // console.error("Upload failed");
      alert("Failed to upload");
    } finally {
      setUploadingCover(false);
    }
  };

  // Delete Profile Picture
  const handleDeleteProfilePic = async () => {
    if (!window.confirm("Delete profile picture?")) return;

    try {
      await userAPI.deleteProfilePicture("profile");
      fetchProfile();
      alert("Profile picture deleted");
    } catch (error) {
      alert("Failed to delete");
    }
  };

  // Delete Cover Picture
  const handleDeleteCoverPic = async () => {
    if (!window.confirm("Delete cover picture?")) return;

    try {
      await userAPI.deleteProfilePicture("cover");
      fetchProfile();
      alert("Cover picture deleted");
    } catch (error) {
      alert("Failed to delete");
    }
  };

  // Update Name & Bio
  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await userAPI.updateProfile({ name, bio });
      alert("Profile updated!");
      fetchProfile();
    } catch (error) {
      alert("Failed to update");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your public profile</p>
        </div>

        {/* Cover Picture */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="relative h-48 bg-linear-to-r from-blue-500 to-purple-600">
            {profile?.cover_picture && (
              <img
                src={profile.cover_picture}
                className="w-full h-full object-cover"
                alt="Cover"
              />
            )}

            <div className="absolute bottom-4 right-4 flex gap-2">
              {profile?.cover_picture && (
                <button
                  onClick={handleDeleteCoverPic}
                  className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <label className="p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files && handleCoverPicUpload(e.target.files[0])
                  }
                />
              </label>
            </div>

            {uploadingCover && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">Profile Picture</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              {profile?.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  alt="Profile"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-200">
                  {profile?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 border-2 border-gray-200">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files && handleProfilePicUpload(e.target.files[0])
                  }
                />
              </label>

              {uploadingProfile && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <div>
              <p className="text-gray-600 mb-2">
                Recommended: Square image, at least 400x400px
              </p>
              {profile?.profile_picture && (
                <button
                  onClick={handleDeleteProfilePic}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove Picture
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">Basic Information</h2>
          </div>

          <form onSubmit={handleUpdateInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Tell us about yourself..."
                rows={4}
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">{bio.length}/160</p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
