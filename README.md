# User CRUD API

Go (Gin) backend service for user CRUD operations.

## Features

- REST APIs using Gin framework
- MySQL database integration
- Basic middleware for CORS and logging
- User CRUD operations

## Setup

1. Install dependencies:
```bash
go mod download
```

2. Set up MySQL database:
```bash
mysql -u root -p < database/schema.sql
```

3. Update database credentials in `internal/config/config.go`

4. Run the server:
```bash
go run main.go
```

The API will be available at `http://localhost:8080`

## API Endpoints

### GET /api/users
Get all users (no pagination).

### GET /api/users/:id
Get a specific user by ID.

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "password": "password123"
}
```

### PUT /api/users/:id
Update a user.

### DELETE /api/users/:id
Delete a user.

## Project Structure

```
├── main.go                    # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go         # Configuration (hardcoded credentials)
│   ├── database/
│   │   └── database.go        # Database connection
│   ├── models/
│   │   └── user.go           # User models
│   ├── repository/
│   │   └── user_repository.go # Data access layer (SQL injection)
│   ├── handlers/
│   │   └── user_handler.go   # HTTP handlers
│   ├── middleware/
│   │   └── middleware.go    # Middleware (missing auth)
│   └── utils/
│       └── validator.go      # Validation utilities (unused)
└── database/
    └── schema.sql            # Database schema
```
