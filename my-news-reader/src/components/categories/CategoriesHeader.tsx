'use client';

import { FiGrid, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

const CategoriesHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FiGrid className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">News Categories</h1>
            <p className="text-indigo-100 text-lg">Explore news by topic and stay informed</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiGrid className="w-6 h-6 text-indigo-200" />
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-indigo-200 text-sm">Categories</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiBookOpen className="w-6 h-6 text-indigo-200" />
            <div>
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-indigo-200 text-sm">Articles</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiTrendingUp className="w-6 h-6 text-indigo-200" />
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-indigo-200 text-sm">Updates</p>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
            <FiBookOpen className="w-3 h-3 mr-1" />
            CURATED
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoriesHeader;
