import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DEFAULT_CITIES } from '../config/constants';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = DEFAULT_CITIES
        .map(city => city.name)
        .filter(city => 
          city.toLowerCase().includes(value.toLowerCase())
        );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
          {suggestions.map((city) => (
            <div
              key={city}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setSearchTerm(city);
                setSuggestions([]);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}