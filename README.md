# Infinite Scroll Products List

React application with infinite scroll functionality for displaying a large list of products.

## Features

- Infinite scroll list of products
- Paginated data fetching from API
- Filter and sort functionality
- Loading indicators
- Responsive grid layout

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── ProductList.js     # Main product list component
│   ├── ProductItem.js     # Individual product item
│   ├── Loading.js         # Loading indicator
│   └── Header.js          # Header component
├── hooks/
│   ├── useProducts.js     # Products data fetching hook
│   └── useInfiniteScroll.js # Infinite scroll hook
├── services/
│   └── api.js             # API service
├── App.js                 # Main app component
└── index.js               # Entry point
```

## Known Issues

- Missing memoization causing re-render storms
- State updates triggering unnecessary re-renders
- No list virtualization (rendering hundreds of DOM nodes)
- Missing cleanup in useEffect (event listeners not removed)
- No error handling for failed API requests
- No proper loading or skeleton UI
- Hardcoded API URL
- Console logs left in production code
- Improper dependency arrays in useEffect
