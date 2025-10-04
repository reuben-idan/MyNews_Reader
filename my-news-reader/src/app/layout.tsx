import type { Metadata } from 'next';

type Viewport = {
  width: 'device-width';
  initialScale: number;
  maximumScale: number;
  userScalable: boolean;
  themeColor: Array<{ media: string; color: string }>;
};
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { Providers } from './providers';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

// Dynamically import the ClientNavbar with SSR disabled
const ClientNavbar = dynamic(
  () => import('@/components/ClientNavbar'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" />
    )
  }
);

// Optimize font loading with display swap
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
});


export const metadata: Metadata = {
  title: {
    default: 'NewsFlow - Stay Informed',
    template: '%s | NewsFlow'
  },
  description: 'A modern news reader application with personalized content, real-time updates, and curated news from trusted sources.',
  keywords: ['news', 'reader', 'current events', 'updates', 'personalized news'],
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
    url: 'https://newsflow.app',
    title: 'NewsFlow - Stay Informed',
    description: 'A modern news reader application with personalized content',
    siteName: 'NewsFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NewsFlow - Stay Informed',
    description: 'A modern news reader application with personalized content',
    creator: '@newsflow',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

// Viewport configuration for Next.js 13+
const viewportConfig: Viewport = {
  width: 'device-width' as const,
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add viewport meta tag in the head instead of using the viewport export
  const viewportMeta = [
    {
      name: 'viewport',
      content: `width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes`,
    },
    ...viewportConfig.themeColor.map(({ media, color }) => ({
      name: 'theme-color',
      media,
      content: color,
    })),
  ];

  return (
    <html 
      lang="en" 
      className={`${inter.variable} font-sans`} 
      suppressHydrationWarning
      suppressContentEditableWarning
    >
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <ClientNavbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
