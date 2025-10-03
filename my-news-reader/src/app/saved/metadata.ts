import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Articles - Your Personal Collection | NewsFlow',
  description: 'Access your saved articles and bookmarks. Build your personal collection of favorite news stories, articles, and content for easy reference and reading.',
  keywords: ['saved articles', 'bookmarks', 'personal collection', 'favorite articles', 'reading list', 'article bookmarks'],
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
    url: 'https://newsflow.app/saved',
    title: 'Saved Articles - Your Personal Collection | NewsFlow',
    description: 'Access your saved articles and bookmarks. Build your personal collection of favorite news stories.',
    siteName: 'NewsFlow',
    images: [
      {
        url: '/og-saved.jpg',
        width: 1200,
        height: 630,
        alt: 'Saved Articles - NewsFlow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saved Articles - Your Personal Collection | NewsFlow',
    description: 'Access your saved articles and bookmarks. Build your personal collection of favorite news stories.',
    creator: '@newsflow',
    images: ['/og-saved.jpg'],
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
    canonical: 'https://newsflow.app/saved',
  },
};
