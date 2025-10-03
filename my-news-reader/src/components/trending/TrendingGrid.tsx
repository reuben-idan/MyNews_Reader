'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrendingUp, FiClock, FiBookmark, FiShare2 } from 'react-icons/fi';
import { useNews } from '@/context/NewsContext';
import type { Article } from '@/types';

// Mock trending articles - in a real app, this would come from an API
const mockTrendingArticles: Article[] = [
  {
    source: { id: 'trending-1', name: 'Viral News' },
    author: 'Sarah Johnson',
    title: 'Revolutionary AI Breakthrough Changes Everything We Know About Technology',
    description: 'Scientists at leading tech companies announce a groundbreaking AI advancement that could reshape multiple industries and daily life as we know it.',
    url: 'https://example.com/ai-breakthrough',
    urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    content: 'A major breakthrough in artificial intelligence has been announced...'
  },
  {
    source: { id: 'trending-2', name: 'Global News' },
    author: 'Michael Chen',
    title: 'World Leaders Reach Historic Climate Agreement at Emergency Summit',
    description: 'In a unprecedented move, 195 countries unite on aggressive climate action plan with binding commitments and massive funding for green initiatives.',
    url: 'https://example.com/climate-agreement',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    content: 'World leaders have reached a historic agreement on climate action...'
  },
  {
    source: { id: 'trending-3', name: 'TechCrunch' },
    author: 'Emma Rodriguez',
    title: 'Elon Musk Announces Tesla Bot Army - First Units Shipping Next Month',
    description: 'Tesla CEO reveals mass production timeline for humanoid robots, with first commercial deployments beginning in manufacturing and healthcare sectors.',
    url: 'https://example.com/tesla-bots',
    urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    content: 'Tesla is ready to begin mass production of humanoid robots...'
  },
  {
    source: { id: 'trending-4', name: 'Business Weekly' },
    author: 'David Kim',
    title: 'Stock Market Hits Record High as Tech Sector Surges 15% This Week',
    description: 'Major indices reach all-time highs driven by unprecedented growth in AI, renewable energy, and biotechnology stocks.',
    url: 'https://example.com/stock-surge',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    content: 'Global stock markets have reached unprecedented levels...'
  },
  {
    source: { id: 'trending-5', name: 'Science Daily' },
    author: 'Dr. Lisa Wang',
    title: 'Scientists Discover Water on Mars - Could Support Human Colonies',
    description: 'NASA mission confirms significant water deposits in Mars southern hemisphere, opening new possibilities for human exploration and colonization.',
    url: 'https://example.com/mars-water',
    urlToImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    content: 'A major discovery has been made on the surface of Mars...'
  },
  {
    source: { id: 'trending-6', name: 'Sports Central' },
    author: 'Jake Thompson',
    title: 'Championship Upset: Underdog Team Defeats Defending Champions in Final Seconds',
    description: 'In a stunning turn of events, the underdog team scores a last-second victory against the three-time defending champions in front of a sold-out arena.',
    url: 'https://example.com/championship-upset',
    urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    content: 'Sports fans witnessed one of the greatest upsets in championship history...'
  }
];

const TrendingGrid = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggleBookmark } = useNews();

  useEffect(() => {
    // Simulate API call
    const fetchTrendingArticles = async () => {
      setLoading(true);
      // In a real app, this would be an API call to get trending articles
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      setArticles(mockTrendingArticles);
      setLoading(false);
    };

    fetchTrendingArticles();
  }, []);

  const formatTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

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

  return (
    <div className="space-y-6">
      {/* Trending Badge */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <FiTrendingUp className="w-4 h-4 text-red-500" />
        <span>Updated every 5 minutes</span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
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

              {/* Trending Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                  #{index + 1}
                </span>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleBookmark(article);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-colors"
                aria-label="Bookmark article"
              >
                <FiBookmark
                  className={`w-4 h-4 ${isBookmarked(article.url) ? 'text-blue-600 fill-current' : 'text-gray-600 dark:text-gray-400'}`}
                />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="font-medium text-blue-600 dark:text-blue-400">{article.source.name}</span>
                <span>•</span>
                <FiClock className="w-3 h-3" />
                <span>{formatTimeAgo(article.publishedAt)}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Read More →
                </Link>

                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <FiShare2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Load More Trending Stories
          <FiTrendingUp className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TrendingGrid;
