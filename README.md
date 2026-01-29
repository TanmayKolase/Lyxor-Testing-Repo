# User Management Dashboard

Full-stack application for managing users with React frontend and Node.js backend.

## Features

- User CRUD operations (Create, Read, Update, Delete)
- React frontend with forms and tables
- Node.js/Express REST API backend
- MongoDB database integration

## Setup

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on `localhost:27017`

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "role": "user",
  "password": "password123"
}
```

### GET /api/users
Get all users.

### GET /api/users/:id
Get a specific user by ID.

### PUT /api/users/:id
Update a user.

### DELETE /api/users/:id
Delete a user.

## Project Structure

```
backend/
├── server.js              # Express server
├── routes/
│   └── userRoutes.js      # User routes
├── controllers/
│   └── userController.js  # User controllers
├── models/
│   └── User.js            # User model
└── config/
    └── config.js          # Configuration

frontend/
├── src/
│   ├── App.js             # Main app component
│   ├── components/
│   │   ├── UserList.js    # User list component
│   │   └── UserForm.js    # User form component
│   └── index.js           # Entry point
└── public/
    └── index.html
```
