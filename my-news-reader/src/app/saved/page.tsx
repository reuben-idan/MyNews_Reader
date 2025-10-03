'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import components with loading states
const SavedHeader = dynamic(() => import('@/components/saved/SavedHeader'), {
  loading: () => <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const SavedGrid = dynamic(() => import('@/components/saved/SavedGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      ))}
    </div>
  ),
  ssr: true,
});

const SavedStats = dynamic(() => import('@/components/saved/SavedStats'), {
  loading: () => <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

export default function SavedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Saved Header */}
      <div className="mb-12">
        <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <SavedHeader />
        </Suspense>
      </div>

      {/* Saved Statistics */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <SavedStats />
        </Suspense>
      </div>

      {/* Saved Articles Grid or Empty State */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>
      }>
        <SavedGrid />
      </Suspense>
    </div>
  );
}
