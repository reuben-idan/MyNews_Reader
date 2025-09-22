/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'via.placeholder.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/news/:path*',
        destination: `${process.env.NEWS_API_URL || 'https://newsapi.org/v2'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
