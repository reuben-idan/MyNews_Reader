import { useState, useEffect } from 'react';
import {
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiBookmark,
  FiLock
} from 'react-icons/fi';
import { useNews } from '@/context/NewsContext';
import { useAuth } from '@/context/AuthContext';
import { generateArticleUrl } from '@/services/newsApi';
import type { Article } from '@/types';

interface ArticleActionsProps {
  articleTitle: string;
  articleUrl: string;
  articleId: string;
  article?: Article; // Add full article object for NewsContext
}

export default function ArticleActions({ articleTitle, articleUrl, articleId, article }: ArticleActionsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { bookmarks, toggleBookmark, isBookmarked } = useNews();
  const { isAuthenticated } = useAuth();

  // Check if article is bookmarked using NewsContext
  const isArticleBookmarked = article ? isBookmarked(article.url) : false;

  // Share functions
  const shareToTwitter = () => {
    const encodedUrl = generateArticleUrl({ url: articleUrl, title: articleTitle, source: { name: '' }, author: '', description: '', publishedAt: '', content: '' } as any);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(`${window.location.origin}/article/${encodedUrl}`)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const encodedUrl = generateArticleUrl({ url: articleUrl, title: articleTitle, source: { name: '' }, author: '', description: '', publishedAt: '', content: '' } as any);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/article/${encodedUrl}`)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const encodedUrl = generateArticleUrl({ url: articleUrl, title: articleTitle, source: { name: '' }, author: '', description: '', publishedAt: '', content: '' } as any);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/article/${encodedUrl}`)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    const encodedUrl = generateArticleUrl({ url: articleUrl, title: articleTitle, source: { name: '' }, author: '', description: '', publishedAt: '', content: '' } as any);
    const fullUrl = `${window.location.origin}/article/${encodedUrl}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleBookmark = () => {
    if (!isAuthenticated) {
      // Show login prompt for non-authenticated users
      const loginModal = document.createElement('div');
      loginModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      loginModal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md mx-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Sign in to save articles</h3>
            <p class="text-gray-600 mb-6">Create an account to save articles for later and personalize your news experience.</p>
            <div class="flex space-x-3 justify-center">
              <a href="/login" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign In</a>
              <a href="/register" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Sign Up</a>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(loginModal);

      // Close modal when clicking outside
      loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
          document.body.removeChild(loginModal);
        }
      });

      // Close modal with escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          document.body.removeChild(loginModal);
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);

      return;
    }

    if (article) {
      toggleBookmark(article);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Bookmark Button */}
      <button
        onClick={handleToggleBookmark}
        className={`p-2 rounded-full transition-colors ${
          isAuthenticated
            ? isArticleBookmarked
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
        }`}
        title={
          isAuthenticated
            ? (isArticleBookmarked ? 'Remove bookmark' : 'Bookmark article')
            : 'Sign in to save articles'
        }
      >
        {isAuthenticated ? (
          isArticleBookmarked ? (
            <FiBookmark className="w-5 h-5 fill-current" />
          ) : (
            <FiBookmark className="w-5 h-5" />
          )
        ) : (
          <FiLock className="w-5 h-5" />
        )}
      </button>

      {/* Share Button */}
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className={`p-2 rounded-full transition-colors ${
            showShareMenu
              ? 'bg-blue-100 text-blue-600'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
          title="Share article"
        >
          <FiShare2 className="w-5 h-5" />
        </button>

        {/* Share Menu */}
        {showShareMenu && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowShareMenu(false)}
            />

            {/* Share Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-20 py-2">
              <button
                onClick={shareToTwitter}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <FiTwitter className="w-4 h-4 text-blue-400" />
                <span>Share on Twitter</span>
              </button>

              <button
                onClick={shareToFacebook}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <FiFacebook className="w-4 h-4 text-blue-600" />
                <span>Share on Facebook</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <FiLinkedin className="w-4 h-4 text-blue-700" />
                <span>Share on LinkedIn</span>
              </button>

              <hr className="my-2" />

              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                {copied ? (
                  <FiCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <FiCopy className="w-4 h-4 text-gray-600" />
                )}
                <span>{copied ? 'Copied!' : 'Copy link'}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Original Article Link */}
      <a
        href={articleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
        title="View original article"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
