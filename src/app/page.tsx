import HeroSection from '@/components/HeroSection';
import TrendingCarousel from '@/components/TrendingCarousel';
import CategoryFilter from '@/components/CategoryFilter';
import ArticleList from '@/components/ArticleList';
import WeatherWidget from '@/components/WeatherWidget';
import StockTicker from '@/components/StockTicker';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      
      <div className="mt-12">
        <TrendingCarousel />
      </div>
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <CategoryFilter />
          </div>
          <ArticleList />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <WeatherWidget />
          <StockTicker />
        </div>
      </div>
    </div>
  );
}
