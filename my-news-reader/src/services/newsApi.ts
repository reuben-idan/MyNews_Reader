import type { NewsApiResponse } from '../types';

// Mock data for development
const mockNewsResponse: NewsApiResponse = {
  status: 'ok',
  totalResults: 3,
  articles: [
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'John Doe',
      title: 'The Future of AI in Modern Applications',
      description: 'Exploring how AI is transforming modern applications and what the future holds.',
      url: 'https://example.com/ai-future',
      urlToImage: 'https://source.unsplash.com/random/800x400/?ai,technology',
      publishedAt: '2025-10-02T12:00:00Z',
      content: 'Artificial Intelligence is rapidly changing the way we interact with technology.'
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'Jane Smith',
      title: 'Climate Change: New Study Shows Alarming Trends',
      description: 'Recent research highlights the accelerating impacts of climate change across the globe.',
      url: 'https://example.com/climate-change-study',
      urlToImage: 'https://source.unsplash.com/random/800x400/?climate,earth',
      publishedAt: '2025-10-01T15:30:00Z',
      content: 'A comprehensive new study reveals that climate change is progressing faster than previously estimated.'
    },
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'Alex Johnson',
      title: 'Tech Giants Announce Major Breakthrough in Quantum Computing',
      description: 'Leading technology companies have achieved a significant milestone in quantum computing capabilities.',
      url: 'https://example.com/quantum-computing-breakthrough',
      urlToImage: 'https://source.unsplash.com/random/800x400/?quantum,computer',
      publishedAt: '2025-09-30T09:15:00Z',
      content: 'In a joint announcement, major tech companies revealed a breakthrough in quantum computing.'
    }
  ]
};

export const fetchTopHeadlines = async (): Promise<NewsApiResponse> => {
  try {
    // In a real app, you would use the actual NewsAPI
    // For now, we'll return mock data
    return mockNewsResponse;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const searchNews = async (query: string): Promise<NewsApiResponse> => {
  try {
    // In a real app, you would make an actual API call here
    // For now, we'll return filtered mock data
    return {
      ...mockNewsResponse,
      articles: mockNewsResponse.articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        (article.description?.toLowerCase().includes(query.toLowerCase()) ?? false)
      )
    };
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};
