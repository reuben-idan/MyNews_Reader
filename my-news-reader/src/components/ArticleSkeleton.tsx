import { FiClock, FiUser, FiExternalLink, FiShare2, FiBookmark } from 'react-icons/fi';

interface ArticleSkeletonProps {
  showImage?: boolean;
}

export default function ArticleSkeleton({ showImage = true }: ArticleSkeletonProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Skeleton */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </nav>

      {/* Article Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header Skeleton */}
        <header className="mb-8">
          {/* Source Badge Skeleton */}
          <div className="flex items-center mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2 mx-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>

          {/* Meta Information Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Featured Image Skeleton */}
        {showImage && (
          <div className="mb-8">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        )}

        {/* Article Content Skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-4/5"></div>
        </div>
      </article>
    </div>
  );
}
