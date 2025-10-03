'use client';

import { FiTrendingUp, FiBookmark, FiSearch, FiBell, FiFilter, FiMoon, FiGlobe, FiZap } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: FiTrendingUp,
      title: 'Trending Now',
      description: 'Stay ahead with real-time trending topics and viral stories from around the world.',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      icon: FiBookmark,
      title: 'Smart Bookmarks',
      description: 'Save articles for later reading with intelligent organization and sync across devices.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      icon: FiSearch,
      title: 'Advanced Search',
      description: 'Find exactly what you\'re looking for with powerful search and filtering capabilities.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: FiBell,
      title: 'Real-time Updates',
      description: 'Get instant notifications about breaking news and updates on topics you care about.',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      icon: FiFilter,
      title: 'Category Curation',
      description: 'Browse news by categories like Technology, Business, Sports, Health, and more.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
    {
      icon: FiMoon,
      title: 'Dark Mode',
      description: 'Comfortable reading experience with automatic dark mode and theme customization.',
      color: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
    {
      icon: FiGlobe,
      title: 'Global Coverage',
      description: 'Access news from trusted sources worldwide with multi-language support.',
      color: 'text-teal-500',
      bgColor: 'bg-teal-100 dark:bg-teal-900/20',
    },
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant loading and smooth interactions.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Why Choose NewsFlow?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the features that make NewsFlow the preferred choice for discerning news readers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Built for the Modern Reader
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            NewsFlow combines cutting-edge technology with timeless journalistic principles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Articles Curated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">25K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Readers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
