import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FiArrowLeft, FiFilter, FiSearch, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import { categories, type Category } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import components with loading states
const CategoryArticles = dynamic(() => import('@/components/categories/CategoryArticles'), {
  loading: () => (
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
  ),
  ssr: true,
});

const CategoryFilter = dynamic(() => import('@/components/categories/CategoryFilter'), {
  loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>,
  ssr: true,
});

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Get category data by ID
function getCategoryById(categoryId: string): Category | null {
  return categories.find(cat => cat.id === categoryId) || null;
}

// Generate metadata for the category
export async function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryById(params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} News | NewsFlow`,
    description: `Latest ${category.name.toLowerCase()} news, articles, and updates. Stay informed with breaking news and trending stories in ${category.name.toLowerCase()}.`,
    openGraph: {
      title: `${category.name} News | NewsFlow`,
      description: `Latest ${category.name.toLowerCase()} news and updates`,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = getCategoryById(params.category);

  if (!category) {
    notFound();
  }

  // Get search parameters
  const search = typeof searchParams?.search === 'string' ? searchParams.search : '';
  const sortBy = typeof searchParams?.sortBy === 'string' ? searchParams.sortBy : 'publishedAt';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/categories"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/trending"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Trending
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {category.name} News
              </h1>
              <p className="text-lg text-gray-600">
                Latest {category.name.toLowerCase()} news, articles, and updates
              </p>
            </div>

            {/* Category Stats */}
            <div className="hidden md:flex items-center space-x-8 text-sm">
              <div className="flex items-center text-gray-600">
                <FiTrendingUp className="w-4 h-4 mr-2" />
                <span>1,234 trending articles</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiBookOpen className="w-4 h-4 mr-2" />
                <span>Updated hourly</span>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Suspense fallback={<div className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>}>
                <CategoryFilter
                  category={category}
                  initialSearch={search}
                  initialSortBy={sortBy}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Description */}
        <div className="mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              About {category.name} News
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Stay informed with the latest {category.name.toLowerCase()} news and developments.
              Our comprehensive coverage includes breaking news, in-depth analysis, and expert insights
              in {category.name.toLowerCase()}.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Latest {category.name} Articles
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <FiFilter className="w-4 h-4 mr-1" />
              <span>Sort by: {sortBy === 'publishedAt' ? 'Latest' : sortBy}</span>
            </div>
          </div>

          <Suspense fallback={
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
          }>
            <CategoryArticles
              category={category}
              search={search}
              sortBy={sortBy}
            />
          </Suspense>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated with {category.name} News
          </h3>
          <p className="mb-6 opacity-90">
            Get the latest {category.name.toLowerCase()} articles delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
