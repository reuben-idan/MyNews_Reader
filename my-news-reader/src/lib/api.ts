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
    const response = await newsApi.get<NewsApiResponse>('/top-headlines', {
      params: {
        country: 'us',
        category,
        pageSize: 20,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news articles');
  }
};

export const fetchWeatherByLocation = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get<WeatherData>('/weather', {
      params: {
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchStockQuotes = async (symbols: string[]): Promise<Record<string, StockQuote>> => {
  try {
    // Fetch quotes in parallel
    const quotePromises = symbols.map(symbol =>
      stockApi.get<StockQuote>(`/quote?symbol=${symbol}`)
    );
    
    const responses = await Promise.all(quotePromises);
    
    // Map symbols to their quotes
    return symbols.reduce((acc, symbol, index) => {
      if (responses[index].data) {
        acc[symbol] = responses[index].data;
      }
      return acc;
    }, {} as Record<string, StockQuote>);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error('Failed to fetch stock data');
  }
};

export const searchNews = async (query: string): Promise<Article[]> => {
  try {
    const response = await newsApi.get<NewsApiResponse>('/everything', {
      params: {
        q: query,
        sortBy: 'publishedAt',
        pageSize: 20,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error);
    throw new Error('Failed to search news articles');
  }
};
