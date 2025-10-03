import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiArrowLeft, FiBookmark, FiClock, FiExternalLink } from 'react-icons/fi';
import { fetchTopHeadlines } from '../services/newsApi';
import { useNews } from '../context/NewsContext';

export const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useNews();
  
  // In a real app, you would fetch a single article by ID
  // For now, we'll fetch all articles and find the one with the matching URL
  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchTopHeadlines(),
    select: (data) => {
      const decodedUrl = atob(id || '');
      return data.articles.find(article => article.url === decodedUrl);
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Article not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The article you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <FiArrowLeft className="mr-2" />
        Back to News
      </button>

      <header className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium rounded-full mb-4">
              {data.source.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {data.title}
            </h1>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center mr-4">
                <FiClock className="mr-1" />
                <span>{formatDate(data.publishedAt)}</span>
              </div>
              {data.author && (
                <span className="text-gray-700 dark:text-gray-300">By {data.author}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => toggleBookmark(data)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isBookmarked(data.url) ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <FiBookmark
              className={`w-6 h-6 ${
                isBookmarked(data.url) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {data.urlToImage && (
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={data.urlToImage}
              alt={data.title}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600?text=No+Image';
              }}
            />
          </div>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none">
        {data.content ? (
          <p className="text-lg leading-relaxed mb-6">{data.content}</p>
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-300 italic">
            No content available for this article.
          </p>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read full article on {data.source.name}
            <FiExternalLink className="ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
};
