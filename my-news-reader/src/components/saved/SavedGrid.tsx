'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiBookmark, FiClock, FiShare2, FiTrash2, FiExternalLink, FiLock } from 'react-icons/fi';
import { useNews } from '@/context/NewsContext';
import { useAuth } from '@/context/AuthContext';
import type { Article } from '@/types';

const SavedGrid = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks, toggleBookmark, isBookmarked } = useNews();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Simulate loading bookmarks
    const fetchSavedArticles = async () => {
      setLoading(true);
      // In a real app, this would be an API call or come from the context
      await new Promise(resolve => setTimeout(resolve, 800));
      setSavedArticles(bookmarks);
      setLoading(false);
    };

    fetchSavedArticles();
  }, [bookmarks]);

  const formatTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleRemoveBookmark = (article: Article, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article);
  };

  // Show login prompt for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <FiLock className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Sign in to view saved articles
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create an account to save articles for later and access them from any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
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

  if (savedArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FiBookmark className="w-12 h-12 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No saved articles yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start building your personal collection by bookmarking articles you're interested in.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Browse Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {savedArticles.length} Saved Article{savedArticles.length !== 1 ? 's' : ''}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Updated in real-time
        </div>
      </div>

      {/* Saved Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedArticles.map((article) => (
          <article key={article.url} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
            {/* Article Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.urlToImage || '/placeholder-image.jpg'}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Saved Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white">
                  <FiBookmark className="w-3 h-3 mr-1" />
                  SAVED
                </span>
              </div>

              {/* Remove Bookmark Button */}
              <button
                onClick={(e) => handleRemoveBookmark(article, e)}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Remove from saved"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="font-medium text-purple-600 dark:text-purple-400">{article.source.name}</span>
                <span>•</span>
                <FiClock className="w-3 h-3" />
                <span>{formatTimeAgo(article.publishedAt)}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                <Link href={`/article/${btoa(article.url)}`}>
                  {article.title}
                </Link>
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                {article.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href={`/article/${btoa(article.url)}`}
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Read Article →
                </Link>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More or Management Options */}
      {savedArticles.length > 0 && (
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {savedArticles.length} saved article{savedArticles.length !== 1 ? 's' : ''}
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
              Export Saved Articles
            </button>
            <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
              Clear All Saved
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedGrid;
