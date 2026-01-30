# Analytics Dashboard

Full-stack Analytics Dashboard with React frontend and FastAPI backend.

## Features

- React dashboard UI with charts and metrics
- FastAPI backend with analytics APIs
- Chart data visualization
- Real-time metrics display

## Setup

### Backend

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Set up PostgreSQL database:
```bash
createdb analytics_db
```

3. Update database connection in `backend/database.py` and `backend/main.py`

4. Run the FastAPI server:
```bash
cd backend
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
backend/
├── main.py                    # FastAPI app (hardcoded secrets, missing auth, blocking DB ops)
├── database.py                # Database connection (hardcoded secrets, blocking ops)
├── models.py                  # Database models (no validation, sensitive fields)
├── schemas.py                 # Pydantic schemas (no validation, sensitive fields)
└── routes/
    ├── analytics.py           # Analytics routes (no validation, missing auth, blocking DB ops, no pagination)
    └── dashboard.py           # Dashboard routes (no validation, missing auth, blocking DB ops, no pagination)

frontend/
├── src/
│   ├── App.js                 # Main app (no loading/error UI, console logs)
│   ├── components/
│   │   ├── Dashboard.js       # Dashboard (no validation, no loading/error UI, console logs)
│   │   ├── Chart.js           # Chart component (no validation, console logs)
│   │   └── MetricsSummary.js  # Summary component (no validation, console logs)
│   └── services/
│       └── api.js             # API service (hardcoded URL, no error handling, console logs)
└── package.json
```

## API Endpoints

### GET /api/dashboard/summary
Get dashboard summary statistics.

### GET /api/dashboard/metrics
Get all metrics (no pagination).

### GET /api/dashboard/chart-data
Get chart data for visualization.

### GET /api/analytics/events
Get all analytics events (no pagination).

### POST /api/analytics/events
Create a new analytics event.

## Known Issues

- No frontend validation
- No backend validation
- Hardcoded secrets in backend
- Missing authentication
- Blocking database operations
- No pagination on list endpoints
- No loading/error UI in frontend
- Console logs throughout codebase
