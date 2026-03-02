# CoinCompass - Final Project Summary

## Project Overview
CoinCompass is a full-stack cryptocurrency tracking application built with **React (JavaScript)** and **Express.js**. The application uses the **CoinGecko API** to fetch real-time cryptocurrency data and provides portfolio management capabilities.

## Technology Stack

### Frontend
- **React 18.3.1** (JavaScript/JSX)
- **React Router DOM** for routing
- **TanStack Query (React Query)** for data fetching and state management
- **Tailwind CSS** for styling
- **Radix UI** components
- **Axios** for HTTP requests
- **Vite** as build tool

### Backend
- **Express.js** server
- **In-memory storage** (Map-based)
- **CoinGecko API** integration for cryptocurrency data
- **Node.js** with ES modules

## Project Structure

```
CoinCompass/
├── client/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # UI component library
│   │   │   ├── navbar.jsx
│   │   │   ├── crypto-card.jsx
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── home.jsx
│   │   │   ├── crypto.jsx
│   │   │   ├── portfolio.jsx
│   │   │   └── news.jsx
│   │   ├── lib/              # Utilities
│   │   │   ├── queryClient.js
│   │   │   └── utils.js
│   │   ├── hooks/            # Custom hooks
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   └── index.html
├── server/
│   ├── index.js              # Express server entry
│   ├── routes.js              # API routes
│   ├── storage.js             # In-memory storage
│   ├── vite.js                # Vite dev server setup
│   └── static.js              # Static file serving
├── shared/
│   └── schema.js              # Shared schemas (Zod)
├── script/
│   └── build.js               # Build script
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── package.json
└── jsconfig.json              # JavaScript config

```

## API Endpoints

All API endpoints are prefixed with `/api`:

### Cryptocurrencies
- `GET /api/cryptos` - Get all cryptocurrencies (from CoinGecko API)
- `GET /api/cryptos/:id` - Get single cryptocurrency by ID

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/stats` - Get portfolio statistics
- `POST /api/portfolio` - Create new portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

### News
- `GET /api/news` - Get cryptocurrency news articles

## CoinGecko API Integration

The application fetches cryptocurrency data from CoinGecko API:

**Endpoint Used:**
```
GET https://api.coingecko.com/api/v3/coins/markets
```

**Parameters:**
- `vs_currency=usd` - Prices in USD
- `order=market_cap_desc` - Ordered by market cap
- `per_page=100` - 100 coins per page
- `page=1` - First page
- `sparkline=true` - Include sparkline data
- `price_change_percentage=24h` - 24h price change

**Caching:**
- Data is cached for 60 seconds (1 minute)
- Prevents excessive API calls
- Automatically refreshes when cache expires

**Data Mapped:**
- `id` - Coin ID
- `symbol` - Coin symbol
- `name` - Coin name
- `image` - Coin image URL
- `currentPrice` - Current price in USD
- `marketCap` - Market capitalization
- `marketCapRank` - Market cap ranking
- `priceChange24h` - 24h price change (absolute)
- `priceChangePercentage24h` - 24h price change (%)
- `high24h` - 24h high price
- `low24h` - 24h low price
- `totalVolume` - 24h trading volume
- `circulatingSupply` - Circulating supply
- `sparklineIn7d` - Sparkline data (last 24 points)

## Application Flow

### 1. Server Startup (`server/index.js`)
- Express server starts on port 5000
- In development: Sets up Vite middleware for HMR
- In production: Serves static files from `dist/public`
- Registers all API routes

### 2. Client Request Flow
1. User visits application → Vite serves React app
2. React app loads → `App.jsx` renders with React Router
3. Page component mounts → Uses `useQuery` hook
4. Query triggers → `queryClient.js` makes API request
5. Request goes to → `http://localhost:5000/api/{endpoint}`
6. Server handles → `server/routes.js` processes request
7. Data fetched → From CoinGecko API or in-memory storage
8. Response sent → JSON data returned to client
9. React Query updates → Component re-renders with data

### 3. Portfolio Management Flow
1. User adds coin → Opens modal with form
2. Form submitted → `POST /api/portfolio` called
3. Server creates item → Stored in `MemStorage`
4. Response returned → React Query invalidates cache
5. Portfolio refreshes → Shows updated data

## Key Features

### 1. Real-Time Cryptocurrency Tracking
- Fetches top 100 cryptocurrencies from CoinGecko
- Displays current prices, market cap, 24h changes
- Shows sparkline charts
- Auto-refreshes every 60 seconds

### 2. Portfolio Management
- Add cryptocurrencies to portfolio
- Track quantity and buy price
- Calculate profit/loss
- View portfolio statistics
- Edit and delete portfolio items

### 3. Search & Filter
- Search cryptocurrencies by name or symbol
- Sort by market cap, price, or 24h change
- Ascending/descending sort order

### 4. News Feed
- Displays cryptocurrency news articles
- Sample news generated when API unavailable

### 5. Responsive Design
- Mobile-first approach
- Dark/light theme support
- Modern UI with Tailwind CSS

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts Express server on `http://localhost:5000` with Vite HMR

### Production Build
```bash
npm run build
```
Builds both client and server:
- Client → `dist/public/`
- Server → `dist/index.cjs`

### Production Start
```bash
npm start
```
Runs the production server

## Configuration Files

### `vite.config.js`
- React plugin configuration
- Path aliases (`@/`, `@shared/`, `@assets/`)
- Build output directory
- Development server settings

### `tailwind.config.js`
- Tailwind CSS configuration
- Custom color scheme
- Content paths (`.js`, `.jsx` files)
- Theme extensions

### `jsconfig.json`
- JavaScript module resolution
- Path aliases for IDE support
- React JSX configuration

### `package.json`
- Dependencies and devDependencies
- Scripts for dev, build, start
- ES modules enabled (`"type": "module"`)

## Data Storage

### In-Memory Storage (`server/storage.js`)
- Uses JavaScript `Map` for storage
- Persists data during server runtime
- Three main stores:
  - `cryptos` - Cryptocurrency data
  - `portfolioItems` - User portfolio
  - `newsArticles` - News articles

### Price Caching
- Separate cache for current prices
- Updates when new crypto data fetched
- Portfolio items use cached prices for real-time updates

## Error Handling

### Client-Side
- React Query error boundaries
- Toast notifications for errors
- Fallback UI for failed requests

### Server-Side
- Try-catch blocks in all routes
- Error logging to console
- Appropriate HTTP status codes
- Error messages in JSON responses

## Performance Optimizations

1. **API Caching**: 60-second cache for CoinGecko data
2. **Concurrent Fetch Prevention**: Prevents multiple simultaneous API calls
3. **React Query**: Automatic caching and refetching
4. **Code Splitting**: Vite handles automatic code splitting
5. **Lazy Loading**: Components loaded on demand

## Security Considerations

1. **Input Validation**: Server validates all inputs
2. **Type Conversion**: Proper parsing of numeric values
3. **Error Messages**: Generic error messages (no sensitive data)
4. **CORS**: Configured for development (adjust for production)

## Future Enhancements

Potential improvements:
- Database persistence (PostgreSQL, MongoDB)
- User authentication
- Real-time price updates (WebSockets)
- Historical price charts
- Price alerts
- Export portfolio data
- Multiple currency support

## Notes

- All TypeScript files have been converted to JavaScript
- No `.ts` or `.tsx` files remain in the project
- Uses ES modules throughout
- CoinGecko API is free tier (no API key required)
- Rate limiting: CoinGecko allows 10-50 calls/minute (caching helps)

