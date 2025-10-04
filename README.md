# NewsFlow

<div align="center">
  <p><strong>Intelligent News Aggregation Platform</strong></p>
  <p>Next.js 14 • React 18 • TypeScript • Tailwind CSS</p>

  <img src="https://img.shields.io/badge/status-production_ready-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/badge/build-passing-success" alt="Build">
</div>

---

## Overview

NewsFlow is a modern news aggregation platform delivering curated content through intelligent algorithms and real-time updates. Built with cutting-edge web technologies for optimal performance and user experience.

<div align="center">
  <img src="https://via.placeholder.com/800x400/2563EB/FFFFFF?text=NewsFlow+Platform" alt="NewsFlow Platform" width="100%">
</div>

## Key Features

| Feature | Description |
|---------|-------------|
| **Homepage** | Hero section with featured articles, weather widget, stock ticker |
| **Trending** | Real-time trending topics with engagement metrics |
| **Categories** | 8 news categories with advanced filtering |
| **Article Pages** | Rich content with social sharing and bookmarking |
| **Saved Articles** | Personal bookmark collection with synchronization |
| **About** | Company information and team profiles |

## Technical Architecture

### Core Stack
- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18.2.0 with TypeScript 5.0
- **Styling**: Tailwind CSS 3.3.0
- **State Management**: React Query for server state
- **Performance**: Optimized bundle (125 kB shared, 170 kB first load)

### Project Structure
```
NewsFlow/
├── src/app/                 # Next.js App Router
│   ├── (routes)/           # Page routes
│   ├── components/         # Reusable components
│   └── types/              # TypeScript definitions
├── public/                 # Static assets
└── Configuration files     # Next.js, Tailwind, TypeScript
```

## Quick Start

### Prerequisites
- Node.js 18.0.0+
- npm or yarn
- Git

### Installation
```bash
git clone https://github.com/reuben-idan/MyNews_Reader.git
cd MyNews_Reader
npm install
npm run dev
```

Access at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Pages & Routes

| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ Live | Homepage with featured content |
| `/trending` | ✅ Live | Real-time trending topics |
| `/categories` | ✅ Live | News categories with filtering |
| `/categories/business` | ✅ Live | Business news category |
| `/saved` | ✅ Live | Personal bookmarks |
| `/about` | ✅ Live | Company information |

## Performance Metrics

<div align="center">

| Metric | Value | Status |
|--------|-------|--------|
| Bundle Size | 125 kB | ✅ Optimized |
| First Load | 170 kB | ✅ Good |
| Build Time | < 30s | ✅ Fast |
| Lighthouse | 95+ | ✅ Excellent |

</div>

## Design System

### Color Palette
```css
Primary: #4F46E5 (Indigo)
Success: #10B981 (Emerald)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Gray: #6B7280 (Cool Gray)
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: 14px - 48px (responsive)
- **Line Height**: 1.5 - 1.7

## Development

### Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

### Code Quality
- ESLint for linting
- Prettier for formatting
- TypeScript for type safety
- Responsive design testing

## Deployment

Currently deployed on Vercel:
- **Production**: [https://my-newsflow-n2v26o8md-reuben-idans-projects.vercel.app](https://my-newsflow-n2v26o8md-reuben-idans-projects.vercel.app)
- **Build**: Automated via GitHub integration
- **Environment**: Optimized for global CDN delivery

## Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Implement changes
4. Test thoroughly
5. Submit pull request

### Standards
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure responsive design

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>Built by Reuben Idan</strong></p>
  <p>reuben.idan@gmail.com | GitHub: @reuben-idan</p>
</div>
