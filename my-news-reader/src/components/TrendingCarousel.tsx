'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

// Mock data - replace with actual API call
const trendingArticles = [
  {
    id: 1,
    title: 'Global Tech Summit 2025: Key Announcements',
    excerpt: 'Major tech companies unveil groundbreaking innovations at the annual summit.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    url: '/article/1'
  },
  {
    id: 2,
    title: 'Stock Markets Reach Record High',
    excerpt: 'Global markets surge as economic recovery exceeds expectations.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    url: '/article/2'
  },
  {
    id: 3,
    title: 'New Breakthrough in Renewable Energy',
    excerpt: 'Scientists achieve record efficiency in solar cell technology.',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    url: '/article/3'
  },
  {
    id: 4,
    title: 'Major Sports League Announces Expansion Teams',
    excerpt: 'Three new cities to join the league in the 2026 season.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    url: '/article/4'
  },
];

const TrendingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === trendingArticles.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? trendingArticles.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  return (
    <div 
      className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {trendingArticles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${article.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            
            <div className="relative h-full flex flex-col justify-end p-6 md:p-10 text-white">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-100 bg-blue-600 rounded-full w-fit">
                {article.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                <Link href={article.url} className="hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-200 max-w-2xl">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {trendingArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
