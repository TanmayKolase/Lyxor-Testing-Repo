# Admin Dashboard

React application for admin dashboard with data visualization, tables, and filtering.

## Features

- Data fetching using useEffect
- Charts and tables for data visualization
- Filters and search functionality
- User statistics and sales overview

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
├── App.js                 # Main app component
├── components/
│   ├── Dashboard.js       # Main dashboard component
│   ├── DataTable.js       # Data table component
│   ├── SalesChart.js      # Sales chart component
│   ├── UserStats.js       # User statistics component
│   └── Filters.js         # Filters component
└── services/
    └── api.js             # API service functions
```

## API Endpoints

The application expects the following API endpoints (backend not included):

- `GET /api/dashboard` - Dashboard overview data
- `GET /api/users` - User list with filters
- `GET /api/sales` - Sales data by date range
- `GET /api/user/current` - Current user information
