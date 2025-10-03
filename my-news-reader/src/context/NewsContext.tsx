import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Article } from '../types';

interface NewsContextType {
  bookmarks: Article[];
  toggleBookmark: (article: Article) => void;
  isBookmarked: (url: string) => boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarks');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const toggleBookmark = (article: Article) => {
    setBookmarks(prev => {
      const isBookmarked = prev.some(item => item.url === article.url);
      if (isBookmarked) {
        return prev.filter(item => item.url !== article.url);
      } else {
        return [...prev, article];
      }
    });
  };

  const isBookmarked = (url: string) => {
    return bookmarks.some(article => article.url === url);
  };

  return (
    <NewsContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
