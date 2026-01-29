# Order Management API

ASP.NET Core Web API for managing orders with Entity Framework Core.

## Features

- Create and list orders
- Entity Framework Core integration
- Controller-service pattern
- RESTful API endpoints

## Requirements

- .NET 8.0 SDK
- SQL Server (or SQL Server Express)

## Setup

1. Restore NuGet packages:
```bash
dotnet restore
```

2. Update the connection string in `Program.cs` (currently hardcoded)

3. Run database migrations (if using migrations):
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

4. Run the application:
```bash
dotnet run
```

The API will be available at `http://localhost:5000` or `https://localhost:5001`

Swagger UI will be available at `/swagger` in development mode.

## API Endpoints

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "creditCardNumber": "1234-5678-9012-3456",
  "billingAddress": "123 Main St, City, State 12345",
  "totalAmount": 99.99,
  "status": "Pending",
  "orderItems": [
    {
      "productName": "Product 1",
      "quantity": 2,
      "price": 49.99
    }
  ]
}
```

### GET /api/orders
Get all orders (no pagination).

### GET /api/orders/{id}
Get a specific order by ID.

### PUT /api/orders/{id}
Update an order.

### DELETE /api/orders/{id}
Delete an order.

## Project Structure

```
OrderManagementAPI/
├── Controllers/
│   └── OrdersController.cs    # REST controllers
├── Services/
│   ├── IOrderService.cs       # Service interface
│   └── OrderService.cs        # Service implementation
├── Models/
│   └── Order.cs                # Entity models
├── DTOs/
│   └── OrderDTO.cs            # Data transfer objects
├── Data/
│   └── ApplicationDbContext.cs # DbContext
├── Utils/
│   └── Helper.cs              # Utility classes (unused)
└── Program.cs                  # Application entry point
```
