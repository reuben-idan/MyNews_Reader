'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { Category } from '@/types';

interface CategoryFilterProps {
  category: Category;
  initialSearch?: string;
  initialSortBy?: string;
}

export default function CategoryFilter({ category, initialSearch = '', initialSortBy = 'publishedAt' }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL when search or sort changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (sortBy !== 'publishedAt') params.set('sortBy', sortBy);

    const query = params.toString();
    const newUrl = `/categories/${category.id}${query ? `?${query}` : ''}`;

    router.replace(newUrl);
  }, [search, sortBy, category.id, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect above
  };

  const clearSearch = () => {
    setSearch('');
  };

  const clearFilters = () => {
    setSearch('');
    setSortBy('publishedAt');
  };

  const hasActiveFilters = search || sortBy !== 'publishedAt';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${category.name.toLowerCase()} articles...`}
          className="block w-full pl-10 pr-10 py-3 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </form>

      {/* Filter Controls */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="publishedAt">Latest First</option>
                <option value="title">Title A-Z</option>
                <option value="author">Author A-Z</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiFilter className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-4 h-4 mr-1" />
              Clear
            </button>
          )}
        </div>

        {/* Mobile Filter Panel */}
        {isFilterOpen && (
          <div className="md:hidden mt-4 p-4 bg-gray-50 rounded-md border">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="publishedAt">Latest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="author">Author A-Z</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full inline-flex justify-center items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-800 font-medium">Active filters:</span>
              {search && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Search: "{search}"
                  <button
                    onClick={clearSearch}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {sortBy !== 'publishedAt' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Sort: {sortBy === 'title' ? 'Title A-Z' : 'Author A-Z'}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-xs font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
