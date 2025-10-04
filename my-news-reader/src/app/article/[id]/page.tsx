import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleById, fetchTopHeadlines } from '@/services/newsApi';
import { Article } from '@/types';
import { FiClock, FiUser, FiArrowLeft, FiHeart, FiMessageCircle, FiEye } from 'react-icons/fi';
import ArticleActions from '@/components/ArticleActions';
import ReadingProgress from '@/components/ReadingProgress';
import ArticlePageClient from './ArticlePageClient';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the article
export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | NewsFlow`,
    description: article.description || 'Read the latest news article',
    openGraph: {
      title: article.title,
      description: article.description || '',
      images: article.urlToImage ? [{ url: article.urlToImage }] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : [],
      section: 'Technology',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || '',
      images: article.urlToImage ? [article.urlToImage] : [],
    },
  };
}

// Get related articles (excluding current article)
async function getRelatedArticles(currentArticle: Article): Promise<Article[]> {
  const allArticles = await fetchTopHeadlines();
  return allArticles.articles
    .filter(article =>
      article.title !== currentArticle.title &&
      article.url !== currentArticle.url &&
      article.source.name !== currentArticle.source.name
    )
    .slice(0, 3);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article);

  // Estimate reading time (assuming 200 words per minute)
  const wordCount = article.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Format content into paragraphs
  const contentParagraphs = article.content?.split('\n').filter(p => p.trim().length > 0) || [];

  // Pass data to client component
  return (
    <ArticlePageClient
      article={article}
      relatedArticles={relatedArticles}
      readingTime={readingTime}
      wordCount={wordCount}
      contentParagraphs={contentParagraphs}
      params={params}
    />
  );
}
