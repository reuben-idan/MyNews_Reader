'use client';

import Image from 'next/image';
import { FiTrendingUp, FiBookmark, FiSearch, FiBell } from 'react-icons/fi';

const AboutHero = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revolutionizing How You Consume News
          </h2>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            NewsFlow is more than just a news reader—it's your intelligent companion in the world of information.
            We curate, personalize, and deliver news content that matters to you, when it matters most.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <FiTrendingUp className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-medium">Trending Now</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <FiBookmark className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-medium">Smart Bookmarks</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <FiSearch className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-medium">Advanced Search</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <FiBell className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
          </div>
        </div>

        {/* Visual Element */}
        <div className="relative">
          <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-full p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold mb-2">NewsFlow</h3>
              <p className="text-blue-100 text-sm">Your News, Perfected</p>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-2xl">⚡</span>
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xl">🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
