import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBookmark, FiSearch, FiSun, FiMoon } from 'react-icons/fi';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const isDark = false; // You can implement dark mode toggle later
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NewsFlow
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => {}}
              >
                {isDark ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for news..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 md:hidden">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className="flex flex-col items-center justify-center text-blue-600 dark:text-blue-400"
          >
            <FiHome className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/bookmarks"
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FiBookmark className="w-6 h-6" />
            <span className="text-xs mt-1">Saved</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
