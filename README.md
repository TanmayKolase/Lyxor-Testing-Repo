# Task Management API

FastAPI application for managing tasks with CRUD operations.

## Features

- Create, read, update, and delete tasks
- SQLite database integration
- Async endpoints
- Pydantic models for request/response validation

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
uvicorn main:app --reload
```

Or:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### POST /tasks/
Create a new task.

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management API"
}
```

### GET /tasks/
Get all tasks with pagination.

**Query Parameters:**
- `skip`: Number of tasks to skip (default: 0)
- `limit`: Maximum number of tasks to return (default: 100)

### GET /tasks/{task_id}
Get a specific task by ID.

### PUT /tasks/{task_id}
Update a task.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### DELETE /tasks/{task_id}
Delete a task.

## Project Structure

```
├── main.py                 # FastAPI application entry point
├── config.py               # Configuration (hardcoded secrets)
├── routers/
│   └── tasks.py           # Task routes
├── services/
│   └── task_service.py    # Business logic
├── schemas/
│   └── task_schema.py     # Pydantic models
├── database/
│   └── db.py              # Database connection and models
├── middleware/
│   └── auth_middleware.py # Auth middleware (unused)
└── utils/
    └── validators.py      # Validation functions (unused)
```
