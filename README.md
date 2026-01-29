# Internal Admin Platform

Full-stack internal admin platform with React frontend and Node.js backend.

## Features

- User authentication and authorization
- Role-based access control
- User management
- Admin dashboard
- Bulk operations

## Setup

### Backend

1. Install dependencies:
```bash
npm install
```

2. Update database connection in `config/config.js`

3. Start the server:
```bash
npm start
```

### Frontend

1. Navigate to client directory:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm start
```

## Project Structure

```
├── server.js                 # Express server
├── routes/                   # API routes
├── controllers/              # Request handlers
├── services/                 # Business logic
├── models/                   # Database models
├── middleware/               # Auth middleware
├── config/                   # Configuration
└── client/                   # React frontend
    ├── src/
    │   ├── components/       # React components
    │   ├── services/         # API services
    │   ├── context/          # React context
    │   └── utils/            # Utilities
```
