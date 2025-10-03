'use client';

import { FiBookmark, FiHeart, FiStar } from 'react-icons/fi';

const SavedHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FiBookmark className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Saved Articles</h1>
            <p className="text-purple-100 text-lg">Your personal collection of favorite stories</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiBookmark className="w-6 h-6 text-purple-200" />
            <div>
              <p className="text-2xl font-bold">Saved</p>
              <p className="text-purple-200 text-sm">Personal Collection</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiHeart className="w-6 h-6 text-purple-200" />
            <div>
              <p className="text-2xl font-bold">Favorites</p>
              <p className="text-purple-200 text-sm">Curated Content</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <FiStar className="w-6 h-6 text-purple-200" />
            <div>
              <p className="text-2xl font-bold">Premium</p>
              <p className="text-purple-200 text-sm">Quality Reads</p>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
            <FiStar className="w-3 h-3 mr-1" />
            PERSONAL
          </span>
        </div>
      </div>
    </div>
  );
};

export default SavedHeader;
