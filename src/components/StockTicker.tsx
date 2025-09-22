'use client';

import { useState, useEffect, useRef } from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

// Mock data - replace with actual API call
const mockStocks: Stock[] = [
  { symbol: '^GSPC', name: 'S&P 500', price: 4532.25, change: 24.18, changePercent: 0.54 },
  { symbol: '^DJI', name: 'Dow Jones', price: 35490.75, change: -45.21, changePercent: -0.13 },
  { symbol: '^IXIC', name: 'NASDAQ', price: 14197.85, change: 78.32, changePercent: 0.86 },
  { symbol: '^FTSE', name: 'FTSE 100', price: 7689.50, change: 12.75, changePercent: 0.17 },
  { symbol: '^N225', name: 'Nikkei 225', price: 32568.30, change: 145.80, changePercent: 0.45 },
];

const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // In a real app, fetch stock data from an API like Finnhub or Yahoo Finance
    const fetchStockData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStocks(mockStocks);
        setError(null);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to load market data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    
    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(fetchStockData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Auto-scrolling ticker animation
  useEffect(() => {
    if (!tickerRef.current) return;
    
    const ticker = tickerRef.current;
    const tickerWidth = ticker.scrollWidth / 2; // Since we duplicate the content
    
    const animate = () => {
      setPosition(prev => {
        const newPosition = (prev + 0.5) % tickerWidth;
        return newPosition;
      });
      
      if (ticker) {
        ticker.style.transform = `translateX(-${position}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Market Overview</h3>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // Duplicate stocks for seamless looping
  const duplicatedStocks = [...stocks, ...stocks];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Market Overview</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FiDollarSign className="w-4 h-4 mr-1" />
          <span>Live</span>
        </div>
      </div>
      
      <div className="relative h-10 overflow-hidden">
        <div 
          ref={tickerRef}
          className="absolute whitespace-nowrap flex items-center"
          style={{ transform: `translateX(-${position}px)` }}
        >
          {duplicatedStocks.map((stock, index) => (
            <div 
              key={`${stock.symbol}-${index}`} 
              className="inline-flex items-center mr-8 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <span className="font-medium text-gray-900 dark:text-white mr-2">{stock.symbol}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">{stock.price.toFixed(2)}</span>
              <div className={`flex items-center text-sm font-medium ${
                stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stock.change >= 0 ? (
                  <FiTrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <FiTrendingDown className="w-4 h-4 mr-1" />
                )}
                <span>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          {stocks.slice(0, 4).map((stock) => (
            <div key={stock.symbol} className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stock.symbol}</span>
                <span className={`text-sm font-medium ${
                  stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {stock.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
