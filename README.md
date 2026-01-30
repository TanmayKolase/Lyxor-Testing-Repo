# User + Order Microservices

Microservices-based system with User, Order, and Auth services.

## Services

- **User Service** (Port 3001) - User management
- **Order Service** (Port 3002) - Order management
- **Auth Service** (Port 3003) - Authentication

## Features

- Separate microservices
- REST communication between services
- Shared authentication service
- MongoDB database integration

## Setup

1. Install dependencies for each service:
```bash
cd user-service && npm install
cd ../order-service && npm install
cd ../auth-service && npm install
```

2. Start services with Docker Compose:
```bash
docker-compose up
```

Or start individually:
```bash
cd user-service && npm start
cd ../order-service && npm start
cd ../auth-service && npm start
```

## API Endpoints

### User Service
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/orders` - Get user orders

### Order Service
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `PUT /api/orders/:id/status` - Update order status

### Auth Service
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/verify` - Verify token
- `POST /api/auth/refresh` - Refresh token

## Project Structure

```
user-service/
├── server.js
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── models/
│   └── User.js
└── config/
    └── config.js

order-service/
├── server.js
├── controllers/
│   └── orderController.js
├── routes/
│   └── orderRoutes.js
├── models/
│   └── Order.js
└── config/
    └── config.js

auth-service/
├── server.js
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
└── config/
    └── config.js

shared/
├── utils/
│   ├── logger.js      # Unused
│   └── httpClient.js  # Unused
└── middleware/
    └── auth.js        # Unused
```
