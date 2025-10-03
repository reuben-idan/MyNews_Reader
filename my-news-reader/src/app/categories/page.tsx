'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import components with loading states
const CategoriesHeader = dynamic(() => import('@/components/categories/CategoriesHeader'), {
  loading: () => <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const CategoryGrid = dynamic(() => import('@/components/categories/CategoryGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      ))}
    </div>
  ),
  ssr: true,
});

const CategoryStats = dynamic(() => import('@/components/categories/CategoryStats'), {
  loading: () => <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const CategorySearch = dynamic(() => import('@/components/categories/CategorySearch'), {
  loading: () => <div className="h-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-8" />,
  ssr: true,
});

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories Header */}
      <div className="mb-12">
        <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <CategoriesHeader />
        </Suspense>
      </div>

      {/* Category Statistics */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <CategoryStats />
        </Suspense>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <CategorySearch />
        </Suspense>
      </div>

      {/* Categories Grid */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>
      }>
        <CategoryGrid />
      </Suspense>
    </div>
  );
}
