import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const STOCK_API_KEY = process.env.NEXT_PUBLIC_STOCK_API_KEY;

// News API client
const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': NEWS_API_KEY,
  },
});

// Weather API client
const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: WEATHER_API_KEY,
    units: 'metric',
  },
});

// Stock API client
const stockApi = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: STOCK_API_KEY,
  },
});

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface StockQuote {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high price of the day
  l: number; // low price of the day
  o: number; // open price of the day
  pc: number; // previous close price
  t: number; // timestamp
}

export const fetchTopHeadlines = async (category?: string): Promise<Article[]> => {
  try {
    // Check if API key is available
    if (!NEWS_API_KEY || NEWS_API_KEY === 'demo_key') {
      // Return mock data for development
      return getMockArticles(category);
    }

    const response = await newsApi.get<NewsApiResponse>('/top-headlines', {
      params: {
        country: 'us',
        category,
        pageSize: 20,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news, using mock data:', error);
    return getMockArticles(category);
  }
};

export const fetchWeatherByLocation = async (city: string): Promise<WeatherData> => {
  try {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'demo_key') {
      return getMockWeatherData(city);
    }

    const response = await weatherApi.get<WeatherData>('/weather', {
      params: {
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather, using mock data:', error);
    return getMockWeatherData(city);
  }
};

export const fetchStockQuotes = async (symbols: string[]): Promise<Record<string, StockQuote>> => {
  try {
    if (!STOCK_API_KEY || STOCK_API_KEY === 'demo_key') {
      return getMockStockData(symbols);
    }

    const quotePromises = symbols.map(symbol =>
      stockApi.get<StockQuote>(`/quote?symbol=${symbol}`)
    );

    const responses = await Promise.all(quotePromises);

    return symbols.reduce((acc, symbol, index) => {
      if (responses[index].data) {
        acc[symbol] = responses[index].data;
      }
      return acc;
    }, {} as Record<string, StockQuote>);
  } catch (error) {
    console.error('Error fetching stock data, using mock data:', error);
    return getMockStockData(symbols);
  }
};

export const searchNews = async (query: string): Promise<Article[]> => {
  try {
    if (!NEWS_API_KEY || NEWS_API_KEY === 'demo_key') {
      return getMockSearchResults(query);
    }

    const response = await newsApi.get<NewsApiResponse>('/everything', {
      params: {
        q: query,
        sortBy: 'publishedAt',
        pageSize: 20,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news, using mock data:', error);
    return getMockSearchResults(query);
  }
};

// Mock data functions for development
const getMockArticles = (category?: string): Article[] => {
  const mockArticles: Article[] = [
    {
      source: { id: '1', name: 'NewsFlow' },
      author: 'NewsFlow Team',
      title: `Latest ${category || 'General'} News Update`,
      description: `Stay informed with the latest ${category || 'general'} news and updates from around the world.`,
      url: '#',
      urlToImage: 'https://via.placeholder.com/400x250',
      publishedAt: new Date().toISOString(),
      content: 'This is mock content for development purposes.',
    },
    {
      source: { id: '2', name: 'NewsFlow' },
      author: 'NewsFlow Team',
      title: 'Breaking: Technology Trends in 2024',
      description: 'Discover the emerging technology trends that will shape the future.',
      url: '#',
      urlToImage: 'https://via.placeholder.com/400x250',
      publishedAt: new Date().toISOString(),
      content: 'This is mock content for development purposes.',
    },
    {
      source: { id: '3', name: 'NewsFlow' },
      author: 'NewsFlow Team',
      title: 'Sports Highlights of the Week',
      description: 'Catch up on the most exciting sports moments from this week.',
      url: '#',
      urlToImage: 'https://via.placeholder.com/400x250',
      publishedAt: new Date().toISOString(),
      content: 'This is mock content for development purposes.',
    },
  ];

  if (category && category !== 'general') {
    return mockArticles.map(article => ({
      ...article,
      title: article.title.replace('General', category.charAt(0).toUpperCase() + category.slice(1)),
    }));
  }

  return mockArticles;
};

const getMockWeatherData = (city: string): WeatherData => ({
  name: city,
  main: {
    temp: 22,
    humidity: 65,
  },
  weather: [{
    main: 'Clear',
    description: 'clear sky',
    icon: '01d',
  }],
  wind: {
    speed: 5,
  },
});

const getMockStockData = (symbols: string[]): Record<string, StockQuote> => {
  const mockData: Record<string, StockQuote> = {};
  symbols.forEach(symbol => {
    mockData[symbol] = {
      c: Math.random() * 100 + 50, // Random current price
      d: (Math.random() - 0.5) * 10, // Random change
      dp: (Math.random() - 0.5) * 20, // Random percent change
      h: Math.random() * 100 + 50,
      l: Math.random() * 50 + 25,
      o: Math.random() * 100 + 50,
      pc: Math.random() * 100 + 50,
      t: Date.now(),
    };
  });
  return mockData;
};

const getMockSearchResults = (query: string): Article[] => {
  return [
    {
      source: { id: 'search-1', name: 'NewsFlow' },
      author: 'NewsFlow Team',
      title: `Search Results for "${query}"`,
      description: `Articles matching your search query: ${query}`,
      url: '#',
      urlToImage: 'https://via.placeholder.com/400x250',
      publishedAt: new Date().toISOString(),
      content: 'This is mock content for development purposes.',
    },
  ];
};
