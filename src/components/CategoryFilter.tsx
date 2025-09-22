'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiFilter } from 'react-icons/fi';

const categories = [
  { id: 'all', name: 'All News' },
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'general', name: 'General' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'technology', name: 'Technology' },
];

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    
    // Reset to first page when changing categories
    params.delete('page');
    
    router.push(`/?${params.toString()}`, { scroll: false });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="mb-8">
      {/* Desktop Filter */}
      <div className="hidden md:flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <FiFilter className="w-4 h-4" />
          {categories.find(c => c.id === currentCategory)?.name || 'Filter'}
        </button>

        {isMobileMenuOpen && (
          <div className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-left ${
                    currentCategory === category.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
