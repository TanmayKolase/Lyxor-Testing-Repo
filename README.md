# User Settings Page

Frontend web application with user settings page for managing profile preferences.

## Features

- Settings form with profile preferences
- Toggle switches for boolean settings
- Input fields for text and select options
- Save settings via API
- Basic success message display

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── SettingsPage.js    # Main settings form (no ARIA labels, no validation, no error feedback, no loading state)
│   ├── SettingsPage.css    # Styles (color contrast issues, missing focus indicators, tab order issues)
│   ├── Toggle.js           # Toggle switch component (no ARIA labels, poor keyboard navigation, missing focus indicators)
│   ├── Toggle.css          # Toggle styles (color contrast issues, missing focus indicators)
│   ├── Header.js           # Header component
│   └── Header.css          # Header styles
├── services/
│   └── settingsApi.js      # API service (hardcoded endpoint, console logs)
├── App.js                  # Main app component
└── index.js                # Entry point
```

## Known Issues

- No ARIA labels on inputs and buttons
- Poor keyboard navigation (tab order issues)
- Color contrast issues violating WCAG
- Missing focus indicators
- No client-side validation
- No error feedback on failed save
- Hardcoded API endpoint
- No loading or disabled state
- Console logs in production
