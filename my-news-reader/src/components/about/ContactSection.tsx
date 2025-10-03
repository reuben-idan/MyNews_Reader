'use client';

import { FiMail, FiMessageCircle, FiHelpCircle, FiExternalLink } from 'react-icons/fi';

const ContactSection = () => {
  const contactOptions = [
    {
      icon: FiMail,
      title: 'Email Support',
      description: 'Get help with your account, report issues, or send feedback',
      contact: 'support@newsflow.app',
      action: 'Send Email',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: FiMessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time during business hours',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      icon: FiHelpCircle,
      title: 'Help Center',
      description: 'Browse our comprehensive FAQ and documentation',
      contact: 'help.newsflow.app',
      action: 'Visit Help Center',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're here to help! Choose the best way to reach us based on your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 ${option.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${option.color}`} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {option.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                {option.description}
              </p>

              <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                {option.contact}
              </div>

              <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                index === 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : index === 1
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}>
                {option.action}
              </button>
            </div>
          );
        })}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
        <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest NewsFlow updates, feature announcements, and industry insights.
        </p>

        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Subscribe
          </button>
        </div>

        <p className="text-xs text-indigo-200 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>

      {/* Company Info */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">NewsFlow</h4>
          <p className="text-gray-600 dark:text-gray-400">
            Your intelligent news companion, delivering curated content with precision and care.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Product</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><a href="/trending" className="hover:text-gray-900 dark:hover:text-gray-100">Trending</a></li>
            <li><a href="/categories" className="hover:text-gray-900 dark:hover:text-gray-100">Categories</a></li>
            <li><a href="/saved" className="hover:text-gray-900 dark:hover:text-gray-100">Bookmarks</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Mobile App</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Support</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Status Page</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Bug Reports</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Company</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><a href="/about" className="hover:text-gray-900 dark:hover:text-gray-100">About Us</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Press Kit</a></li>
            <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 NewsFlow. All rights reserved. Made with ❤️ for news enthusiasts everywhere.</p>
      </div>
    </div>
  );
};

export default ContactSection;
