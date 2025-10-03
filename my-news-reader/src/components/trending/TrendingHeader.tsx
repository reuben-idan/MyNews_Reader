'use client';

import { FiTrendingUp, FiClock, FiEye } from 'react-icons/fi';

const TrendingHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FiTrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Trending Now</h1>
            <p className="text-blue-100 text-lg">The most popular stories right now</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiTrendingUp className="w-6 h-6 text-blue-200" />
            <div>
              <p className="text-2xl font-bold">2.4M</p>
              <p className="text-blue-200 text-sm">Trending Articles</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiClock className="w-6 h-6 text-blue-200" />
            <div>
              <p className="text-2xl font-bold">Live</p>
              <p className="text-blue-200 text-sm">Updated Every 5 Min</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiEye className="w-6 h-6 text-blue-200" />
            <div>
              <p className="text-2xl font-bold">156K</p>
              <p className="text-blue-200 text-sm">Active Readers</p>
            </div>
          </div>
        </div>

        {/* Trending Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendingHeader;
