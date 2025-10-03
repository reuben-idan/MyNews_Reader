'use client';

import { useState, useEffect } from 'react';
import { FiBookmark, FiTrendingUp, FiCalendar, FiFilter } from 'react-icons/fi';
import { useNews } from '@/context/NewsContext';

const SavedStats = () => {
  const { bookmarks } = useNews();
  const [stats, setStats] = useState({
    totalSaved: 0,
    thisWeek: 0,
    categories: new Set<string>(),
    oldestArticle: null as Date | null,
  });

  useEffect(() => {
    // Calculate statistics from bookmarks
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeekCount = bookmarks.filter(article => {
      const publishedDate = new Date(article.publishedAt);
      return publishedDate >= oneWeekAgo;
    }).length;

    const categories = new Set(bookmarks.map(article => {
      // Extract category from source name or content
      const sourceName = article.source.name.toLowerCase();
      if (sourceName.includes('tech')) return 'Technology';
      if (sourceName.includes('business')) return 'Business';
      if (sourceName.includes('sport')) return 'Sports';
      if (sourceName.includes('health')) return 'Health';
      if (sourceName.includes('science')) return 'Science';
      return 'General';
    }));

    const oldestArticle = bookmarks.length > 0
      ? new Date(Math.min(...bookmarks.map(article => new Date(article.publishedAt).getTime())))
      : null;

    setStats({
      totalSaved: bookmarks.length,
      thisWeek: thisWeekCount,
      categories,
      oldestArticle,
    });
  }, [bookmarks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Saved */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Saved</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalSaved}</p>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <FiBookmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              {stats.totalSaved > 0 ? 'Active collection' : 'Start saving articles'}
            </span>
          </div>
        </div>
      </div>

      {/* This Week */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.thisWeek}</p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <FiTrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {stats.thisWeek > 0 ? `${Math.round((stats.thisWeek / stats.totalSaved) * 100)}% of total` : 'No recent saves'}
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.categories.size}</p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <FiFilter className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium">
              {stats.categories.size > 0 ? 'Diverse interests' : 'Explore categories'}
            </span>
          </div>
        </div>
      </div>

      {/* Oldest Article */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Oldest Article</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {stats.oldestArticle
                ? new Date(stats.oldestArticle).toLocaleDateString()
                : 'None'
              }
            </p>
          </div>
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <FiCalendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-orange-600 dark:text-orange-400 font-medium">
              {stats.oldestArticle ? 'Collection started' : 'Start your collection'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedStats;
