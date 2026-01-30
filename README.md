# User Settings App

Angular application for managing user settings and preferences.

## Features

- Reactive forms for profile settings
- API integration using HttpClient
- Update user preferences
- Profile and preferences management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Project Structure

```
src/app/
├── components/
│   ├── settings/
│   │   └── settings.component.ts    # Main settings component
│   ├── profile-form/
│   │   └── profile-form.component.ts  # Profile form
│   └── preferences-form/
│       └── preferences-form.component.ts  # Preferences form
├── services/
│   ├── user.service.ts            # User service
│   └── api.service.ts            # API service
├── models/
│   └── user.model.ts             # User interfaces
└── utils/
    └── validators.ts             # Validation functions (unused)
```

## API Endpoints

The application expects the following API endpoints:

- `GET /api/users/settings` - Get user settings
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update user preferences
- `GET /api/users/:id` - Get user by ID
