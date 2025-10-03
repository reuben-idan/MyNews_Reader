'use client';

import { useState, useEffect } from 'react';
import {
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiBookmark
} from 'react-icons/fi';

interface ArticleActionsProps {
  articleTitle: string;
  articleUrl: string;
  articleId: string;
}

export default function ArticleActions({ articleTitle, articleUrl, articleId }: ArticleActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if article is bookmarked on component mount
  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    setIsBookmarked(savedArticles.includes(articleId));
  }, [articleId]);

  // Share functions
  const shareToTwitter = () => {
    const text = encodeURIComponent(`${articleTitle} - via NewsFlow`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(articleTitle);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleBookmark = () => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');

    if (isBookmarked) {
      // Remove from bookmarks
      const updated = savedArticles.filter((id: string) => id !== articleId);
      localStorage.setItem('savedArticles', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      // Add to bookmarks
      const updated = [...savedArticles, articleId];
      localStorage.setItem('savedArticles', JSON.stringify(updated));
      setIsBookmarked(true);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Bookmark Button */}
      <button
        onClick={toggleBookmark}
        className={`p-2 rounded-full transition-colors ${
          isBookmarked
            ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        }`}
        title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
      >
        {isBookmarked ? (
          <FiBookmark className="w-5 h-5 fill-current" />
        ) : (
          <FiBookmark className="w-5 h-5" />
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
