# Contact Us Form App

Next.js application with App Router for contact form submission using Server Actions.

## Features

- Contact form with name, email, phone, and message fields
- Server action form submission
- MongoDB database storage
- Basic UI components

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
```bash
mongod
```

3. Update database credentials in `app/lib/db.ts`

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
app/
├── page.tsx                 # Home page
├── layout.tsx               # Root layout
├── components/
│   └── ContactForm.tsx      # Contact form component
├── actions/
│   └── contactActions.ts    # Server action (blocking DB call, no CSRF)
├── lib/
│   └── db.ts               # Database connection (hardcoded config)
├── models/
│   └── Contact.ts          # Contact model (no validation)
└── utils/
    └── validation.ts        # Validation utilities (unused)
```

## API

The form uses Next.js Server Actions for form submission. The server action:
- Accepts form data
- Connects to MongoDB
- Saves contact information
- Returns success/error response
