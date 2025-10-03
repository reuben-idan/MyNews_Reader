import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About NewsFlow - Your Intelligent News Companion',
  description: 'Learn about NewsFlow, your intelligent news companion. Discover our mission to democratize quality information through curated content, AI-powered personalization, and innovative technology.',
  keywords: ['about NewsFlow', 'news platform', 'intelligent news reader', 'curated content', 'news technology', 'media company'],
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
    url: 'https://newsflow.app/about',
    title: 'About NewsFlow - Your Intelligent News Companion',
    description: 'Learn about NewsFlow, your intelligent news companion delivering curated content with precision.',
    siteName: 'NewsFlow',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About NewsFlow - Your Intelligent News Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NewsFlow - Your Intelligent News Companion',
    description: 'Learn about NewsFlow, your intelligent news companion delivering curated content with precision.',
    creator: '@newsflow',
    images: ['/og-about.jpg'],
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
    canonical: 'https://newsflow.app/about',
  },
};
