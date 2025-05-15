import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ onSearch, placeholder = "Ara..." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useDebouncedCallback((value) => {
    onSearch(value);
  }, 1000);

  return (
    <div className="relative ">
      <input
        autoFocus
        type="text"
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          handleSearch(value);
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      />
      <svg
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
