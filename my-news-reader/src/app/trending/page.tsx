'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import components with loading states
const TrendingHeader = dynamic(() => import('@/components/trending/TrendingHeader'), {
  loading: () => <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const TrendingGrid = dynamic(() => import('@/components/trending/TrendingGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      ))}
    </div>
  ),
  ssr: true,
});

const TrendingSidebar = dynamic(() => import('@/components/trending/TrendingSidebar'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const CategoryFilter = dynamic(() => import('@/components/CategoryFilter'), {
  loading: () => <div className="h-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-8" />,
  ssr: true,
});

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trending Header */}
      <div className="mb-12">
        <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <TrendingHeader />
        </Suspense>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Trending Articles Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
              ))}
            </div>
          }>
            <TrendingGrid />
          </Suspense>
        </div>

        {/* Trending Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
            <TrendingSidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
