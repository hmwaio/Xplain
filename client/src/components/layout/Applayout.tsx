import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import MobileBottomNav from "./MobileBottomNav";
import { X } from "lucide-react";

export default function AppLayout() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ✅ Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className=" flex flex-1 max-w-full mx-auto w-full">

        {/* LEFT SIDEBAR - Desktop */}
        <aside className=" hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <LeftSidebar />
        </aside>

        {/* CENTER FEED */}
        <main className="flex-1 px-4 py-6 overflow-y-auto pb-20">
          <Outlet />
        </main>

        {/* RIGHT SIDEBAR - Desktop */}
        <aside className="hidden lg:block w-80 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <RightSidebar />
        </aside>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto lg:hidden">
          <button onClick={() => setShowMobileMenu(false)}>
            <X className="h-8 w-8 rounded-full bg-orange-600 hover:bg-red-600 cursor-pointer" />
          </button>

          <LeftSidebar />
          <RightSidebar />
        </div>
      )}

      {/* Bottom Mobile Navigation */}
      <MobileBottomNav onMenuClick={() => setShowMobileMenu(true)}/>
    </div>
  );
}