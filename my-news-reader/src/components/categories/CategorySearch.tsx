'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface CategorySearchProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: string[]) => void;
}

const CategorySearch = ({ onSearch, onFilter }: CategorySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Available filter options
  const filterOptions = [
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'popular', label: 'Most Popular', icon: '👥' },
    { id: 'recent', label: 'Recently Updated', icon: '🕐' },
    { id: 'active', label: 'High Activity', icon: '⚡' },
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId];

    setSelectedFilters(newFilters);
    onFilter?.(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilter?.([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <FiFilter className="h-5 w-5" />
            <span>Filters</span>
            {selectedFilters.length > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedFilters.length}
              </span>
            )}
          </button>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Filter Categories</h3>

                <div className="space-y-2">
                  {filterOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option.id)}
                        onChange={() => handleFilterToggle(option.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </span>
                    </label>
                  ))}
                </div>

                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    <FiX className="h-4 w-4" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {selectedFilters.map((filterId) => {
            const option = filterOptions.find(opt => opt.id === filterId);
            return (
              <span
                key={filterId}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200"
              >
                {option?.icon} {option?.label}
                <button
                  onClick={() => handleFilterToggle(filterId)}
                  className="ml-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
