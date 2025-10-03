export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
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

export interface Category {
  id: string;
  name: string;
  query: string;
}

export const categories: Category[] = [
  { id: 'general', name: 'General', query: 'general' },
  { id: 'business', name: 'Business', query: 'business' },
  { id: 'entertainment', name: 'Entertainment', query: 'entertainment' },
  { id: 'health', name: 'Health', query: 'health' },
  { id: 'science', name: 'Science', query: 'science' },
  { id: 'sports', name: 'Sports', query: 'sports' },
  { id: 'technology', name: 'Technology', query: 'technology' },
];
