# User Profile API

Node.js backend API for user profile management with MongoDB and JWT authentication.

## Features

- CRUD APIs for user profiles
- Mongoose models for data persistence
- JWT-based authentication
- Password hashing with bcrypt

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
```bash
mongod
```

3. Update database credentials in `config/config.js`

4. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/profile/me` - Get current user profile (requires auth)
- `PUT /api/users/profile/me` - Update current user profile (requires auth)

## Project Structure

```
├── server.js                 # Express server
├── config/
│   └── config.js            # Configuration (hardcoded secrets)
├── models/
│   └── User.js              # User model (no validation)
├── controllers/
│   ├── userController.js    # User controller
│   └── authController.js    # Auth controller
├── routes/
│   ├── userRoutes.js        # User routes (missing auth on some)
│   └── authRoutes.js        # Auth routes
├── middleware/
│   └── auth.js              # Auth middleware
└── services/
    └── userService.js       # User service (unused)
```
