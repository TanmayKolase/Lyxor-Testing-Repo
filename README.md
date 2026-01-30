# Order Management API

Ruby on Rails API for managing orders with create and list functionality.

## Features

- Create and list orders
- ActiveRecord models for orders, users, products, and order items
- JSON APIs for order management
- Order statistics endpoints

## Setup

1. Install dependencies:
```bash
bundle install
```

2. Set up database:
```bash
rails db:create
rails db:migrate
rails db:seed
```

3. Start the server:
```bash
rails server
```

The API will be available at `http://localhost:3000`

## API Endpoints

### GET /api/v1/orders
Get all orders (no pagination).

### GET /api/v1/orders/:id
Get a specific order by ID.

### POST /api/v1/orders
Create a new order.

**Request Body:**
```json
{
  "order": {
    "user_id": 1,
    "total_amount": 99.99,
    "status": "pending",
    "payment_method": "credit_card",
    "credit_card_number": "4111111111111111",
    "cvv": "123",
    "billing_address": "123 Main St",
    "shipping_address": "123 Main St",
    "notes": "Please deliver during business hours"
  }
}
```

### PUT /api/v1/orders/:id
Update an order.

### DELETE /api/v1/orders/:id
Delete an order.

### GET /api/v1/stats
Get order statistics.

### GET /api/v1/stats/by_status?status=pending
Get orders by status.

### GET /api/v1/stats/by_date_range?start_date=2024-01-01&end_date=2024-01-31
Get orders by date range.

## Project Structure

```
app/
├── models/
│   ├── order.rb              # Order model (missing validations)
│   ├── order_item.rb         # OrderItem model
│   ├── user.rb               # User model
│   └── product.rb            # Product model
├── controllers/
│   ├── api/v1/
│   │   ├── orders_controller.rb      # Orders controller
│   │   └── order_stats_controller.rb # Stats controller
│   └── application_controller.rb    # Base controller
└── services/
    └── order_service.rb      # Order service (SQL injection, N+1 queries)
```
