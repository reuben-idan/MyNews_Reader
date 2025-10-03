'use client';

import { FiTrendingUp, FiActivity, FiUsers, FiClock } from 'react-icons/fi';

const CategoryStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">8</p>
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            <FiTrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium">+2</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">new this month</span>
          </div>
        </div>
      </div>

      {/* Active Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Articles</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">50K+</p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <FiActivity className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-green-600 dark:text-green-400 font-medium">+12%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">from last week</span>
          </div>
        </div>
      </div>

      {/* Active Readers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Readers</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">25.4K</p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-medium">+8%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">engagement rate</span>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">2 min ago</p>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="text-purple-600 dark:text-purple-400 font-medium">Real-time</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;
