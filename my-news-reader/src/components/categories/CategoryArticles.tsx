'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Helper function to format dates
const formatDate = (date: Date, format: string) => {
  if (format === 'MMM dd') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString();
};
import { FiClock, FiUser, FiExternalLink, FiBookmark } from 'react-icons/fi';
import { Article, Category } from '@/types';
import { generateArticleUrl } from '@/services/newsApi';

interface CategoryArticlesProps {
  category: Category;
  search: string;
  sortBy: string;
}

// Mock articles for the specific category
const getCategoryArticles = (category: Category): Article[] => {
  const baseArticles = [
    {
      source: { id: category.id, name: category.name === 'Business' ? 'Financial Times' : 'BBC News' },
      author: category.name === 'Business' ? 'Sarah Johnson' : 'Michael Chen',
      title: category.name === 'Business'
        ? 'Stock Market Hits Record High as Tech Sector Surges'
        : 'Revolutionary Medical Breakthrough Announced',
      description: category.name === 'Business'
        ? 'Major indices reach all-time highs driven by strong earnings reports from technology companies.'
        : 'Scientists announce groundbreaking treatment that could revolutionize healthcare.',
      url: `https://example.com/${category.id}/article-1`,
      urlToImage: category.name === 'Business'
        ? 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: 'This is a detailed article about the latest developments...'
    },
    {
      source: { id: category.id, name: category.name === 'Business' ? 'Wall Street Journal' : 'CNN' },
      author: category.name === 'Business' ? 'David Miller' : 'Dr. Emily Rodriguez',
      title: category.name === 'Business'
        ? 'Federal Reserve Signals Potential Rate Cuts'
        : 'New Study Reveals Health Benefits of Exercise',
      description: category.name === 'Business'
        ? 'Central bank officials hint at monetary policy adjustments in response to economic indicators.'
        : 'Comprehensive research shows significant improvements in cardiovascular health.',
      url: `https://example.com/${category.id}/article-2`,
      urlToImage: category.name === 'Business'
        ? 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: 'Detailed analysis of the economic implications...'
    },
    {
      source: { id: category.id, name: category.name === 'Business' ? 'Bloomberg' : 'Reuters' },
      author: category.name === 'Business' ? 'Jennifer Liu' : 'Dr. Robert Kim',
      title: category.name === 'Business'
        ? 'Cryptocurrency Market Shows Signs of Recovery'
        : 'Breakthrough in Renewable Energy Technology',
      description: category.name === 'Business'
        ? 'Digital assets rebound as institutional investors show renewed interest.'
        : 'New solar panel technology promises 40% efficiency improvement.',
      url: `https://example.com/${category.id}/article-3`,
      urlToImage: category.name === 'Business'
        ? 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: 'In-depth coverage of market trends...'
    },
    {
      source: { id: category.id, name: category.name === 'Business' ? 'Forbes' : 'Nature' },
      author: category.name === 'Business' ? 'Mark Thompson' : 'Dr. Lisa Park',
      title: category.name === 'Business'
        ? 'Startup Funding Reaches New Heights in Q4'
        : 'Scientists Discover New Species in Amazon Rainforest',
      description: category.name === 'Business'
        ? 'Venture capital investment hits record levels as tech startups attract massive funding.'
        : 'Biodiversity survey reveals previously unknown plant and animal species.',
      url: `https://example.com/${category.id}/article-4`,
      urlToImage: category.name === 'Business'
        ? 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: 'Comprehensive analysis of investment trends...'
    },
    {
      source: { id: category.id, name: category.name === 'Business' ? 'CNBC' : 'Science Magazine' },
      author: category.name === 'Business' ? 'Rachel Green' : 'Dr. Kevin Zhang',
      title: category.name === 'Business'
        ? 'Global Supply Chain Disruption Continues to Impact Markets'
        : 'Quantum Computing Breakthrough Achieved',
      description: category.name === 'Business'
        ? 'Ongoing logistical challenges create volatility in commodity prices worldwide.'
        : 'Researchers achieve quantum supremacy in practical computing applications.',
      url: `https://example.com/${category.id}/article-5`,
      urlToImage: category.name === 'Business'
        ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      content: 'Detailed examination of global trade dynamics...'
    },
    {
      source: { id: category.id, name: category.name === 'Business' ? 'The Economist' : 'National Geographic' },
      author: category.name === 'Business' ? 'Dr. Amanda Foster' : 'Dr. Maria Santos',
      title: category.name === 'Business'
        ? 'Economic Outlook: Growth Projections for 2024'
        : 'Climate Change Impact on Coastal Communities',
      description: category.name === 'Business'
        ? 'Economists predict steady growth despite geopolitical uncertainties.'
        : 'Rising sea levels threaten millions living in coastal regions worldwide.',
      url: `https://example.com/${category.id}/article-6`,
      urlToImage: category.name === 'Business'
        ? 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: 'In-depth economic analysis and forecasting...'
    }
  ];

  return baseArticles;
};

export default function CategoryArticles({ category, search, sortBy }: CategoryArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchArticles = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let categoryArticles = getCategoryArticles(category);

      // Apply search filter
      if (search) {
        categoryArticles = categoryArticles.filter(article =>
          article.title.toLowerCase().includes(search.toLowerCase()) ||
          article.description?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply sorting
      categoryArticles.sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'author':
            return (a.author || '').localeCompare(b.author || '');
          default:
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
      });

      setArticles(categoryArticles);
      setLoading(false);
    };

    fetchArticles();
  }, [category, search, sortBy]);

  useEffect(() => {
    // Load saved articles from localStorage
    const saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    setSavedArticles(saved);
  }, []);

  const toggleBookmark = (articleUrl: string, event: React.MouseEvent) => {
    event.preventDefault();

    const newSavedArticles = savedArticles.includes(articleUrl)
      ? savedArticles.filter(url => url !== articleUrl)
      : [...savedArticles, articleUrl];

    setSavedArticles(newSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(newSavedArticles));
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <FiExternalLink className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
        <p className="text-gray-600">
          {search ? 'Try adjusting your search terms or filters.' : 'No articles available in this category at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
          {/* Article Image */}
          {article.urlToImage && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Bookmark Button */}
              <button
                onClick={(e) => toggleBookmark(article.url, e)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  savedArticles.includes(article.url)
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
                title={savedArticles.includes(article.url) ? 'Remove bookmark' : 'Bookmark article'}
              >
                <FiBookmark className={`w-4 h-4 ${savedArticles.includes(article.url) ? 'fill-current' : ''}`} />
              </button>
            </div>
          )}

          {/* Article Content */}
          <div className="p-6">
            {/* Source Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                category.id === 'business' ? 'bg-green-100 text-green-800' :
                category.id === 'health' ? 'bg-red-100 text-red-800' :
                category.id === 'science' ? 'bg-blue-100 text-blue-800' :
                category.id === 'sports' ? 'bg-orange-100 text-orange-800' :
                category.id === 'technology' ? 'bg-purple-100 text-purple-800' :
                category.id === 'entertainment' ? 'bg-pink-100 text-pink-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {article.source.name}
              </span>
              <time className="text-xs text-gray-500">
                {formatDate(new Date(article.publishedAt), 'MMM dd')}
              </time>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
              <Link href={`/article/${generateArticleUrl(article)}`}>
                {article.title}
              </Link>
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {article.description}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                {article.author && (
                  <div className="flex items-center">
                    <FiUser className="w-3 h-3 mr-1" />
                    <span>{article.author}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FiClock className="w-3 h-3 mr-1" />
                  <span>{Math.ceil((article.content?.length || 0) / 200)} min read</span>
                </div>
              </div>

              <Link
                href={`/article/${generateArticleUrl(article)}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
