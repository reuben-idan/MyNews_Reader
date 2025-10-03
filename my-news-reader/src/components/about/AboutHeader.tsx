'use client';

import { FiInfo, FiHeart, FiStar } from 'react-icons/fi';

const AboutHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FiInfo className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          About NewsFlow
        </h1>
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Your intelligent news companion, delivering curated content with precision and care
      </p>
    </div>
  );
};

export default AboutHeader;
