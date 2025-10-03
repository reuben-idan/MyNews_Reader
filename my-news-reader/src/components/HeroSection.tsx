import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Stay Informed with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Personalized News
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Get the latest news tailored to your interests. Stay updated with real-time updates, save your favorite articles, and explore diverse perspectives.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/categories" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Explore Categories
              <FiArrowRight className="ml-2" />
            </Link>
            
            <Link 
              href="/trending" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium rounded-lg transition-colors"
            >
              Trending Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
