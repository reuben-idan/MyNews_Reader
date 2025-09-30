'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiBookmark, FiClock, FiShare2, FiExternalLink } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

// Mock data - replace with actual API call
const mockArticles = [
  {
    id: '1',
    title: 'New AI Breakthrough Could Revolutionize Healthcare',
    description: 'Researchers develop an AI system that can predict health issues before symptoms appear.',
    url: 'https://example.com/article1',
    urlToImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date('2025-09-20T08:30:00Z').toISOString(),
    source: { name: 'Tech News' },
    category: 'technology',
  },
  {
    id: '2',
    title: 'Global Markets Reach New Highs',
    description: 'Stock markets around the world surge as economic recovery continues.',
    url: 'https://example.com/article2',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date('2025-09-19T14:15:00Z').toISOString(),
    source: { name: 'Financial Times' },
    category: 'business',
  },
  // Add more mock articles as needed
];

const ArticleList = () => {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState(mockArticles);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  
  // Safely get category from searchParams
  const category = searchParams?.get('category') || 'all';
  const itemsPerPage = 6;

  // Load saved articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Filter articles by category
  useEffect(() => {
    setLoading(true);
    
    // In a real app, you would fetch from an API here
    const filtered = category === 'all' 
      ? mockArticles 
      : mockArticles.filter(article => article.category === category);
    
    setArticles(filtered);
    setPage(1);
    setLoading(false);
  }, [category]);

  // Toggle save article
  const toggleSaveArticle = (articleId: string) => {
    const newSavedArticles = savedArticles.includes(articleId)
      ? savedArticles.filter(id => id !== articleId)
      : [...savedArticles, articleId];
    
    setSavedArticles(newSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
  };

  // Share article
  const shareArticle = async (title: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={article.urlToImage || 'https://via.placeholder.com/600x400?text=No+Image'} 
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
              <button
                onClick={() => toggleSaveArticle(article.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  savedArticles.includes(article.id)
                    ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
                aria-label={savedArticles.includes(article.id) ? 'Remove from saved' : 'Save article'}
              >
                <FiBookmark 
                  className={`w-5 h-5 ${savedArticles.includes(article.id) ? 'fill-current' : ''}`} 
                />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="capitalize">{article.category}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <FiClock className="w-3.5 h-3.5 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                <Link href={`/article/${article.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {article.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {article.source.name}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => shareArticle(article.title, article.url)}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="Share article"
                  >
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="Open original article"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
