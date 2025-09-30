'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import components with loading states
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const TrendingCarousel = dynamic(() => import('@/components/TrendingCarousel'), {
  loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const CategoryFilter = dynamic(() => import('@/components/CategoryFilter'), {
  loading: () => <div className="h-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-8" />,
  ssr: true,
});

const ArticleList = dynamic(() => import('@/components/ArticleList'), {
  loading: () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      ))}
    </div>
  ),
  ssr: true,
});

const WeatherWidget = dynamic(() => import('@/components/WeatherWidget'), {
  loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: false, // Disable SSR for weather widget as it might use browser APIs
});

const StockTicker = dynamic(() => import('@/components/StockTicker'), {
  loading: () => <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: false, // Disable SSR for stock ticker as it might use browser APIs
});

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
        <HeroSection />
      </Suspense>
      
      <div className="mt-12">
        <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <TrendingCarousel />
        </Suspense>
      </div>
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <Suspense fallback={<div className="h-16 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
              <CategoryFilter />
            </Suspense>
          </div>
          <Suspense fallback={
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
              ))}
            </div>
          }>
            <ArticleList />
          </Suspense>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
            <WeatherWidget />
          </Suspense>
          <Suspense fallback={<div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
            <StockTicker />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
