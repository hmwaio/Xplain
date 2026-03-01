import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function Searching() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    
    if (!trimmed || trimmed.length < 2) {
      alert("Please enter at least 2 characters");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setValue("");
    inputRef.current?.blur();
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search posts or users..."
          minLength={2}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}

export default Searching;