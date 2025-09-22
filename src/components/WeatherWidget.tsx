'use client';

import { useState, useEffect } from 'react';
import { FiMapPin, FiDroplet, FiWind, FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiCloudLightning } from 'react-icons/fi';

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
};

// Mock data - replace with actual API call
const mockWeatherData: WeatherData = {
  location: 'New York',
  temperature: 22,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  icon: 'cloudy',
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <FiSun className="w-6 h-6 text-yellow-400" />;
    case 'clouds':
    case 'partly-cloudy':
      return <FiCloud className="w-6 h-6 text-gray-400" />;
    case 'rain':
    case 'drizzle':
      return <FiCloudRain className="w-6 h-6 text-blue-400" />;
    case 'thunderstorm':
      return <FiCloudLightning className="w-6 h-6 text-purple-500" />;
    case 'snow':
      return <FiCloudSnow className="w-6 h-6 text-blue-100" />;
    default:
      return <FiSun className="w-6 h-6 text-yellow-400" />;
  }
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch weather data from an API like OpenWeatherMap
    const fetchWeather = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeather(mockWeatherData);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 text-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold">{weather.temperature}°C</h3>
            <p className="text-blue-100">{weather.condition}</p>
          </div>
          <div className="text-4xl">
            {getWeatherIcon(weather.icon)}
          </div>
        </div>
        
        <div className="flex items-center text-blue-100 mb-1">
          <FiMapPin className="w-4 h-4 mr-2" />
          <span>{weather.location}</span>
        </div>
        
        <div className="flex justify-between mt-6 pt-4 border-t border-blue-400/30">
          <div className="flex items-center text-sm">
            <FiDroplet className="w-4 h-4 mr-1 text-blue-200" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center text-sm">
            <FiWind className="w-4 h-4 mr-1 text-blue-200" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-600/30 dark:bg-blue-900/30 px-6 py-3 text-sm text-center">
        <p>Updated just now</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
