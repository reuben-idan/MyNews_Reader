'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Dynamically import components with loading states
const AboutHeader = dynamic(() => import('@/components/about/AboutHeader'), {
  loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const AboutHero = dynamic(() => import('@/components/about/AboutHero'), {
  loading: () => <div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const AboutContent = dynamic(() => import('@/components/about/AboutContent'), {
  loading: () => (
    <div className="space-y-8">
      <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      <div className="h-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
    </div>
  ),
  ssr: true,
});

const FeaturesSection = dynamic(() => import('@/components/about/FeaturesSection'), {
  loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const TeamSection = dynamic(() => import('@/components/about/TeamSection'), {
  loading: () => <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

const ContactSection = dynamic(() => import('@/components/about/ContactSection'), {
  loading: () => <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />,
  ssr: true,
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* About Header */}
      <div className="mb-16">
        <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <AboutHeader />
        </Suspense>
      </div>

      {/* Hero Section */}
      <div className="mb-16">
        <Suspense fallback={<div className="h-96 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <AboutHero />
        </Suspense>
      </div>

      {/* Main Content */}
      <div className="mb-16">
        <Suspense fallback={
          <div className="space-y-8">
            <div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
            <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
            <div className="h-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
          </div>
        }>
          <AboutContent />
        </Suspense>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <FeaturesSection />
        </Suspense>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <TeamSection />
        </Suspense>
      </div>

      {/* Contact Section */}
      <div className="mb-16">
        <Suspense fallback={<div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />}>
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
}
