# Feedback Form App

Svelte application for feedback submission with form UI and API integration.

## Features

- Feedback form with name, email, rating, and feedback fields
- API submission for storing feedback
- Success message display
- Form validation and error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── App.svelte              # Root component
├── components/
│   ├── FeedbackForm.svelte  # Feedback form component
│   └── SuccessMessage.svelte # Success message (XSS risk)
├── services/
│   └── feedbackService.js   # API service (hardcoded URL, no error handling)
├── stores/
│   └── feedbackStore.js    # State store (poor state handling)
└── utils/
    └── validation.js       # Validation utilities (unused)
```

## API Endpoints

The application expects the following API endpoint:

- `POST /api/feedback` - Submit feedback
