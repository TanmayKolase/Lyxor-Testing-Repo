# Product Form App

Vue.js application for managing products with create/edit form and list view.

## Features

- Product create/edit form with name, price, and description
- Product list view
- API integration for CRUD operations
- Vue Router for navigation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run serve
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── views/
│   ├── ProductList.vue      # Product list view
│   └── ProductForm.vue       # Product create/edit form
├── services/
│   └── productService.js    # API service
├── router/
│   └── index.js             # Vue Router configuration
├── utils/
│   └── validation.js        # Validation utilities (unused)
└── App.vue                  # Root component
```

## API Endpoints

The application expects the following API endpoints:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
