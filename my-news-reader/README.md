# MyNews Reader

A state-of-the-art React application for discovering, filtering, and saving the latest news—featuring dynamic, premium informational widgets for an interactive and contextual dashboard experience.

---

## Overview

MyNews Reader delivers current news from leading public APIs. It’s designed for speed, clarity, and accessibility, with modern UX, persistent favorites, advanced filtering, dark/light mode, and dynamic widgets for a personalized, interactive user experience.

---

## Features

- **Latest News Feed:** Browse up-to-date articles (title, image, snippet).
- **Article Details:** Click for full story and extended details.
- **Category Filtering:** Instantly filter by Tech, Sports, Business, and more.
- **Keyword Search:** Find news by keyword or phrase.
- **Favorites:** Save and manage favorite articles (stored in localStorage).
- **Dark/Light Mode:** Accessibility toggle for all users.
- **Responsive Design:** Mobile-first and desktop-ready.
- **Robust Error Handling:** Friendly UI for API or network errors.
- **Combined Search & Filtering:** Smarter discovery with simultaneous filters.
- **Multi-language Ready:** Architecture ready for future i18n.

---

## Dynamic Widgets

Take your news experience to the next level with these live, interactive widgets, dynamically updated and fully responsive:

### Trending News Carousel
- An interactive, auto-scrolling slider that showcases top headlines and trending topics.
- Dynamically fetches and updates content as headlines change.

### Weather Insight Widget
- Live weather data based on user location, powered by OpenWeatherMap.
- Updates in real-time to provide contextual relevance to weather-related news.

### Mini Calendar Filter
- Dynamic calendar picker for browsing news by specific date.
- Instantly filters articles based on user’s date selection.

### Live Stock Market Ticker
- Real-time, horizontally scrolling ticker for financial market data.
- Updates continuously to keep business news contextual and current.

### Infinite Scroll / Load More
- Dynamically loads additional articles as users scroll or on button click, providing a seamless reading experience.

---

## API Choices

- **Primary:** [NewsAPI](https://newsapi.org/)
- **Alternative:** [Mediastack](https://mediastack.com/) (free plan available)
- **Widgets:**
  - [OpenWeatherMap](https://openweathermap.org/) for WeatherWidget
  - [Finnhub](https://finnhub.io/) or [Yahoo Finance API](https://finance.yahoo.com/) for StockTicker

---

## React Components

- **Navbar:** Navigation, dark mode toggle, search bar.
- **SearchBar:** Keyword search.
- **CategoryFilter:** Category-based filtering.
- **TrendingCarousel (Dynamic Widget):** Top headlines slider.
- **WeatherWidget (Dynamic Widget):** Local weather overview.
- **MiniCalendar (Dynamic Widget):** Date-based article filter.
- **StockTicker (Dynamic Widget):** Business news ticker.
- **ArticleCard:** News preview with image and snippet.
- **ArticleList:** Maps and renders ArticleCards.
- **ArticleDetails:** Full content of the selected article.
- **DarkModeToggle:** Switch between light and dark themes.

---

## Project Structure

```
/src
  /components
    Navbar.jsx
    SearchBar.jsx
    CategoryFilter.jsx
    TrendingCarousel.jsx
    WeatherWidget.jsx
    MiniCalendar.jsx
    StockTicker.jsx
    ArticleCard.jsx
    ArticleList.jsx
    ArticleDetails.jsx
    DarkModeToggle.jsx
  /pages
    Home.jsx
    ArticleDetails.jsx
  App.jsx
  index.js
```

---

## 5-Week Project Plan

- **Week 1:** React + Tailwind setup, environment configuration, API key setup.
- **Week 2:** Article fetching & display (ArticleCard, ArticleList, TrendingCarousel).
- **Week 3:** Search, category filtering, routing, MiniCalendar, StockTicker.
- **Week 4:** Favorites, dark mode, error handling, WeatherWidget.
- **Week 5:** UI polish, full responsiveness, testing, deploy to Vercel.

---

## Innovation & Originality

- Persistent favorites for returning users.
- Combined search and category filtering for smarter discovery.
- Dynamic, widget-rich dashboard (weather, stocks, trending carousel, calendar).
- Accessible dark/light mode.
- Multi-language support planned.

---

## Getting Started

1. **Clone & Install**
    ```bash
    git clone https://github.com/reuben-idan/MyNews_Reader.git
    cd MyNews_Reader
    npm install
    ```
2. **Set Environment Variables**
    ```
    REACT_APP_NEWS_API_KEY=your_newsapi_key
    REACT_APP_WEATHER_API_KEY=your_openweather_key
    REACT_APP_STOCK_API_KEY=your_stock_api_key
    ```
3. **Run Locally**
    ```bash
    npm start
    ```
4. **Build for Production**
    ```bash
    npm run build
    ```

---

## Documentation

- Inline code comments for clarity.
- This README provides comprehensive setup, feature, and architecture details.

---

## Author

Reuben Idan  
ALX Frontend Capstone Project (2025)
