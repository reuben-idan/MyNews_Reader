#  NewsFlow - Your Intelligent News Companion

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.0-black" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.2.0-blue" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs Welcome">
</div>

<div align="center">
  <h3> A state-of-the-art news platform delivering curated content with precision and intelligence</h3>
</div>

---

##  Table of Contents

- [ Overview](#-overview)
- [ Key Features](#-key-features)
- [ Project Structure](#️-project-structure)
- [ Quick Start](#-quick-start)
- [ Pages & Routes](#-pages--routes)
- [ Design System](#-design-system)
- [ Technical Stack](#-technical-stack)
- [ Performance](#-performance)
- [ Contributing](#-contributing)
- [ License](#-license)

---

##  Overview

**NewsFlow** is a cutting-edge news aggregation platform built with modern web technologies. It delivers personalized news experiences through intelligent curation, real-time updates, and an intuitive user interface.

<div align="center">
  <img src="https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=NewsFlow+Dashboard" alt="NewsFlow Dashboard" width="100%">
</div>

###  Mission Statement

> "To democratize quality information by making credible, curated news accessible to everyone through innovative technology and user-centric design."

---

##  Key Features

###  **Homepage**
- **Hero Section** with featured articles and breaking news
- **Multiple News Sections** (Latest, Trending, Popular)
- **Dynamic Widgets** (Weather, Stock Ticker, Trending Carousel)
- **Responsive Layout** optimized for all devices

###  **Trending Page**
- **Real-time Trending Topics** with engagement metrics
- **Interactive Article Cards** with hover effects
- **Trending Statistics** and regional breakdowns
- **Live Update Indicators** and reader engagement data

###  **Categories Page**
- **8 News Categories** with rich metadata and descriptions
- **Advanced Search & Filtering** system
- **Category Statistics** dashboard
- **Interactive Category Cards** with article counts

###  **Saved Articles**
- **Personal Bookmark Collection** with persistent storage
- **Real-time Synchronization** across sessions
- **Category Analysis** of saved content
- **Export & Management** options

###  **About Page**
- **Company Story & Mission** presentation
- **Team Member Profiles** with social links
- **Feature Showcase** highlighting platform capabilities
- **Contact Information** and support channels

---

##  Project Structure

```
📦 NewsFlow
├── 📁 src/
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 (routes)/                 # Page routes
│   │   │   ├── 📄 page.tsx             # Homepage
│   │   │   ├── 📄 trending/page.tsx    # Trending page
│   │   │   ├── 📄 categories/page.tsx  # Categories page
│   │   │   ├── 📄 saved/page.tsx       # Saved articles
│   │   │   └── 📄 about/page.tsx       # About page
│   │   ├── 📁 components/              # Reusable components
│   │   │   ├── 📁 ui/                  # Base UI components
│   │   │   ├── 📁 trending/            # Trending page components
│   │   │   ├── 📁 categories/          # Categories page components
│   │   │   ├── 📁 saved/               # Saved articles components
│   │   │   └── 📁 about/               # About page components
│   │   ├── 📁 context/                 # React Context providers
│   │   └── 📁 types/                   # TypeScript definitions
│   ├── 📁 public/                      # Static assets
│   └── 📁 styles/                      # Global styles
├── 📄 next.config.js                   # Next.js configuration
├── 📄 tailwind.config.js               # Tailwind CSS config
├── 📄 tsconfig.json                    # TypeScript configuration
└── 📄 package.json                     # Dependencies & scripts
```

---

##  Quick Start

### Prerequisites

- **Node.js** 18.0.0 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/reuben-idan/MyNews_Reader.git

# Navigate to project directory
cd MyNews_Reader

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

##  Pages & Routes

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Homepage with featured news and widgets | ✅ **Live** |
| `/trending` | Real-time trending topics and articles | ✅ **Live** |
| `/categories` | Browse news by categories | ✅ **Live** |
| `/saved` | Personal bookmark collection | ✅ **Live** |
| `/about` | Company information and team | ✅ **Live** |

###  Navigation Structure

```
 Home
├── Latest News Feed
├── Weather Widget
├── Stock Market Ticker
└── Trending Carousel

 Trending
├── Real-time Trending Topics
├── Engagement Metrics
├── Regional Statistics
└── Live Updates

 Categories
├── 8 News Categories
├── Advanced Filtering
├── Category Statistics
└── Search Functionality

 Saved
├── Personal Collection
├── Bookmark Management
├── Category Analysis
└── Export Options

 About
├── Company Story
├── Team Profiles
├── Feature Showcase
└── Contact Information
```

---

##  Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#4F46E5` | Buttons, Links, Accents |
| **Success Green** | `#10B981` | Success states, Metrics |
| **Warning Yellow** | `#F59E0B` | Alerts, Highlights |
| **Error Red** | `#EF4444` | Errors, Remove actions |
| **Gray Scale** | `#6B7280` | Text, Borders, Backgrounds |

### Typography

- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System font stack
- **Headings**: 24px - 48px (responsive)
- **Body Text**: 14px - 18px
- **Line Height**: 1.5 - 1.7

### Components

<div align="center">
  <img src="https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Component+Library" alt="Component Library" width="80%">
</div>

---

##  Technical Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.0.0 | React framework with App Router |
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.0.0 | Type safety |
| **Tailwind CSS** | 3.3.0 | Utility-first CSS framework |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **PostCSS** | CSS processing |
| **Webpack** | Module bundling |

### Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.263.0",
  "react-icons": "^4.10.0"
}
```

---

##  Performance

### Build Metrics

| Metric | Value | Status |
|--------|-------|--------|
| **Bundle Size** | 125 kB (shared) | ✅ Optimized |
| **First Load JS** | 170 kB | ✅ Good |
| **Pages Generated** | 5 static pages | ✅ Efficient |
| **Build Time** | < 30 seconds | ✅ Fast |




---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

### 📋 Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design works across devices

### 🐛 Reporting Issues

- Use the GitHub issue tracker
- Include detailed reproduction steps
- Add screenshots if applicable
- Specify your environment (OS, browser, version)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **NewsAPI** for providing news data
- **OpenWeatherMap** for weather information
- **Finnhub** for stock market data
- **Vercel** for hosting platform
- **Tailwind CSS** for the utility-first CSS framework

---

<div align="center">

**Built with ❤️ by [Reuben Idan](https://github.com/reuben-idan)**

⭐ **Star this repository if you find it helpful!**

📧 **Contact:** [reuben.idan@gmail.com]()

🐦 **Twitter:** [@AdroitIdan](https://twitter.com/your-handle)

</div>
