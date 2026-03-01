import {
  BookMarked,
  CircleUserRound,
  Home,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LeftSidebar() {
  return (
    <div>
      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/saved-posts"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <BookMarked className="w-5 h-5" />
          <span>Library</span>
        </Link>

        <Link
          to="/me"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <CircleUserRound className="w-5 h-5" />
          <span>Profile</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        <Link
          to="/account"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </Link>
      </nav>
    </div>
  );
}
