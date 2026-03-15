export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Trending Tags */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold mb-4">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#react</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#javascript</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">#webdev</span>
        </div>
      </div>

      {/* Suggested Users */}
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-bold mb-4">Who to Follow</h3>
        {/* User suggestions */}
      </div>
    </div>
  );
}