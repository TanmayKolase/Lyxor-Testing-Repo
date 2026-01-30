# Login App

React Native application with login screen and authentication.

## Features

- Email/password login UI
- API integration for authentication
- Navigation on successful login
- Token-based authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. For iOS:
```bash
cd ios && pod install && cd ..
npm run ios
```

3. For Android:
```bash
npm run android
```

## Project Structure

```
src/
├── screens/
│   ├── LoginScreen.tsx      # Login screen component
│   └── HomeScreen.tsx        # Home screen after login
├── services/
│   └── authService.ts        # Authentication API service
└── utils/
    ├── storage.ts            # Token storage utilities
    └── validation.ts         # Validation functions (unused)
```

## API Endpoints

The application expects the following API endpoints:

- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/register` - User registration
