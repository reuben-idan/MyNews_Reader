'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Article, fetchTopHeadlines, fetchWeatherByLocation, fetchStockQuotes, WeatherData, StockQuote } from '@/lib/api';

type AppContextType = {
  // News state
  articles: Article[];
  loading: boolean;
  error: string | null;
  category: string;
  setCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Weather state
  weather: WeatherData | null;
  weatherLoading: boolean;
  weatherError: string | null;
  
  // Stocks state
  stocks: Record<string, StockQuote>;
  stocksLoading: boolean;
  stocksError: string | null;
  
  // Favorites
  savedArticles: string[];
  toggleSaveArticle: (articleId: string) => void;
  isArticleSaved: (articleId: string) => boolean;
  
  // Refresh data
  refreshData: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // News state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  
  // Stocks state
  const [stocks, setStocks] = useState<Record<string, StockQuote>>({});
  const [stocksLoading, setStocksLoading] = useState<boolean>(true);
  const [stocksError, setStocksError] = useState<string | null>(null);
  
  // Favorites
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  
  // Load saved articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      try {
        setSavedArticles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved articles', e);
      }
    }
  }, []);
  
  // Save articles to localStorage when they change
  useEffect(() => {
    if (savedArticles.length > 0) {
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    }
  }, [savedArticles]);
  
  // Toggle save article
  const toggleSaveArticle = (articleId: string) => {
    setSavedArticles(prev => 
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };
  
  // Check if article is saved
  const isArticleSaved = (articleId: string) => {
    return savedArticles.includes(articleId);
  };
  
  // Fetch news articles
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchTopHeadlines(category);
      setArticles(data);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch weather data
  const fetchWeather = async () => {
    setWeatherLoading(true);
    setWeatherError(null);
    
    try {
      // Default to New York, in a real app you might want to get user's location
      const data = await fetchWeatherByLocation('New York');
      setWeather(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setWeatherError('Failed to load weather data.');
    } finally {
      setWeatherLoading(false);
    }
  };
  
  // Fetch stock data
  const fetchStocks = async () => {
    setStocksLoading(true);
    setStocksError(null);
    
    try {
      const symbols = ['^GSPC', '^DJI', '^IXIC', '^FTSE', '^N225'];
      const data = await fetchStockQuotes(symbols);
      setStocks(data);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setStocksError('Failed to load stock data.');
    } finally {
      setStocksLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchNews(),
        fetchWeather(),
        fetchStocks()
      ]);
    };
    
    fetchData();
    
    // Set up refresh interval (every 5 minutes)
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [category]);
  
  // Refresh all data
  const refreshData = async () => {
    await Promise.all([
      fetchNews(),
      fetchWeather(),
      fetchStocks()
    ]);
  };
  
  return (
    <AppContext.Provider
      value={{
        // News
        articles,
        loading,
        error,
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
        
        // Weather
        weather,
        weatherLoading,
        weatherError,
        
        // Stocks
        stocks,
        stocksLoading,
        stocksError,
        
        // Favorites
        savedArticles,
        toggleSaveArticle,
        isArticleSaved,
        
        // Refresh
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
