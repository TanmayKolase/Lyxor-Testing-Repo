# User Management Service

Rust backend service using Actix-web for user management with REST APIs and database integration.

## Features

- REST APIs for user CRUD operations
- PostgreSQL database integration
- Async handlers
- User profile management

## Setup

1. Install Rust:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Set up PostgreSQL database:
```bash
createdb userdb
```

3. Create users table:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(50),
    date_of_birth TIMESTAMP,
    address TEXT,
    credit_card VARCHAR(255),
    ssn VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

4. Update database connection in `src/main.rs` and `src/database.rs`

5. Run the service:
```bash
cargo run
```

The API will be available at `http://127.0.0.1:8080`

## API Endpoints

### GET /api/users
Get all users.

### GET /api/users/{id}
Get a specific user by ID.

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "555-1234",
  "address": "123 Main St",
  "credit_card": "4111111111111111",
  "ssn": "123-45-6789"
}
```

### PUT /api/users/{id}
Update a user.

### DELETE /api/users/{id}
Delete a user.

### GET /api/users/{id}/profile
Get user profile with all details.

## Project Structure

```
src/
├── main.rs              # Main application (hardcoded secrets, no auth, poor module separation)
├── database.rs           # Database connection (hardcoded secrets, blocking operations)
├── models.rs             # Data models (no validation, sensitive fields)
├── handlers.rs           # Request handlers (unsafe unwraps, missing error propagation, sensitive logs, blocking operations)
└── services.rs           # Business logic (poor module separation, unsafe unwraps, blocking operations, sensitive logs)
```

## Known Issues

- Unsafe unwraps throughout codebase
- Hardcoded secrets in multiple files
- No input validation
- Missing error propagation
- Blocking operations in async context
- Sensitive data logged
- No authentication
- Poor module separation
