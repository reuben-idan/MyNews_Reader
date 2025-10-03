'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { NewsProvider } from '@/context/NewsContext';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the providers, but use a placeholder during SSR
  // This ensures both theme and news contexts are always available
  return (
    <ThemeProvider>
      <NewsProvider>
        {children}
      </NewsProvider>
    </ThemeProvider>
  );
}
