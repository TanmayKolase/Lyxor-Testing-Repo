# Authentication API Backend

Node.js + Express backend with MySQL database for user authentication.

## Features

- User registration endpoint
- User login endpoint
- JWT-based authentication
- MySQL database integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MySQL database:
```bash
mysql -u root -p < database/schema.sql
```

3. Update database credentials in `config/database.js`

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": { ... },
  "token": "jwt_token_here"
}
```

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": { ... },
  "token": "jwt_token_here"
}
```

## Project Structure

```
├── config/
│   └── database.js       # Database connection
├── controllers/
│   └── authController.js # Auth route handlers
├── services/
│   └── authService.js    # Business logic
├── routes/
│   └── authRoutes.js     # Route definitions
├── middleware/
│   └── authMiddleware.js # JWT verification (unused)
├── models/
│   └── User.js           # User model (unused)
├── utils/
│   └── validation.js     # Validation functions (unused)
├── database/
│   └── schema.sql        # Database schema
├── server.js             # Express app entry point
└── package.json
```
