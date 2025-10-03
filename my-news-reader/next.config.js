/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  
  // Image optimization
  images: {
    domains: [
      'images.unsplash.com', 
      'source.unsplash.com', 
      'via.placeholder.com',
      'cdn.pixabay.com',
      'res.cloudinary.com'
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
  },

  // API routes
  async rewrites() {
    return [
      {
        source: '/api/news/:path*',
        destination: `${process.env.NEWS_API_URL || 'https://newsapi.org/v2'}/:path*`,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Webpack optimizations
  webpack(config, { isServer, dev }) {
    // Only run these optimizations in production
    if (!dev) {
      // Enable tree shaking and module concatenation
      config.optimization.concatenateModules = true;
      config.optimization.minimize = true;
      
      // Enable module IDs optimization
      config.optimization.moduleIds = 'deterministic';
      config.optimization.runtimeChunk = 'single';
      
      // Split chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )?.[1];
              return `npm.${packageName?.replace('@', '')}`;
            },
          },
        },
      };
    }

    // Custom webpack configurations
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Enable static exports for static site generation
  output: 'standalone',
  
  // Only enable experimental features that are stable in the current Next.js version
  experimental: {
    // Enable server actions (stable in recent Next.js versions)
    serverActions: true,
    // Enable scroll restoration (stable in recent Next.js versions)
    scrollRestoration: true,
  },
};

// Only enable the profiler in development
if (process.env.NODE_ENV === 'development') {
  nextConfig.experimental = {
    ...nextConfig.experimental,
  };
}

module.exports = nextConfig;
