import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News Categories - Browse by Topic | NewsFlow',
  description: 'Explore news categories including Technology, Business, Sports, Health, Science, and more. Find articles tailored to your interests with our comprehensive category system.',
  keywords: ['news categories', 'topic browsing', 'news by category', 'technology news', 'business news', 'sports news', 'health news', 'science news'],
  authors: [{ name: 'NewsFlow Team' }],
  creator: 'NewsFlow',
  publisher: 'NewsFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://newsflow.app/categories',
    title: 'News Categories - Browse by Topic | NewsFlow',
    description: 'Explore news categories including Technology, Business, Sports, Health, Science, and more.',
    siteName: 'NewsFlow',
    images: [
      {
        url: '/og-categories.jpg',
        width: 1200,
        height: 630,
        alt: 'News Categories - NewsFlow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News Categories - Browse by Topic | NewsFlow',
    description: 'Explore news categories including Technology, Business, Sports, Health, Science, and more.',
    creator: '@newsflow',
    images: ['/og-categories.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://newsflow.app/categories',
  },
};
