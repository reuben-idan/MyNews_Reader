import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Article } from '../types';
import { useAuth } from './AuthContext';

interface NewsContextType {
  bookmarks: Article[];
  toggleBookmark: (article: Article) => void;
  isBookmarked: (url: string) => boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Load user-specific bookmarks
      const userBookmarksKey = `bookmarks_${user.id}`;
      const saved = localStorage.getItem(userBookmarksKey);
      setBookmarks(saved ? JSON.parse(saved) : []);
    } else {
      // Clear bookmarks for non-authenticated users
      setBookmarks([]);
    }
  }, [user, isAuthenticated]);

  // Save bookmarks to localStorage whenever they change (user-specific)
  useEffect(() => {
    if (isAuthenticated && user) {
      const userBookmarksKey = `bookmarks_${user.id}`;
      localStorage.setItem(userBookmarksKey, JSON.stringify(bookmarks));
    }
  }, [bookmarks, user, isAuthenticated]);

  const toggleBookmark = (article: Article) => {
    if (!isAuthenticated || !user) {
      // For non-authenticated users, we could show a login prompt
      // For now, just ignore the action
      return;
    }

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
