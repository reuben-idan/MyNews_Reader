import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { getArticleById, fetchTopHeadlines } from '@/services/newsApi';
import { Article } from '@/types';
import { FiClock, FiUser, FiArrowLeft, FiHeart, FiMessageCircle, FiEye } from 'react-icons/fi';
import ArticleActions from '@/components/ArticleActions';
import ReadingProgress from '@/components/ReadingProgress';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to NewsFlow
          </Link>
        </div>
      </nav>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{article.source.name}</span>
          </div>

          {/* Source Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {article.source.name}
            </span>
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center">
                <FiEye className="w-4 h-4 mr-1" />
                <span>{Math.floor(Math.random() * 1000) + 100} views</span>
              </div>
              <div className="flex items-center">
                <FiClock className="w-4 h-4 mr-1" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              {article.author && (
                <div className="flex items-center">
                  <FiUser className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{article.author}</span>
                </div>
              )}
              <time className="text-sm">
                {format(new Date(article.publishedAt), 'MMMM dd, yyyy • h:mm a')}
              </time>
            </div>

            {/* Social Engagement Indicators */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                <FiHeart className="w-4 h-4 mr-1" />
                <span className="text-sm">{Math.floor(Math.random() * 50) + 10}</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                <FiMessageCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">{Math.floor(Math.random() * 20) + 5}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <ArticleActions
              articleTitle={article.title}
              articleUrl={article.url}
              articleId={params.id}
            />
          </div>
        </header>

        {/* Featured Image */}
        {article.urlToImage && (
          <div className="mb-8">
            <div className="relative h-96 md:h-[500px] w-full rounded-lg overflow-hidden">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <p className="text-sm text-gray-600 mt-2 italic">
              High-resolution image showcasing the breakthrough in {article.source.name.toLowerCase()} technology
            </p>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {article.description && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-xl text-gray-800 leading-relaxed font-medium italic">
                "{article.description}"
              </p>
            </div>
          )}

          {contentParagraphs.length > 0 && (
            <div className="text-gray-800 leading-relaxed space-y-6">
              {contentParagraphs.map((paragraph, index) => (
                <p key={index} className={`mb-6 ${index === 0 ? 'text-lg font-medium leading-relaxed' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Article Stats */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <FiClock className="w-4 h-4 mr-2 text-blue-600" />
                <span><strong>Reading Time:</strong> {readingTime} minutes</span>
              </div>
              <div className="flex items-center">
                <FiMessageCircle className="w-4 h-4 mr-2 text-green-600" />
                <span><strong>Word Count:</strong> {wordCount.toLocaleString()} words</span>
              </div>
              <div className="flex items-center">
                <FiEye className="w-4 h-4 mr-2 text-purple-600" />
                <span><strong>Published:</strong> {format(new Date(article.publishedAt), 'PPP')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Published by {article.source.name}</p>
              <p>Article ID: {params.id} • Published on {format(new Date(article.publishedAt), 'PPP')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Share Article
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Save for Later
              </button>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                View Original Source
              </a>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-white mt-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">More Stories</h2>
            <p className="text-gray-600 mb-8">Continue reading with these related articles</p>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle, index) => (
                <Link
                  key={index}
                  href={`/article/${index + 1}`}
                  className="group block"
                >
                  <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {relatedArticle.urlToImage && (
                      <div className="relative h-48">
                        <Image
                          src={relatedArticle.urlToImage}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {relatedArticle.source.name}
                        </span>
                        <time className="text-xs text-gray-500">
                          {format(new Date(relatedArticle.publishedAt), 'MMM dd')}
                        </time>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedArticle.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="bg-blue-600 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8">Get the latest news and insights delivered to your inbox</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
