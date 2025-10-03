'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { categories, type Category } from '@/types';

// Extended category data with additional information
const categoryData = [
  {
    ...categories[0], // general
    description: 'Breaking news and current events from around the world',
    articleCount: '12,543',
    trending: true,
    color: 'from-gray-600 to-gray-800',
    icon: '🌍',
  },
  {
    ...categories[1], // business
    description: 'Financial markets, corporate news, and economic updates',
    articleCount: '8,721',
    trending: false,
    color: 'from-green-600 to-green-800',
    icon: '📈',
  },
  {
    ...categories[2], // entertainment
    description: 'Celebrity news, movies, music, and pop culture',
    articleCount: '6,234',
    trending: true,
    color: 'from-pink-600 to-pink-800',
    icon: '🎬',
  },
  {
    ...categories[3], // health
    description: 'Medical breakthroughs, wellness tips, and health news',
    articleCount: '5,678',
    trending: false,
    color: 'from-red-600 to-red-800',
    icon: '🏥',
  },
  {
    ...categories[4], // science
    description: 'Scientific discoveries, research, and technology advances',
    articleCount: '4,567',
    trending: true,
    color: 'from-blue-600 to-blue-800',
    icon: '🔬',
  },
  {
    ...categories[5], // sports
    description: 'Sports news, scores, and athlete updates',
    articleCount: '7,890',
    trending: false,
    color: 'from-orange-600 to-orange-800',
    icon: '⚽',
  },
  {
    ...categories[6], // technology
    description: 'Tech news, gadgets, and digital innovation',
    articleCount: '9,876',
    trending: true,
    color: 'from-purple-600 to-purple-800',
    icon: '💻',
  },
];

const CategoryGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Category Card Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Trending Badge */}
            {category.trending && (
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                  <FiTrendingUp className="w-3 h-3 mr-1" />
                  HOT
                </span>
              </div>
            )}

            <Link href={`/categories/${category.id}`}>
              <div className="relative p-6">
                {/* Icon and Title */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <FiBookOpen className="w-4 h-4" />
                    <span>{category.articleCount} articles</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiUsers className="w-4 h-4" />
                    <span>Active</span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className={`flex items-center text-indigo-600 dark:text-indigo-400 transition-all duration-300 ${
                  hoveredCategory === category.id ? 'translate-x-2' : ''
                }`}>
                  <span className="text-sm font-medium mr-2">Explore {category.name}</span>
                  <FiArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Category Insights */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Category Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-100">Technology</strong> is the most active category this week
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-100">Science & Health</strong> showing highest engagement rates
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-100">50K+ articles</strong> across all categories updated daily
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
