# Report Generation API

Flask backend API for generating and managing reports.

## Features

- Generate reports (sales, user, financial)
- Query database for report data
- Download report files
- List all reports

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up PostgreSQL database:
```bash
createdb reportdb
```

3. Update database credentials in `config.py`

4. Initialize database:
```bash
python -c "from app import app, db; app.app_context().push(); db.create_all()"
```

5. Run the application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### POST /api/reports/generate
Generate a new report.

**Request Body:**
```json
{
  "report_type": "sales",
  "user_id": 1,
  "filters": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  }
}
```

### GET /api/reports
Get all reports (no pagination).

### GET /api/reports/:id
Get a specific report by ID.

### GET /api/reports/download/:id
Download a report file.

### GET /api/reports/data
Get data for report generation.

## Project Structure

```
├── app.py                   # Flask application (debug mode enabled)
├── config.py                # Configuration (hardcoded credentials, debug mode)
├── database.py              # Database setup
├── models.py                # Database models (no validation)
├── routes/
│   └── report_routes.py     # Report routes (no auth, no pagination, missing error handling)
├── services/
│   ├── report_service.py    # Report service (missing error handling, sensitive logs)
│   └── data_service.py      # Data service (SQL injection, missing error handling, sensitive logs)
├── middleware/
│   └── auth.py             # Auth middleware (unused)
└── utils/
    └── validators.py        # Validation utilities (unused)
```
