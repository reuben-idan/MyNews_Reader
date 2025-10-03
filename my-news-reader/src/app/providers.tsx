'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the ThemeProvider, but use a placeholder during SSR
  // This ensures the theme context is always available
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
