# Invoice Management API

ASP.NET Core Web API for managing invoices with SQL Server database.

## Features

- Create and list invoices
- SQL Server database integration
- Repository pattern implementation
- CRUD operations for invoices

## Setup

1. Install .NET SDK 8.0

2. Set up SQL Server database:
```bash
# Create database
sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "CREATE DATABASE InvoiceDB"
```

3. Update connection string in `Program.cs`

4. Run migrations:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

5. Run the application:
```bash
dotnet run
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/invoices
Get all invoices (no pagination).

### GET /api/invoices/{id}
Get a specific invoice by ID.

### POST /api/invoices
Create a new invoice.

**Request Body:**
```json
{
  "invoiceNumber": "INV-001",
  "customerId": 1,
  "amount": 999.99,
  "invoiceDate": "2024-01-01",
  "dueDate": "2024-01-31",
  "status": "pending",
  "customerEmail": "customer@example.com",
  "customerPhone": "555-1234",
  "billingAddress": "123 Main St",
  "creditCardNumber": "4111111111111111",
  "cvv": "123",
  "notes": "Payment terms: Net 30"
}
```

### PUT /api/invoices/{id}
Update an invoice.

### DELETE /api/invoices/{id}
Delete an invoice.

### GET /api/invoices/customer/{customerId}
Get all invoices for a customer (no pagination).

## Project Structure

```
├── Controllers/
│   └── InvoicesController.cs    # Invoice controller
├── Services/
│   ├── IInvoiceService.cs       # Service interface
│   └── InvoiceService.cs       # Service implementation
├── Repositories/
│   ├── IInvoiceRepository.cs    # Repository interface
│   └── InvoiceRepository.cs     # Repository (SQL injection, hardcoded connection)
├── Models/
│   └── Invoice.cs               # Invoice model (no validation)
├── DTOs/
│   ├── CreateInvoiceRequest.cs  # Request DTO (no validation)
│   └── InvoiceResponse.cs      # Response DTO (sensitive fields)
├── Data/
│   └── ApplicationDbContext.cs  # DbContext
└── Program.cs                   # Application entry (hardcoded connection, no exception middleware)
```
