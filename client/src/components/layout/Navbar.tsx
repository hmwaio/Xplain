import {
  CircleUserRound,
  LogOut,
  Moon,
  PenSquare,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAPI } from "../../api/user.api";
import { useAuth } from "../../context/auth";
import { useDarkMode } from "../../hooks/useDarkMode";
import Spinner from "../ui/Spinner";
import Searching from "./Searching";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { dark, setDark } = useDarkMode();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getMyProfile();
      setProfile(response.data.profile);
    } catch (error) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div>
          <div className="mx-4 flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-center text-2xl font-extrabold text-orange-600">
              <span className="text-3xl">X</span>Plain
            </h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <Searching />
            </div>

            {/* Right Side */}
            <div className="sm:flex items-center gap-4">
              {/* Write Button */}
              <Link
                to="/new-post"
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <PenSquare className="w-5 h-5" />
                <span>Write</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 rounded-full p-2"
                >
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {profile?.profile_picture ? (
                      <img
                        src={profile.profile_picture}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
                        {profile?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-black text-orange-50 rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <Link
                      to="/me"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 hover:text-black"
                      onClick={() => setShowDropdown(false)}
                    >
                      <CircleUserRound className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 hover:text-black"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 hover:text-black"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Account</span>
                    </Link>

                    <button
                      onClick={() => setDark(!dark)}
                      className="flex items-center gap-3 px-4 py-2  hover:bg-white dark:hover:bg-gray-700 transition"
                    >
                      {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5"/>}
                      Swith
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
