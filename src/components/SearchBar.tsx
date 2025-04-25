
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ className = "" }: { className?: string }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl ${className}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          className="w-full h-14 pl-6 pr-16 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gloprice-purple focus:ring-2 focus:ring-gloprice-purple/20 transition-all search-box"
          placeholder="Search for products, brands, or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gloprice-purple hover:bg-gloprice-darkPurple text-white p-3 rounded-full transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
