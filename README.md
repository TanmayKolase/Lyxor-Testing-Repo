# Sales Reporting API

Backend API for sales reporting with complex SQL queries and aggregation capabilities.

## Features

- Complex SQL queries for sales data
- Date-based filtering
- Aggregation APIs for revenue, customers, and products
- Regional sales analysis
- Top customers and revenue trends

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
```bash
psql -U postgres -d salesdb -f database/schema.sql
```

3. Update database credentials in `config/database.js`

4. Start the server:
```bash
npm start
```

Or for development:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### GET /api/reports/sales/summary
Get overall sales summary (total orders, revenue, averages).

### GET /api/reports/sales/by-date
Get sales by date range.

**Query Parameters:**
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)

### GET /api/reports/sales/by-product
Get sales by product.

**Query Parameters:**
- `productId` - Product ID (optional)
- `category` - Product category (optional)

### GET /api/reports/sales/by-region
Get sales by region.

**Query Parameters:**
- `region` - Region name (optional)
- `country` - Country name (optional)

### GET /api/reports/customers/top
Get top customers by revenue.

**Query Parameters:**
- `limit` - Number of customers to return (default: 10)

### GET /api/reports/revenue/trends
Get revenue trends over time.

**Query Parameters:**
- `period` - Number of days to look back
- `groupBy` - Grouping period (day, week, month)

### GET /api/reports/daily
Get daily sales report.

**Query Parameters:**
- `date` - Date (YYYY-MM-DD)

### GET /api/reports/monthly
Get monthly aggregation.

**Query Parameters:**
- `year` - Year (optional)
- `month` - Month (optional)

## Project Structure

```
├── server.js                 # Express server
├── routes/
│   └── reportRoutes.js      # Report routes
├── controllers/
│   └── reportController.js  # Report controllers
├── services/
│   └── reportService.js     # Business logic with SQL queries
├── config/
│   └── database.js          # Database connection
├── database/
│   └── schema.sql           # Database schema
└── utils/
    └── queryBuilder.js      # Unused utility (dead code)
```
