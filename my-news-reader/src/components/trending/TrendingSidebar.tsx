'use client';

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiUsers, FiGlobe, FiZap, FiArrowUp } from 'react-icons/fi';

// Mock trending topics data
const trendingTopics = [
  { id: 1, topic: '#ArtificialIntelligence', count: '2.1M posts', trend: '+234%' },
  { id: 2, topic: '#ClimateAction', count: '1.8M posts', trend: '+189%' },
  { id: 3, topic: '#TeslaBot', count: '987K posts', trend: '+156%' },
  { id: 4, topic: '#QuantumComputing', count: '756K posts', trend: '+145%' },
  { id: 5, topic: '#MarsDiscovery', count: '623K posts', trend: '+123%' },
  { id: 6, topic: '#ChampionshipUpset', count: '445K posts', trend: '+98%' },
  { id: 7, topic: '#StockMarket', count: '389K posts', trend: '+87%' },
  { id: 8, topic: '#RenewableEnergy', count: '334K posts', trend: '+76%' },
];

const trendingRegions = [
  { region: 'United States', flag: '🇺🇸', articles: '12.4K' },
  { region: 'United Kingdom', flag: '🇬🇧', articles: '8.7K' },
  { region: 'Germany', flag: '🇩🇪', articles: '6.2K' },
  { region: 'France', flag: '🇫🇷', articles: '5.1K' },
  { region: 'Japan', flag: '🇯🇵', articles: '4.8K' },
  { region: 'Canada', flag: '🇨🇦', articles: '3.9K' },
  { region: 'Australia', flag: '🇦🇺', articles: '3.2K' },
  { region: 'India', flag: '🇮🇳', articles: '2.8K' },
];

const TrendingSidebar = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'regions'>('topics');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <FiTrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Trending Now
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('topics')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'topics'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Hot Topics
        </button>
        <button
          onClick={() => setActiveTab('regions')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'regions'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          By Region
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'topics' ? (
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={topic.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {topic.topic}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{topic.count}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <FiArrowUp className="w-3 h-3 mr-1" />
                  <span className="text-sm font-medium">{topic.trend}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {trendingRegions.map((region, index) => (
              <div key={region.region} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-3 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{region.flag}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {region.region}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{region.articles} articles</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiUsers className="w-4 h-4" />
            <span>156K readers</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiGlobe className="w-4 h-4" />
            <span>89 countries</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
            <FiZap className="w-4 h-4" />
            <span>Live updates every 5 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;
