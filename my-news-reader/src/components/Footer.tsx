import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiRss } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Categories', href: '/categories' },
      { name: 'Saved', href: '/saved' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com/reuben-idan',
        icon: FiGithub,
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com',
        icon: FiTwitter,
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: FiLinkedin,
      },
      {
        name: 'RSS',
        href: '/rss.xml',
        icon: FiRss,
      },
    ],
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link 
                href={item.href}
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label={item.name}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {currentYear} NewsFlow. All rights reserved.
        </p>
        
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Data provided by various news APIs. NewsFlow is not responsible for the content of external sites.</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
