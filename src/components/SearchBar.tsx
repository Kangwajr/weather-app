import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative group">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-3 bg-gray-800/30 text-white rounded-2xl 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50
                   border border-gray-700/50 pl-12 backdrop-blur-sm
                   transition-all duration-300 placeholder:text-gray-400"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-blue-400 transition-colors duration-300" />
      </div>
    </form>
  );
};