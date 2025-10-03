import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trending News - Latest Viral Stories | NewsFlow',
  description: 'Discover the most trending news stories and viral content from around the world. Stay updated with real-time trending topics, breaking news, and popular articles.',
  keywords: ['trending news', 'viral stories', 'popular articles', 'breaking news', 'social media trends', 'current events'],
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
    url: 'https://newsflow.app/trending',
    title: 'Trending News - Latest Viral Stories | NewsFlow',
    description: 'Discover the most trending news stories and viral content from around the world.',
    siteName: 'NewsFlow',
    images: [
      {
        url: '/og-trending.jpg',
        width: 1200,
        height: 630,
        alt: 'Trending News - NewsFlow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending News - Latest Viral Stories | NewsFlow',
    description: 'Discover the most trending news stories and viral content from around the world.',
    creator: '@newsflow',
    images: ['/og-trending.jpg'],
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
    canonical: 'https://newsflow.app/trending',
  },
};
