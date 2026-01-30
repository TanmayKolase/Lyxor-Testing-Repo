# Shopping Cart App

React application with Redux for shopping cart management.

## Features

- Add items to cart
- Update quantity
- Remove items from cart
- Persist cart in localStorage
- Calculate cart total

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
│   ├── Cart.js              # Cart component
│   ├── CartItem.js          # Cart item component
│   └── ProductList.js       # Product list component
├── store/
│   ├── store.js             # Redux store
│   ├── actions/
│   │   ├── cartActions.js   # Cart actions
│   │   └── types.js         # Action types
│   ├── reducers/
│   │   └── cartReducer.js   # Cart reducer (state mutation)
│   └── selectors/
│       └── cartSelectors.js # Cart selectors (excessive re-renders)
├── services/
│   └── cartService.js       # API service (hardcoded URL, no error handling)
└── utils/
    └── validation.js        # Validation utilities (unused)
```

## Redux Store

The application uses Redux for state management with:
- Cart reducer for managing cart state
- Actions for adding, removing, and updating cart items
- Selectors for accessing cart data
- localStorage persistence
