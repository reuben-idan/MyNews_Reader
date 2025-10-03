import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FiBookmark, FiClock, FiExternalLink } from 'react-icons/fi';
import { fetchTopHeadlines } from '../services/newsApi';
import { categories } from '../types';
import { useNews } from '../context/NewsContext';

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const { isBookmarked, toggleBookmark } = useNews();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['headlines', activeCategory],
    queryFn: () => fetchTopHeadlines(),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-red-500 text-lg font-medium mb-4">
          Failed to load news. Please try again later.
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton loaders
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          data?.articles.map((article) => (
            <article
              key={article.url}
              className="bg-white/50 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow article-card"
            >
              {article.urlToImage && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=No+Image';
                    }}
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {article.source.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleBookmark(article);
                    }}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    aria-label={isBookmarked(article.url) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  >
                    <FiBookmark
                      className={`w-5 h-5 ${
                        isBookmarked(article.url) ? 'fill-yellow-400 text-yellow-400' : ''
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  <Link
                    to={`/article/${encodeURIComponent(btoa(article.url))}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read more <FiExternalLink className="ml-1" size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {!isLoading && data?.articles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
            No articles found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try a different category or search term
          </p>
        </div>
      )}
    </div>
  );
};
